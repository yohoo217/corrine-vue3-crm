<!-- src/components/BookingForm.vue -->
<template>
  <div class="booking-form">
    <h2>課程預約</h2>
    <form @submit.prevent="submitBooking">
      <div class="field">
        <label for="course">選擇課程</label>
        <Dropdown 
          id="course" 
          v-model="booking.course" 
          :options="courses" 
          optionLabel="name" 
          placeholder="選擇課程"
          class="w-full"
          @change="onCourseChange"
        />
        <p v-if="isLoading">正在加載課程...</p>
        <p>已選擇的課程: {{ booking.course ? booking.course.name : '無' }}</p>
      </div>
      <div class="field">
        <label for="name">姓名</label>
        <InputText id="name" v-model="booking.name" required class="w-full" />
      </div>
      <div class="field">
        <label for="email">電子郵件</label>
        <InputText id="email" v-model="booking.email" required type="email" class="w-full" />
      </div>
      <div class="field">
        <label for="phone">電話</label>
        <InputText id="phone" v-model="booking.phone" required class="w-full" />
      </div>
      <Button type="submit" label="預約" class="w-full" />
    </form>
    <div>
      <h3>調試信息：</h3>
      <p>課程數量: {{ courses.length }}</p>
      <p>當前選擇: {{ JSON.stringify(booking.course) }}</p>
      <p>加載狀態: {{ isLoading ? '加載中' : '加載完成' }}</p>
      <button @click="forceRefetchCourses">強制重新獲取課程</button>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { ref, onMounted, computed, watch } from 'vue';
import { useStore } from 'vuex';
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
    const store = useStore();
    const isLoading = ref(true);
    const booking = ref({
      course: null,
      name: '',
      email: '',
      phone: ''
    });

    const courses = computed(() => {
      console.log('Computed courses called, length:', store.state.courses.list.length);
      return store.state.courses.list;
    });

    const fetchCourses = async () => {
      console.log('Fetching courses...');
      isLoading.value = true;
      try {
        await store.dispatch('courses/fetchCourses');
        console.log('Courses fetched successfully');
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      console.log('Component mounted');
      fetchCourses();
    });

    watch(() => courses.value, (newCourses) => {
      console.log('Courses updated, new length:', newCourses.length);
    });

    const onCourseChange = (event) => {
      console.log('Course changed:', event.value);
    };

    const submitBooking = () => {
      console.log('Booking submitted:', booking.value);
      // 實現提交邏輯
    };

    const forceRefetchCourses = () => {
      console.log('Forcing refetch of courses');
      fetchCourses();
    };

    return {
      courses,
      booking,
      submitBooking,
      onCourseChange,
      isLoading,
      forceRefetchCourses
    };
  }
}
</script>

<style scoped>
.booking-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.field {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}
</style>