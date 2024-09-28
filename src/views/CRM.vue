<template>
  <div class="crm">
    <Toast />
    <h2>客戶關係管理</h2>
    <TabView>
      <TabPanel header="客戶列表">
        <DataTable :value="customers" :paginator="true" :rows="10" 
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
              <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editCustomer(slotProps.data)" />
              <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteCustomer(slotProps.data)" />
            </template>
          </Column>
        </DataTable>
      </TabPanel>
      <TabPanel header="預約統計">
        <Chart type="bar" :data="bookingStats" :options="chartOptions" style="height: 350px" />
      </TabPanel>
    </TabView>

    <Dialog v-model:visible="customerDialog" :style="{width: '450px'}" header="Customer Details" :modal="true" class="p-fluid">
      <div class="field">
        <label for="username">Username</label>
        <InputText id="username" v-model.trim="customer.username" required autofocus :class="{'p-invalid': submitted && !customer.username}" />
        <small class="p-error" v-if="submitted && !customer.username">Username is required.</small>
      </div>

      <div class="field">
        <label for="email">Email</label>
        <InputText id="email" v-model.trim="customer.email" required :class="{'p-invalid': submitted && !customer.email}" />
        <small class="p-error" v-if="submitted && !customer.email">Email is required.</small>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" text @click="saveCustomer" />
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

    const customers = computed(() => store.getters['customers/getCustomers']);
    const customerDialog = ref(false);
    const customer = ref({});
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

    onMounted(() => {
      store.dispatch('customers/fetchCustomers');
      // Here you would also fetch booking statistics
    });

    const clearFilter = () => {
      globalFilter.value = null;
    };

    const editCustomer = (data) => {
      customer.value = {...data};
      customerDialog.value = true;
    };

    const confirmDeleteCustomer = (data) => {
      confirm.require({
        message: 'Are you sure you want to delete this customer?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => deleteCustomer(data)
      });
    };

    const deleteCustomer = async (data) => {
      try {
        await store.dispatch('customers/deleteCustomer', data._id);
        toast.add({severity:'success', summary: 'Successful', detail: 'Customer Deleted', life: 3000});
      } catch (error) {
        console.error('Error deleting customer:', error);
        toast.add({severity:'error', summary: 'Error', detail: `Failed to delete customer: ${error.message}`, life: 3000});
      }
    };

    const hideDialog = () => {
      customerDialog.value = false;
      submitted.value = false;
    };

    const saveCustomer = async () => {
      submitted.value = true;
      if (customer.value.username && customer.value.email) {
        try {
          if (customer.value._id) {
            await store.dispatch('customers/updateCustomer', customer.value);  // Ensure customer.name is used
            toast.add({severity:'success', summary: 'Successful', detail: 'Customer Updated', life: 3000});
          } else {
            await store.dispatch('customers/addCustomer', customer.value);
            toast.add({severity:'success', summary: 'Successful', detail: 'Customer Created', life: 3000});
          }
          customerDialog.value = false;
          customer.value = {};
        } catch (error) {
          toast.add({severity:'error', summary: 'Error', detail: 'Failed to save customer', life: 3000});
        }
      }
    };


    return {
      customers,
      customerDialog,
      customer,
      submitted,
      globalFilter,
      bookingStats,
      chartOptions,
      clearFilter,
      editCustomer,
      confirmDeleteCustomer,
      deleteCustomer,
      hideDialog,
      saveCustomer
    };
  }
}
</script>

<style scoped lang="scss">
.crm {
  padding: 1rem;
}
</style>