<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCompanyStore } from '@/store/companyStore';
import { useAppStore } from '@/store/app';

const store = useAppStore()
const companyStore = useCompanyStore()

const router = useRouter(); 
const company_id = ref();
const formData = ref({
  name: '', // Initialize with empty values
  email: '',
  logo_path: '',
  _method: 'PUT',
});

const onFileChange = (event) => {
  console.log(event.target.files[0], 'value');
  formData.value.logo_path = event.target.files[0];
};

const updateCompany = async () => {
    console.log('form data', formData.value);
    let res = await store.postResource(`/companies/${company_id.value}`, formData.value);
    if(res){
      router.push('/companies');
    }
};


onMounted (() => {
    // Access the company data from the query parameter
    const companyData = companyStore.selectedCompany;
    if (companyData) {
      // Parse the JSON string to get the company object
      const company = companyData;
      company_id.value = company.id
      formData.value.name = company.name
      formData.value.email = company.email
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
          <form @submit.prevent="updateCompany" enctype="multipart/form-data">
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label class="form-label">Name <span class="text-red">*</span></label>
                  <input v-model="formData.name" type="text" name="name" class="form-control" required placeholder="Enter Name" />
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label class="form-label">Email <span class="text-red">*</span></label>
                  <input v-model="formData.email" type="email" name="email" required class="form-control" placeholder="Email" autocomplete="off" />
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label class="form-label">Logo</label>
                  <input type="file" @change="onFileChange" name="logo_path" class="form-control" />
                </div>
              </div>
            </div>
            <div class="col-12 text-end py-3">
              <button type="submit" class="btn btn-sm btn-success">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  