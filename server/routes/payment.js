// server/routes/payment.js

const express = require('express');
const router = express.Router();
const ecpay_payment = require('ecpay_aio_nodejs');
const Booking = require("../models/Booking"); // Booking 模型
require('dotenv').config();

const { MERCHANTID, HASHKEY, HASHIV, HOST } = process.env;

const options = {
  OperationMode: 'Test', // Test or Production
  MercProfile: {
    MerchantID: MERCHANTID,
    HashKey: HASHKEY,
    HashIV: HASHIV,
  },
  IgnorePayment: [],
  IsProjectContractor: false,
};

router.post('/pay', (req, res) => { // 確保這裡是 `POST` 方法
  console.log('支付平台返回的數據:', req.body);

  const { price, itemName, bookingId } = req.body;

  const MerchantTradeDate = new Date().toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  });
  
  const TradeNo = 'test' + new Date().getTime();
  let base_param = {
    MerchantTradeNo: TradeNo,
    MerchantTradeDate,
    TotalAmount: price, // 使用前端傳遞的價格
    TradeDesc: '課程預約支付',
    ItemName: itemName, // 使用前端傳遞的課程名稱
    ReturnURL: `${HOST}/api/payment/return`,
    ClientBackURL: `${HOST}/api/payment/clientReturn`,
    CustomField1: bookingId, // 傳遞 bookingId
  };
  
  const create = new ecpay_payment(options);
  const html = create.payment_client.aio_check_out_all(base_param);

  res.send(html); // 回傳支付 HTML 表單
});

router.post('/return', async (req, res) => {
  const { CheckMacValue, CustomField1 } = req.body;

  console.log('支付平台返回的數據:', req.body);

  if (!CustomField1) {
    console.error('缺少 bookingId');
    return res.status(400).send('Missing bookingId');
  }

  const data = { ...req.body };
  delete data.CheckMacValue;

  const create = new ecpay_payment(options);
  const checkValue = create.payment_client.helper.gen_chk_mac_value(data);

  console.log('本地計算的 CheckMacValue:', checkValue);
  console.log('支付平台返回的 CheckMacValue:', CheckMacValue);

  if (CheckMacValue === checkValue) {
    console.log('交易驗證成功');

    try {
      const booking = await Booking.findByIdAndUpdate(CustomField1, { paymentStatus: 'paid' }, { new: true });
      if (booking) {
        console.log('訂單付款狀態已更新:', booking);
      } else {
        console.error('找不到對應的訂單:', CustomField1);
      }
    } catch (err) {
      console.error('更新付款狀態時出錯:', err);
    }
  } else {
    console.log('交易驗證失敗');
  }

  res.send('1|OK');
});


router.get('/clientReturn', (req, res) => {
  res.redirect('http://localhost:8080/booking'); // 重定向到订课页面
});

module.exports = router;
