<!-- src/views/CourseList.js -->
<template>
  <div class="course-list">
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <div class="card">
      <Toolbar class="mb-4">
        <template #start>
          <Button label="新增課程" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
          <Button label="刪除" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedCourses || !selectedCourses.length" />
        </template>
        <template #end>
          <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="導入" class="mr-2 inline-block" />
          <Button label="導出" icon="pi pi-upload" class="p-button-help" @click="exportCSV" />
        </template>
      </Toolbar>

      <DataTable 
        ref="dt"
        :value="courses" 
        v-model:selection="selectedCourses" 
        dataKey="id" 
        :paginator="true" 
        :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" 
        :rowsPerPageOptions="[5,10,25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} courses"
        responsiveLayout="scroll"
      >
        <template #header>
          <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 class="m-0">管理課程</h5>
            <span class="block mt-2 md:mt-0 p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters['global'].value" placeholder="搜索..." />
            </span>
          </div>
        </template>

        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column field="name" header="課程名稱" :sortable="true" headerStyle="width:14%; min-width:10rem;">
          <template #body="slotProps">
            <span class="p-column-title">課程名稱</span>
            {{ slotProps.data.name }}
          </template>
        </Column>
        <Column field="instructor" header="講師" :sortable="true" headerStyle="width:14%; min-width:10rem;">
          <template #body="slotProps">
            <span class="p-column-title">講師</span>
            {{ slotProps.data.instructor }}
          </template>
        </Column>
        <Column field="date" header="日期" :sortable="true" headerStyle="width:14%; min-width:10rem;">
          <template #body="slotProps">
            <span class="p-column-title">日期</span>
            {{ formatDate(slotProps.data.date) }}
          </template>
        </Column>
        <Column headerStyle="min-width:10rem;">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editCourse(slotProps.data)" />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2" @click="confirmDeleteCourse(slotProps.data)" />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog v-model:visible="courseDialog" :style="{width: '450px'}" header="課程詳情" :modal="true" class="p-fluid">
      <div class="field">
        <label for="name">課程名稱</label>
        <InputText id="name" v-model.trim="course.name" required autofocus :class="{'p-invalid': submitted && !course.name}" />
        <small class="p-error" v-if="submitted && !course.name">課程名稱為必填項。</small>
      </div>
      <div class="field">
        <label for="instructor">講師</label>
        <InputText id="instructor" v-model.trim="course.instructor" required :class="{'p-invalid': submitted && !course.instructor}" />
        <small class="p-error" v-if="submitted && !course.instructor">講師為必填項。</small>
      </div>
      <div class="field">
        <label for="date">日期</label>
        <Calendar id="date" v-model="course.date" dateFormat="yy-mm-dd" :showIcon="true" :class="{'p-invalid': submitted && !course.date}" />
        <small class="p-error" v-if="submitted && !course.date">日期為必填項。</small>
      </div>
      <div class="field">
        <label for="description">描述</label>
        <Textarea id="description" v-model="course.description" required rows="3" cols="20" />
      </div>
      
      <template #footer>
        <Button label="取消" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
        <Button label="保存" icon="pi pi-check" class="p-button-text" @click="saveCourse" />
      </template>
    </Dialog>

    <Dialog v-model:visible="deleteCourseDialog" :style="{width: '450px'}" header="確認" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="course">你確定要刪除 <b>{{course.name}}</b>?</span>
      </div>
      <template #footer>
        <Button label="否" icon="pi pi-times" class="p-button-text" @click="deleteCourseDialog = false" />
        <Button label="是" icon="pi pi-check" class="p-button-text" @click="deleteCourse" />
      </template>
    </Dialog>

    <Dialog v-model:visible="deleteCoursesDialog" :style="{width: '450px'}" header="確認" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="course">你確定要刪除選中的課程嗎?</span>
      </div>
      <template #footer>
        <Button label="否" icon="pi pi-times" class="p-button-text" @click="deleteCoursesDialog = false" />
        <Button label="是" icon="pi pi-check" class="p-button-text" @click="deleteSelectedCourses" />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { FilterMatchMode } from 'primevue/api';

// 直接導入 PrimeVue 組件
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Calendar from 'primevue/calendar';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import FileUpload from 'primevue/fileupload';

export default {
  setup() {
    const store = useStore();
    const toast = useToast();
    const confirmDialog = useConfirm();
    const dt = ref(null);
    const courses = computed(() => store.state.courses.list);
    const courseDialog = ref(false);
    const deleteCourseDialog = ref(false);
    const deleteCoursesDialog = ref(false);
    const course = ref({});
    const selectedCourses = ref(null);
    const submitted = ref(false);
    const filters = ref({
      'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
    });

    onMounted(() => {
      if (courses.value.length === 0) {
        store.dispatch('courses/fetchCourses');
      }
    });

    const formatDate = (value) => {
      return new Date(value).toLocaleDateString();
    };

    const openNew = () => {
      course.value = {};
      submitted.value = false;
      courseDialog.value = true;
    };

    const hideDialog = () => {
      courseDialog.value = false;
      submitted.value = false;
    };

    const showDetails = (course) => {
      confirm.require({
        message: `你想查看 "${course.name}" 的詳細信息嗎？`,
        header: '確認',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          // 這裡添加查看詳情的邏輯
          toast.add({severity:'info', summary: '課程詳情', detail: course.name, life: 3000});
        },
        reject: () => {
          // 可選：當用戶拒絕時的邏輯
        }
      });
    };

    const saveCourse = async () => {
      submitted.value = true;

      if (course.value.name?.trim()) {
        try {
          if (course.value.id) {
            await store.dispatch('courses/updateCourse', course.value);
            toast.add({severity:'success', summary: '成功', detail: '課程已更新', life: 3000});
          } else {
            await store.dispatch('courses/addCourse', course.value);
            toast.add({severity:'success', summary: '成功', detail: '課程已創建', life: 3000});
          }
          courseDialog.value = false;
          course.value = {};
        } catch (error) {
          toast.add({severity:'error', summary: '錯誤', detail: '保存課程時發生錯誤', life: 3000});
          console.error('Error saving course:', error);
        }
      }
    };

    const editCourse = (editCourse) => {
      course.value = {...editCourse};
      courseDialog.value = true;
    };

    const confirmDeleteCourse = (deleteCourse) => {
      course.value = deleteCourse;
      deleteCourseDialog.value = true;
    };

    const deleteCourse = () => {
      store.dispatch('courses/deleteCourse', course.value.id);
      deleteCourseDialog.value = false;
      course.value = {};
      toast.add({severity:'success', summary: '成功', detail: '課程已刪除', life: 3000});
    };

    const exportCSV = () => {
      dt.value.exportCSV();
    };

    const confirmDeleteSelected = () => {
      deleteCoursesDialog.value = true;
    };

    const deleteSelectedCourses = () => {
      store.dispatch('courses/deleteSelectedCourses', selectedCourses.value);
      deleteCoursesDialog.value = false;
      selectedCourses.value = null;
      toast.add({severity:'success', summary: '成功', detail: '選中的課程已刪除', life: 3000});
    };

    return {
      dt,
      courses,
      courseDialog,
      deleteCourseDialog,
      deleteCoursesDialog,
      course,
      selectedCourses,
      submitted,
      filters,
      formatDate,
      openNew,
      hideDialog,
      saveCourse,
      editCourse,
      confirmDeleteCourse,
      deleteCourse,
      exportCSV,
      confirmDeleteSelected,
      confirmDialog,
      confirm,
      showDetails,
      deleteSelectedCourses
    };
  },
  name: 'CourseList',
  components: {
    DataTable,
    Column,
    Button,
    Toolbar,
    Dialog,
    InputText,
    Textarea,
    Calendar,
    Toast,
    ConfirmDialog,
    FileUpload,
  }
}
</script>

<style scoped lang="scss">
@import 'primeflex/primeflex.css'; 
.course-list {
  padding: 2rem;
  background-color: #f9f9f9;
  
  .card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
  }

  h5 {
    color: #444;
    font-size: 1.25rem;
    margin: 0;
    font-weight: 600;
  }

  .p-input-icon-left {
    width: 100%;
    max-width: 300px;
    margin-bottom: 1rem;

    i {
      color: #aaa;
    }

    input {
      border-radius: 4px;
    }
  }

  .p-column-title {
    font-weight: bold;
    color: #333;
  }

  .p-button {
    border-radius: 4px;
    font-size: 0.875rem;
  }

  .p-button-success {
    background-color: #28a745;
    border-color: #28a745;

    &:hover {
      background-color: #218838;
      border-color: #1e7e34;
    }
  }

  .p-button-danger {
    background-color: #dc3545;
    border-color: #dc3545;

    &:hover {
      background-color: #c82333;
      border-color: #bd2130;
    }
  }

  .p-button-help {
    background-color: #17a2b8;
    border-color: #17a2b8;

    &:hover {
      background-color: #138496;
      border-color: #117a8b;
    }
  }

  .p-button-warning {
    background-color: #ffc107;
    border-color: #ffc107;

    &:hover {
      background-color: #e0a800;
      border-color: #d39e00;
    }
  }

  .p-button-text {
    color: #007bff;
  }

  .p-calendar {
    input {
      border-radius: 4px;
    }
  }

  .p-dialog {
    .p-dialog-header {
      background-color: #007bff;
      color: #fff;
      font-size: 1.25rem;
    }

    .p-dialog-footer {
      display: flex;
      justify-content: flex-end;
      padding-top: 1rem;
    }

    .p-button-text {
      font-weight: 600;
    }
  }

  .p-confirm-dialog {
    .p-dialog-content {
      font-size: 1rem;
      color: #333;
    }
  }

  .confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    i {
      color: #dc3545;
    }

    span {
      font-size: 1rem;
      font-weight: 600;
      color: #333;
    }
  }

  .p-inputtext {
    border-radius: 4px;
    padding: 0.75rem;
  }

  .p-toolbar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;

    .p-button {
      margin-right: 0.5rem;
    }
  }

  .p-datatable {
    .p-datatable-tbody tr {
      &:hover {
        background-color: #f1f1f1;
      }
    }

    .p-datatable-thead th {
      background-color: #f5f5f5;
      font-weight: bold;
    }
  }

  .p-toast {
    .p-toast-message {
      font-size: 1rem;
    }
  }
}

</style>