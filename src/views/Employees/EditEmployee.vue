<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useEmployeeStore } from '@/store/employeeStore';

import { useAppStore } from '@/store/app';

const store = useAppStore()
const employeeStore = useEmployeeStore()

const router = useRouter(); 
const employee_id = ref();
const employees = ref([]);
const companies = ref([]);
const formData = ref({
    first_name: '', // Initialize with empty values
    last_name: '',
    email: '',
    phone: '',
    company_id: '',
  _method: 'PUT',
});

const fetchCompanies = async () => {
    let res = await store.getResource(`companies`);
    companies.value =  res.data;
}

const updateEmployee = async () => {
    console.log('form data', formData.value);
    let res = await store.postResource(`/employees/${employee_id.value}`, formData.value);
    if(res){
      router.push('/employees');
    }
};


onMounted ( async () => {
    // Access the employee data from the query parameter
    const employeeData = employeeStore.selectedEmployee;
    if (employeeData) {
      // Parse the JSON string to get the employee object
      const employee = employeeData;
      employee_id.value = employee.id
      formData.value.first_name = employee.first_name
      formData.value.last_name = employee.last_name
      formData.value.email = employee.email
      formData.value.phone = employee.phone
      formData.value.company_id = employee.company_id
      
        await fetchCompanies();
      
    }
  });
</script>




<template>
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Edit</h3>
      </div>
      <div class="card-body">
        <div class="row">
          <form @submit.prevent="updateEmployee" enctype="multipart/form-data">
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label class="form-label"> First Name <span class="text-red">*</span></label>
                  <input v-model="formData.first_name" type="text" name="first_name" class="form-control" required placeholder="Enter First Name" />
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label class="form-label"> Last Name <span class="text-red">*</span></label>
                  <input v-model="formData.last_name" type="text" name="last_name" class="form-control" required placeholder="Enter Last Name" />
                </div>
              </div>
              
              <div class="col-4">
                <div class="form-group">
                  <label class="form-label">Email <span class="text-red">*</span></label>
                  <input v-model="formData.email" type="email" name="email" required class="form-control" placeholder="Email" autocomplete="off" />
                </div>
              </div>
              <div class="col-4">
                <div class="form-group">
                  <label class="form-label"> Phone <span class="text-red">*</span></label>
                  <input v-model="formData.phone" type="text" name="phone" class="form-control" required placeholder="Enter Phone Number" />
                </div>
              </div>
              <div class="col-4">
                <div class="form-group">
                    <label class="form-label"> Company </label>
                    <select v-model="formData.company_id" class="form-select" aria-label="Select Company">
                        <option selected>Select Company</option>
                        <option v-for="company in companies" :value="company.id">{{ company.name }}</option>
                    </select>
                </div>
              </div>
            </div>
            <div class="col-12 text-end p-3">
              <button type="submit" class="btn btn-sm btn-success">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  