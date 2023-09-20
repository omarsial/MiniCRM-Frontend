<script setup>
import { useAppStore } from '@/store/app';
import { useEmployeeStore } from '@/store/employeeStore';
import { Toast } from 'bootstrap';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const employees = ref([]) // Ref to store employee data
const currentPage = ref(1) // Ref for current page
const lastPage = ref(1) // Ref for last page
const perPage = 10 // Number of items per page
const store = useAppStore()
const employeeStore = useEmployeeStore()

const fetchEmployees = async () => {
    console.log('in api employees');
    let res = await store.getResource(`/employees?page=${currentPage.value}`);
    employees.value =  res.data;
    currentPage.value = res.meta.current_page
    lastPage.value = res.meta.last_page
}

const nextPage = async () => {
    console.log('currentPage.value < lastPage.value', currentPage.value < lastPage.value);
  if (currentPage.value < lastPage.value) {
    currentPage.value++
    await fetchEmployees()
  }
}

const prevPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value--
    await fetchEmployees()
  }
}

  // Function to navigate to the "Edit employee" component
const editEmployee = (employee) => {
    // router.push(`/employees/${id}`);
    employeeStore.setSelectedEmployee(employee);
    router.push({ name: 'edit_employee', params: { employeeId: employee.id }});
}

const createEmployee = () => {
    // router.push(`/employees/${id}`);
    router.push({ name: 'create_employee'});
}

const removeEmployee = async employee_id => {
   let res = await store.deleteResource('employees/'+employee_id);
   if(res){
        await fetchEmployees()
   }
}


onMounted(async () => {
    fetchEmployees()
})

</script>


<template>
    <div class="card">
        <div class="card-header d-block">
            <h3 class="card-title d-inline"> employees </h3>
        
                <div style="float: right">
                        <a @click="createEmployee" title="Add" class="btn  btn-sm btn-success" style="">
                            <span class="fe fe-user-plus"> Create</span>
                        </a>
                </div>

        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered text-nowrap border-bottom w-100" id="employees-datatable">
                    <thead>
                        <tr>
                            <th class="wd-15p border-bottom-0">Id</th>
                            <th class="wd-15p border-bottom-0">Name</th>
                            <th class="wd-15p border-bottom-0">Company</th>
                            <th class="wd-15p border-bottom-0">Email</th>
                            <th class="wd-15p border-bottom-0">Phone</th>
                            <th class="wd-10p border-bottom-0">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(employee, index) in employees" :key="'emp-'+employee.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ employee.name }}</td>
                            <td>{{ employee.company?.name }}</td>
                            <td> {{ employee.email }}</td>
                            <td>
                                {{ employee.phone }}
                            </td>
                            <td>
                                <button @click="editEmployee(employee)" id="bEdit"  class="btn btn-sm ms-1 btn-outline-warning" data-bs-placement="top" 
                                title="Edit">
                                <span class="fas fa-edit"> </span>
                                </button>
                                <button id="" class="btn btn-sm ms-1 btn-outline-danger" data-type="Team Member" title="Delete" @click="removeEmployee(employee.id)">
                                    <span class="fas fa-trash-alt">  </span>
                                </button>
                        </td>
                        </tr>
                    </tbody>
                </table>
                   <!-- Pagination controls -->
                <div>
                    <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
                        Page {{ currentPage }} of {{ lastPage }}
                    <button @click="nextPage" :disabled="currentPage === lastPage">Next</button>
                </div>
            </div>
        </div>
    </div>

</template>