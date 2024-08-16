<template>
  <div class="booking-page">
    <Toast />
    <h2>課程預約</h2>
    <form @submit.prevent="submitBooking" class="p-fluid">
      <div class="p-field">
        <label for="course">選擇課程</label>
        <Dropdown id="course" v-model="booking.courseId" :options="courses" optionLabel="name" optionValue="id" placeholder="選擇課程" :class="{'p-invalid': v$.booking.courseId.$invalid && submitted}" />
        <small v-if="v$.booking.courseId.$invalid && submitted" class="p-error">請選擇一個課程</small>
      </div>
      <div class="p-field">
        <label for="name">姓名</label>
        <InputText id="name" v-model.trim="booking.name" :class="{'p-invalid': v$.booking.name.$invalid && submitted}" />
        <small v-if="v$.booking.name.$invalid && submitted" class="p-error">請輸入姓名</small>
      </div>
      <div class="p-field">
        <label for="email">電子郵件</label>
        <InputText id="email" v-model.trim="booking.email" :class="{'p-invalid': v$.booking.email.$invalid && submitted}" />
        <small v-if="v$.booking.email.$invalid && submitted" class="p-error">請輸入有效的電子郵件地址</small>
      </div>
      <div class="p-field">
        <label for="phone">電話</label>
        <InputText id="phone" v-model.trim="booking.phone" :class="{'p-invalid': v$.booking.phone.$invalid && submitted}" />
        <small v-if="v$.booking.phone.$invalid && submitted" class="p-error">請輸入有效的電話號碼</small>
      </div>
      <Button type="submit" label="預約" />
    </form>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { useToast } from 'primevue/usetoast';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toast from 'primevue/toast';

export default {
  components: {
    Dropdown,
    InputText,
    Button,
    Toast
  },
  setup() {
    const store = useStore();
    const toast = useToast();

    const courses = computed(() => store.state.courses.list);

    const booking = reactive({
      courseId: null,
      name: '',
      email: '',
      phone: ''
    });

    const rules = {
      booking: {
        courseId: { required },
        name: { required },
        email: { required, email },
        phone: { required }
      }
    };

    const v$ = useVuelidate(rules, { booking });

    const submitted = ref(false);

    const submitBooking = async () => {
      submitted.value = true;
      const isFormCorrect = await v$.value.$validate();
      if (isFormCorrect) {
        try {
          await store.dispatch('bookings/createBooking', booking);
          toast.add({ severity: 'success', summary: '成功', detail: '預約已提交', life: 3000 });
          // 重置表單
          booking.courseId = null;
          booking.name = '';
          booking.email = '';
          booking.phone = '';
          submitted.value = false;
        } catch (error) {
          toast.add({ severity: 'error', summary: '錯誤', detail: '預約提交失敗', life: 3000 });
        }
      }
    };

    return {
      courses,
      booking,
      v$,
      submitted,
      submitBooking
    };
  }
}
</script>

<style scoped lang="scss">
.booking-page {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
}
</style>