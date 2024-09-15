<template>
  <div class="booking-page" style="padding: 20px; background-color: #f0f0f0;">
    <p>Debug: BookingPage is rendering</p>
    <Toast />
    <h2>課程預約</h2>
    <p>Debug: Courses count: {{ courses.length }}</p>
    <p>Debug: Is loading: {{ $store.state.courses.isLoading }}</p>
    <p>Debug: Error: {{ $store.state.courses.error }}</p>
    <div v-show="$store.state.courses.isLoading">正在加載課程資料...</div>
    <div v-show="$store.state.courses.error">
      加載課程時出錯: {{ $store.state.courses.error }}
    </div>
    <form v-show="!$store.state.courses.isLoading && !$store.state.courses.error" @submit.prevent="submitBooking" class="p-fluid">
      <div class="p-field">
        <label for="course">選擇課程</label>
        <div v-if="courses.length === 0">沒有可用的課程</div>
        <div
          v-for="course in courses"
          :key="course.id"
          class="p-field-checkbox"
        >
          <RadioButton
            :inputId="'course_' + course.id"
            name="course"
            :value="course.id"
            v-model="booking.course"
            @change="onCourseChange(course)"
          />
          <label :for="'course_' + course.id">
            {{ course.name }} (ID: {{ course.id }})
          </label>
        </div>
        <small v-if="v$.booking.course.$invalid && submitted" class="p-error"
          >請選擇一個課程</small
        >
      </div>

      <div class="p-field">
        <label for="name">姓名</label>
        <InputText
          id="name"
          v-model.trim="booking.name"
          :class="{ 'p-invalid': v$.booking.name.$invalid && submitted }"
        />
        <small v-if="v$.booking.name.$invalid && submitted" class="p-error"
          >請輸入姓名</small
        >
      </div>
      <div class="p-field">
        <label for="email">電子郵件</label>
        <InputText
          id="email"
          v-model.trim="booking.email"
          :class="{ 'p-invalid': v$.booking.email.$invalid && submitted }"
        />
        <small v-if="v$.booking.email.$invalid && submitted" class="p-error"
          >請輸入有效的電子郵件地址</small
        >
      </div>
      <div class="p-field">
        <label for="phone">電話</label>
        <InputText
          id="phone"
          v-model.trim="booking.phone"
          :class="{ 'p-invalid': v$.booking.phone.$invalid && submitted }"
        />
        <small v-if="v$.booking.phone.$invalid && submitted" class="p-error"
          >請輸入有效的電話號碼</small
        >
      </div>
      <Button type="submit" label="預約" />
    </form>
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

export default {
  created() {
    this.$store.dispatch('courses/fetchCourses')
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

    const booking = reactive({
      course: null,
      name: "",
      email: "",
      phone: "",
    });

    const rules = {
      booking: {
        course: { required },
        name: { required },
        email: { required, email },
        phone: { required },
      },
    };

    const v$ = useVuelidate(rules, { booking });

    const submitted = ref(false);

    const courses = computed(() => {
      console.log('Computed courses:', store.state.courses.list)
      return store.state.courses.list
    })

    onMounted(() => {
      console.log('BookingPage mounted')
      if (courses.value.length === 0) {
        console.log('Dispatching fetchCourses')
        store.dispatch('courses/fetchCourses')
      }
    })

    const onCourseChange = (course) => {
      console.log("Selected course:", course);
      booking.course = course.id;
    };

    const submitBooking = async () => {
      submitted.value = true;
      const isFormCorrect = await v$.value.$validate();
      if (isFormCorrect) {
        try {
          await store.dispatch("bookings/createBooking", booking);
          toast.add({
            severity: "success",
            summary: "成功",
            detail: "預約已提交",
            life: 3000,
          });
          // Reset form
          booking.course = null;
          booking.name = "";
          booking.email = "";
          booking.phone = "";
          submitted.value = false;
        } catch (error) {
          toast.add({
            severity: "error",
            summary: "錯誤",
            detail:
              "預約提交失敗: " +
              (error.response?.data?.message || error.message),
            life: 3000,
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
      submitBooking
    };
  },
};
</script>

<style scoped lang="scss">
.booking-page {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
}

.p-selectbutton {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
