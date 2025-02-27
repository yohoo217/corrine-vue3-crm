<template>
  <div class="personal-info">
    <Toast />
    <div class="p-card animated fadeInUp">
      <h2 class="p-text-center">{{ $t("personal_info.title") }}</h2>
      <div v-if="user" class="p-fluid">
        <div class="p-field animated fadeInLeft">
          <label for="username">{{ $t("personal_info.username") }}</label>
          <InputText id="username" v-model="user.username" disabled />
        </div>
        <div class="p-field animated fadeInRight">
          <label for="email">{{ $t("personal_info.email") }}</label>
          <InputText id="email" v-model="user.email" disabled />
        </div>

        <h3 class="p-mt-4 animated fadeInUp">
          {{ $t("personal_info.booked_courses") }}
        </h3>
        <DataTable
          :value="bookings"
          :paginator="true"
          :rows="5"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 20]"
          responsiveLayout="scroll"
          :currentPageReportTemplate="$t('personal_info.page_report_template')"
          class="animated fadeIn"
        >
          <Column
            field="course.name"
            :header="$t('personal_info.course_name')"
          />
          <Column field="date" :header="$t('personal_info.booking_date')">
            <template #body="slotProps">
              {{ new Date(slotProps.data.date).toLocaleString() }}
            </template>
          </Column>
          <Column
            field="paymentStatus"
            :header="$t('personal_info.payment_status')"
          >
            <template #body="slotProps">
              <span
                :class="{
                  'status-paid': slotProps.data.paymentStatus === 'Paid',
                  'status-unpaid': slotProps.data.paymentStatus === 'Unpaid',
                }"
              >
                {{ slotProps.data.paymentStatus }}
              </span>
            </template>
          </Column>
        </DataTable>
      </div>
      <ProgressSpinner v-else class="p-d-flex p-jc-center animated fadeIn" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import apiClient from "../api/config";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ProgressSpinner from "primevue/progressspinner";
import Toast from "primevue/toast";

export default {
  name: "PersonalInfo",
  components: {
    InputText,
    DataTable,
    Column,
    ProgressSpinner,
    Toast,
  },
  setup() {
    const store = useStore();
    const user = ref(null);
    const bookings = ref([]);

    const fetchUserInfo = async () => {
      try {
        const response = await apiClient.get("/users/me", {
          headers: {
            Authorization: `Bearer ${store.state.auth.token}`,
          },
        });
        user.value = response.data;


        if (!user.value.email) {
          console.log("User data:", user.value);
          console.log("Fetched user data:", response.data);
          console.error("User email is undefined");
          // 可以顯示錯誤訊息或重新導向
          return;
        }

        // 獲取用戶的預約信息
        const bookingsResponse = await apiClient.get(
          `/bookings/user/email/${user.value.email}`,
          {
            headers: {
              Authorization: `Bearer ${store.state.auth.token}`,
            },
          }
        );
        bookings.value = bookingsResponse.data;
      } catch (error) {
        console.error("Failed to fetch user information:", error);
        // 使用 Toast 顯示錯誤信息
      }
    };

    onMounted(fetchUserInfo);

    return {
      user,
      bookings,
    };
  },
};
</script>

<style scoped lang="scss">
.personal-info {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;

  .p-card {
    width: 100%;
    max-width: 800px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    border-radius: 8px;

    h2 {
      color: #2c3e50;
      margin-bottom: 2rem;
    }

    .p-field {
      margin-bottom: 1.5rem;
    }

    .p-inputtext:disabled {
      opacity: 0.7;
      background-color: #f4f4f4;
    }

    h3 {
      color: #34495e;
      margin-top: 2rem;
      margin-bottom: 1rem;
    }

    .status-paid {
      color: #2ecc71;
      font-weight: bold;
    }

    .status-unpaid {
      color: #e74c3c;
      font-weight: bold;
    }
  }
}
</style>
