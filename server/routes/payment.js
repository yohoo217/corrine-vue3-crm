// server/routes/payment.js

const express = require('express');
const router = express.Router();
const ecpay_payment = require('ecpay_aio_nodejs');
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
  const { price, itemName } = req.body;

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
    ReturnURL: `${HOST}/api/payment/return`, // 綠界的回傳 URL
    ClientBackURL: `${HOST}/api/payment/clientReturn`, // 用戶完成交易後的返回 URL
  };
  
  const create = new ecpay_payment(options);
  const html = create.payment_client.aio_check_out_all(base_param);

  res.send(html); // 回傳支付 HTML 表單
});

router.post('/return', async (req, res) => {
  const { CheckMacValue } = req.body;
  const data = { ...req.body };
  delete data.CheckMacValue;

  const create = new ecpay_payment(options);
  const checkValue = create.payment_client.helper.gen_chk_mac_value(data);

  if (CheckMacValue === checkValue) {
    console.log('交易驗證成功');
  } else {
    console.log('交易驗證失敗');
  }

  res.send('1|OK'); // 回傳給綠界確認成功
});

router.get('/clientReturn', (req, res) => {
  res.send('交易完成，您可以返回應用程式。');
});

module.exports = router;
