<template>
  <div class="crm">
    <Toast />
    <h2>客戶關係管理</h2>
    <TabView>
      <TabPanel header="客戶列表">
        <DataTable :value="users" :paginator="true" :rows="10" 
                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                   :rowsPerPageOptions="[5,10,20,50]"
                   currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                   responsiveLayout="scroll"
                   :globalFilterFields="['username','email']">
          <template #header>
            <div class="flex justify-content-between">
              <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="globalFilter" placeholder="Keyword Search" />
              </span>
            </div>
          </template>
          <Column field="username" header="UserName" sortable style="width:25%"></Column>
          <Column field="email" header="Email" sortable style="width:25%"></Column>
          <Column header="Actions" style="width:25%">
            <template #body="slotProps">
              <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editUser(slotProps.data)" />
              <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteUser(slotProps.data)" />
            </template>
          </Column>
        </DataTable>
      </TabPanel>
      <TabPanel header="預約統計">
        <Chart type="bar" :data="bookingStats" :options="chartOptions" style="height: 350px" />
      </TabPanel>
    </TabView>

    <Dialog v-model:visible="userDialog" :style="{width: '450px'}" header="User Details" :modal="true" class="p-fluid">
      <div class="field">
        <label for="username">Username</label>
        <InputText id="username" v-model.trim="user.username" required autofocus :class="{'p-invalid': submitted && !user.username}" />
        <small class="p-error" v-if="submitted && !user.username">Username is required.</small>
      </div>

      <div class="field">
        <label for="email">Email</label>
        <InputText id="email" v-model.trim="user.email" required :class="{'p-invalid': submitted && !user.email}" />
        <small class="p-error" v-if="submitted && !user.email">Email is required.</small>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" outlined @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" @click="saveUser" />
      </template>
    </Dialog>

    <ConfirmDialog></ConfirmDialog>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from "primevue/useconfirm";
import { useRouter } from 'vue-router';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Chart from 'primevue/chart';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';

export default {
  components: {
    DataTable,
    Column,
    Button,
    InputText,
    Dialog,
    TabView,
    TabPanel,
    Chart,
    Toast,
    ConfirmDialog
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    const confirm = useConfirm();
    const router = useRouter();

    const users = computed(() => store.getters['users/getUsers']);
    const userDialog = ref(false);
    const user = ref({});
    const submitted = ref(false);
    const globalFilter = ref('');

    const bookingStats = ref({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Bookings',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: '#42A5F5'
        }
      ]
    });

    const chartOptions = ref({
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Monthly Booking Statistics'
        }
      }
    });

    onMounted(async () => {
      const token = store.state.auth.token;
      if (!token) {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: '請先登入',
          life: 3000
        });
        router.push('/login');
        return;
      }
      
      try {
        await store.dispatch('users/fetchUsers');
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: '獲取用戶列表失敗',
          life: 3000
        });
      }
    });

    const clearFilter = () => {
      globalFilter.value = null;
    };

    const editUser = (data) => {
      user.value = {...data};
      userDialog.value = true;
    };

    const confirmDeleteUser = (data) => {
      confirm.require({
        message: 'Are you sure you want to delete this user?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => deleteUser(data)
      });
    };

    const deleteUser = async (data) => {
      try {
        await store.dispatch('users/deleteUser', data._id);
        toast.add({severity:'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.add({severity:'error', summary: 'Error', detail: 'Failed to delete user', life: 3000});
      }
    };

    const hideDialog = () => {
      userDialog.value = false;
      submitted.value = false;
    };

    const saveUser = async () => {
      submitted.value = true;

      if (user.value.username && user.value.email) {
        try {
          if (user.value._id) {
            await store.dispatch('users/updateUser', user.value);
            toast.add({severity:'success', summary: 'Successful', detail: 'User Updated', life: 3000});
          } else {
            await store.dispatch('users/addUser', user.value);
            toast.add({severity:'success', summary: 'Successful', detail: 'User Created', life: 3000});
          }
          userDialog.value = false;
          user.value = {};
        } catch (error) {
          console.error('Error saving user:', error);
          toast.add({severity:'error', summary: 'Error', detail: 'Failed to save user', life: 3000});
        }
      }
    };

    return {
      users,
      userDialog,
      user,
      submitted,
      globalFilter,
      bookingStats,
      chartOptions,
      clearFilter,
      editUser,
      confirmDeleteUser,
      deleteUser,
      hideDialog,
      saveUser
    };
  }
}
</script>

<style scoped lang="scss">
.crm {
  padding: 1rem;
}

.crm {
  padding: 2rem;
  background-color: #f4f4f9;
  
  h2 {
    color: #333;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  .p-tabview-nav {
    background-color: #007bff;
    color: white;

    .p-tabview-selected a {
      background-color: #0056b3;
      color: white;
    }

    a {
      font-weight: bold;
      color: white;
    }
  }

  .p-datatable {
    .p-datatable-header {
      background-color: #f5f5f5;
      padding: 1rem;

      .p-input-icon-left {
        width: 100%;
        max-width: 300px;
        input {
          border-radius: 4px;
          padding: 0.75rem;
        }
        i {
          color: #ccc;
        }
      }
    }

    .p-column-header {
      background-color: #e9ecef;
      color: #495057;
      font-weight: bold;
    }

    .p-datatable-tbody {
      tr:hover {
        background-color: #f1f1f1;
      }
    }
  }

  .p-button {
    border-radius: 4px;
    font-size: 0.875rem;

    &.mr-2 {
      margin-right: 0.5rem;
    }
  }

  .p-button-outlined {
    border: 1px solid #007bff;
    color: #007bff;
    
    &:hover {
      background-color: #007bff;
      color: white;
    }
  }

  .p-button-danger {
    border-color: #dc3545;
    color: #dc3545;

    &:hover {
      background-color: #dc3545;
      color: white;
    }
  }

  .p-dialog {
    .p-dialog-header {
      background-color: #007bff;
      color: white;
      font-size: 1.25rem;
    }

    .p-dialog-content {
      padding-top: 1rem;
    }

    .p-dialog-footer {
      display: flex;
      justify-content: flex-end;
      padding-top: 1rem;

      .p-button-text {
        font-weight: 600;
      }
    }
  }

  .p-chart {
    margin-top: 2rem;
    padding: 1rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}

</style>