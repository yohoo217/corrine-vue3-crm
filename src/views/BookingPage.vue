<template>
  <div class="booking-page">
    <Toast />
    <div class="p-d-flex p-jc-center">
      <div class="p-card">
        <h2 class="p-text-center">課程預約</h2>
        <div v-show="$store.state.courses.isLoading" class="p-text-center">
          <ProgressSpinner />
          <p>正在加載課程資料...</p>
        </div>
        <div v-show="$store.state.courses.error" class="p-error p-text-center">
          加載課程時出錯: {{ $store.state.courses.error }}
        </div>
        <form
          v-show="!$store.state.courses.isLoading && !$store.state.courses.error"
          @submit.prevent="submitBooking"
          class="p-fluid"
        >
          <div class="p-field">
            <label for="course">選擇課程</label>
            <div v-if="courses.length === 0" class="p-text-center">沒有可用的課程</div>
            <div
              v-for="course in courses"
              :key="course.id"
              class="p-field-checkbox p-d-flex p-ai-center"
            >
              <RadioButton
                :inputId="'course_' + course.id"
                name="course"
                :value="course.id"
                v-model="booking.course"
                @change="onCourseChange(course)"
              />
              <label :for="'course_' + course.id" class="p-ml-2">
                {{ course.name }}
              </label>
            </div>
            <small v-if="v$.booking.course.$invalid && submitted" class="p-error">
              請選擇一個課程
            </small>
          </div>

          <div class="p-field">
            <label for="name">姓名</label>
            <InputText
              id="name"
              v-model.trim="booking.name"
              :class="{ 'p-invalid': v$.booking.name.$invalid && submitted }"
              disabled
            />
            <small v-if="v$.booking.name.$invalid && submitted" class="p-error">
              請輸入姓名
            </small>
          </div>
          <div class="p-field">
            <label for="email">電子郵件</label>
            <InputText
              id="email"
              v-model.trim="booking.email"
              :class="{ 'p-invalid': v$.booking.email.$invalid && submitted }"
              disabled
            />
            <small v-if="v$.booking.email.$invalid && submitted" class="p-error">
              請輸入有效的電子郵件地址
            </small>
          </div>
          <Button type="submit" label="預約" class="p-button-raised p-button-rounded" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useToast } from "primevue/usetoast";
import RadioButton from "primevue/radiobutton";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Toast from "primevue/toast";
import apiClient from '../api/config';

export default {
  created() {
    this.$store.dispatch("courses/fetchCourses");
  },
  components: {
    RadioButton,
    InputText,
    Button,
    Toast,
  },
  setup() {
    const store = useStore();
    const toast = useToast();

    const user = computed(() => store.state.auth.user);

    const booking = reactive({
      course: null,
      name: "",
      email: "",
    });

    const fetchUserInfo = async () => {
      try {
        const response = await apiClient.get('/users/me', {
          headers: {
            Authorization: `Bearer ${store.state.auth.token}`,
          },
        });
        const userData = response.data;
        booking.name = userData.username;
        booking.email = userData.email;
      } catch (error) {
        console.error('Failed to fetch user information:', error);
        toast.add({
          severity: 'error',
          summary: '錯誤',
          detail: '無法獲取用戶資料',
          life: 3000
        });
      }
    };

    onMounted(() => {
      fetchUserInfo();
      if (courses.value.length === 0) {
        console.log("Dispatching fetchCourses");
        store.dispatch("courses/fetchCourses");
      }
    });

    const rules = {
      booking: {
        course: { required },
        name: { required },
        email: { required, email },
      },
    };

    const v$ = useVuelidate(rules, { booking });

    const submitted = ref(false);

    const courses = computed(() => {
      console.log("Computed courses:", store.state.courses.list);
      return store.state.courses.list;
    });

    const onCourseChange = (course) => {
      console.log("Selected course:", course);
      booking.course = course.id;
    };

    const submitBooking = async () => {
      submitted.value = true;
      const isFormCorrect = await v$.value.$validate();
      if (isFormCorrect) {
        if (!booking.course) {
          toast.add({
            severity: "error",
            summary: "錯誤",
            detail: "請選擇一個課程",
            life: 3000
          });
          return;
        }
        try {
          console.log("Submitting booking data:", booking);
          const bookingData = {
            course: booking.course,
            name: booking.name,
            email: booking.email
          };
          console.log("Final booking data to submit:", bookingData);
          const response = await store.dispatch("bookings/createBooking", bookingData);
          console.log("Booking creation response:", response);
          // 重置表單
          booking.course = null;
          submitted.value = false;
          toast.add({
            severity: 'success',
            summary: '成功',
            detail: '預約已成功提交',
            life: 3000
          });
        } catch (error) {
          console.error("Error in submitBooking:", error);
          toast.add({
            severity: "error",
            summary: "錯誤",
            detail: "預約提交失敗: " + (error.response?.data?.details || error.message),
            life: 3000
          });
        }
      }
    };

    return {
      booking,
      v$,
      submitted,
      courses,
      onCourseChange,
      submitBooking,
      user,
    };
  },
};
</script>

<style scoped lang="scss">
.booking-page {
  background-image: url('https://static.ottercdn.com/trek/media/e8c56e9d-c85c-4e1a-bab4-76325433fd36.png');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  .p-card {
    max-width: 500px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    animation: fadeIn 0.5s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  h2 {
    color: #2c3e50;
    margin-bottom: 2rem;
  }

  .p-field {
    margin-bottom: 1.5rem;
    transition: all 0.3s ease;
  }

  .p-field:hover {
    transform: translateX(5px);
  }

  .p-button {
    margin-top: 1rem;
    transition: all 0.3s ease;
  }

  .p-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .p-inputtext:disabled {
    opacity: 0.7;
  }

  .p-field-checkbox {
    margin-bottom: 0.5rem;
  }
}
</style>