<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store/app';

const store = useAppStore()

const router = useRouter(); 
const formData = ref({
  name: '', // Initialize with empty values
  email: '',
  logo_path: '',
});

const errorMessages = ref({
  name: '', 
  email: '',
  logo_path: '',
});
const onFileChange = (event) => {
  console.log(event.target.files[0], 'value');
  formData.value.logo_path = event.target.files[0];
};

const createCompany = async () => {
    let res = await store.postResource(`/companies`, formData.value).catch(err => {
      console.log(err.response.status, 'err.response.status');
      if(err.response.status === 422){
          if(err.response.data.errors.email){
            errorMessages.value.email =err.response.data.errors.email[0];
          }

          if(err.response.data.errors.name){
            errorMessages.value.name =err.response.data.errors.name[0];
          }
      }
    });
    console.log('res', store.state.error);
    if(res){
      router.push('/companies');
    }
};

</script>




<template>
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Create</h3>
      </div>
      <div class="card-body">
        <div class="row">
          <form @submit.prevent="createCompany" enctype="multipart/form-data">
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label class="form-label">Name <span class="text-red">*</span></label>
                  <input v-model="formData.name" required type="text" name="name" class="form-control"  placeholder="Enter Name" />
                  <span v-if="errorMessages.name" class="text-danger">{{ errorMessages.name }}</span>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label class="form-label">Email <span class="text-red">*</span></label>
                  <input v-model="formData.email" required type="email" name="email"  class="form-control" placeholder="Email" autocomplete="off" />
                  <span v-if="errorMessages.email" class="text-danger">{{ errorMessages.email }}</span>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label class="form-label">Logo</label>
                  <input type="file" @change="onFileChange" name="logo_path" class="form-control" />
                  <span v-if="errorMessages.logo_path" class="text-danger">{{ errorMessages.logo_path }}</span>
                </div>
              </div>
            </div>
            <div class="col-12 text-end py-3">
              <button type="submit" class="btn btn-sm btn-success">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  