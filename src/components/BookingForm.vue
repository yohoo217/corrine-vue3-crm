<!-- src/components/BookingForm.vue -->
<template>
    <div class="booking-form">
      <h2>課程預約</h2>
      <form @submit.prevent="submitBooking">
        <div class="field">
          <label for="course">選擇課程</label>
          <Dropdown id="course" v-model="booking.courseId" :options="courses" optionLabel="name" optionValue="id" placeholder="選擇課程" />
        </div>
        <div class="field">
          <label for="name">姓名</label>
          <InputText id="name" v-model="booking.name" required />
        </div>
        <div class="field">
          <label for="email">電子郵件</label>
          <InputText id="email" v-model="booking.email" required type="email" />
        </div>
        <div class="field">
          <label for="phone">電話</label>
          <InputText id="phone" v-model="booking.phone" required />
        </div>
        <Button type="submit" label="預約" />
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import Dropdown from 'primevue/dropdown';
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  
  export default {
    name: 'BookingForm',
    components: {
      Dropdown,
      InputText,
      Button
    },
    setup() {
      const courses = ref([
        { id: 1, name: 'Vue.js 基礎' },
        { id: 2, name: 'React 進階' },
        // 添加更多課程...
      ]);
  
      const booking = ref({
        courseId: null,
        name: '',
        email: '',
        phone: ''
      });
  
      const submitBooking = () => {
        // 這裡添加提交預約的邏輯
        console.log('Booking submitted:', booking.value);
        // 清空表單
        booking.value = {
          courseId: null,
          name: '',
          email: '',
          phone: ''
        };
      };
  
      return {
        courses,
        booking,
        submitBooking
      };
    }
  }
  </script>