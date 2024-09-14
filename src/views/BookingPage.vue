<template>
  <div class="booking-page">
    <Toast />
    <h2>課程預約</h2>
    <form @submit.prevent="submitBooking" class="p-fluid">
      <div class="p-field">
        <label for="course">選擇課程</label>
        <div
          v-for="course in courses"
          :key="course.id || course._id"
          class="p-field-checkbox"
        >
          <RadioButton
            :inputId="'course_' + (course.id || course._id)"
            name="course"
            :value="course"
            v-model="selectedCourse"
            @change="onCourseChange(course)"
          />
          <label :for="'course_' + (course.id || course._id)">
            {{ course.name }} (ID: {{ course.id || course._id }})
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
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useToast } from "primevue/usetoast";
import RadioButton from "primevue/radiobutton";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Toast from "primevue/toast";

export default {
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
      course: null, // 改为 course 而不是 courseId
      name: "",
      email: "",
      phone: "",
    });

    const selectedCourse = ref(null);
    const submitted = ref(false);

    const courses = computed(() => {
      return store.state.courses.list;
    });

    watch(selectedCourse, (newCourse) => {
      if (newCourse) {
        onCourseChange(newCourse);
      }
    });

    const rules = {
      booking: {
        course: { required }, // 使用 'course' 而不是 'courseId'
        name: { required },
        email: { required, email },
        phone: { required },
      },
    };

    const v$ = useVuelidate(rules, { booking });

    const onCourseChange = (course) => {
      console.log("Selected course (full object):", JSON.stringify(course));
      if (course && (course.id || course._id)) {
        booking.course = course.id || course._id;
        console.log("Updated booking.course:", booking.course);
      } else {
        console.error(
          "Selected course does not have a valid id:",
          JSON.stringify(course)
        );
        booking.course = null; // 如果没有有效的 ID，将 course 设置为 null
      }
    };

    const submitBooking = async () => {
      submitted.value = true;
      console.log(
        "Submitting booking, current state:",
        JSON.stringify(booking)
      );
      const isFormCorrect = await v$.value.$validate();
      if (isFormCorrect) {
        console.log("Sending booking data:", JSON.stringify(booking)); // 添加这行
        try {
          const result = await store.dispatch(
            "bookings/createBooking",
            booking
          );
          console.log("Booking result:", result); // 添加这行
          toast.add({
            severity: "success",
            summary: "成功",
            detail: "預約已提交",
            life: 3000,
          });
          // Reset form
          booking.courseId = null;
          booking.name = "";
          booking.email = "";
          booking.phone = "";
          submitted.value = false;
        } catch (error) {
          console.error("Booking submission error:", error.response?.data); // 修改这行
          toast.add({
            severity: "error",
            summary: "錯誤",
            detail:
              "預約提交失敗: " +
              (error.response?.data?.message || error.message),
            life: 3000,
          });
        }
      } else {
        console.log("Form validation errors:", v$.value.$errors);
      }
    };

    onMounted(async () => {
      console.log("Component mounted");
      try {
        await store.dispatch("courses/fetchCourses");
        console.log(
          "Courses after fetching:",
          JSON.stringify(store.state.courses.list)
        );
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    });

    return {
      courses,
      booking,
      v$,
      submitted,
      submitBooking,
      onCourseChange,
      selectedCourse,
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
