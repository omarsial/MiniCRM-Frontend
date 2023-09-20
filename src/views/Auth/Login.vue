<template>
 <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ 'Login' }}</div>

                <div class="card-body">
                    <form @submit.prevent ref="formRef">
                        <div class="row mb-3">
                            <label for="email" class="col-md-4 col-form-label text-md-end">{{ 'Email Address' }}</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control" name="email" v-model="form.email" required autocomplete="email" autofocus>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="password" class="col-md-4 col-form-label text-md-end">{{ 'Password' }}</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control" v-model="form.password" name="password" required autocomplete="current-password">

                            </div>
                        </div>

                        <div v-if="errorMessage" class="text-danger text-center"> <span>{{ errorMessage }}</span></div>

                        <div class="row mb-3">
                            <div class="col-md-6 offset-md-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember">

                                    <label class="form-check-label" for="remember">
                                        {{ 'Remember Me' }}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button @click="onSubmit" type="submit" class="btn btn-primary">
                                    {{ 'Login' }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { computed } from 'vue'
import {useAppStore} from "@/store/app";
import { useRouter } from 'vue-router'
const store = useAppStore()
const router = useRouter() 
const formRef = ref()
const errorMessage = ref('')
const form = ref({
  email: '',
  password: ''
})


const onSubmit = async () => {
//   const { valid } = await formRef.value.validate()
    // console.log('is valid login form data', valid);
//   if (valid) {
        await store.login('http://localhost:8000/api/login', form.value);
        if(store.checkAuthUser()){
            router.push('/companies')
        }
//   }
}
</script>

<style>
.forgot-password {
  font-size: 11px;
  cursor: pointer;
}
</style>
