<template>
  <AuthLayout>
    <template v-slot:card-content>
      <AuthTitle :title="`Welcome Back`" :subtitle="`Reset your password`" />
      <v-card-text>
         <v-form @submit.prevent ref="formRef" class="mt-2">
            <div class="mb-4">
              <v-alert v-if="store.state.error" :text="store.state.error" type="error"></v-alert>
              <v-alert v-if="message" :text="message" type="success"></v-alert>
            </div>
            <div>
              <v-text-field density="compact" variant="outlined" label="Enter your new password" type="password" v-model="form.password" :rules="passwordRules" />
            </div>
            <v-btn @click="onSubmit" block color="primary" type="submit" :loading="store.state.is_loading">Reset password</v-btn>
          </v-form>
      </v-card-text>
    </template>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue'
import {rules} from '@/config'
import { computed } from 'vue'
import {useAppStore} from "@/store/app";
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import AuthLayout from '@/components/Auth/Layout.vue'
import AuthTitle from '@/components/Auth/Title.vue'
import { useNavigation } from '@/helpers/navigation'

const store = useAppStore()
const route = useRoute()
const { navigateTo } = useNavigation()

console.log();
const formRef = ref()
const form = ref({
  token: route.query.token,
  email: route.query.email,
  password: null
})
const message = ref(null)

const passwordRules = computed(() => [rules.required])

const onSubmit = async () => {
  const { valid } = await formRef.value.validate()

  if (valid) {
    const {status} = await store.postResource('/reset-password', form.value)
    navigateTo('login')
  }
}

onMounted(() => {
  // console.log();
})
</script>

