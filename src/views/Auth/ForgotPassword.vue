<template>
  <AuthLayout>
    <template v-slot:card-content>
      <AuthTitle :title="`Welcome Back`" :subtitle="`Reset your password`" />
      <v-card-text>
        <v-form @submit.prevent ref="formRef" class="mt-2">
          <div class="mb-4">
            <v-alert v-if="store.state.error" :text="store.state.error" type="error"></v-alert>
            <v-alert v-if="store.state.success" :text="store.state.success" type="success"></v-alert>
          </div>

          <div>
            <v-text-field density="compact" variant="outlined" label="Your email" v-model="form.email"
              :rules="emailRules" />
          </div>

          <v-btn @click="onSubmit" block color="primary" type="submit" :loading="store.state.is_loading">Send reset
            link</v-btn>
        </v-form>
      </v-card-text>
      <auth-footer :title="`go back to login`" :cta="`login`" :target="`login`"></auth-footer>
    </template>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue'
import { rules } from '@/config'
import { computed } from 'vue'
import { useAppStore } from "@/store/app";
import AuthLayout from '@/components/Auth/Layout.vue'
import AuthTitle from '@/components/Auth/Title.vue'
import AuthFooter from '@/components/Auth/AuthFooter.vue'

const store = useAppStore()
const formRef = ref()
const form = ref({
  name: '',
  email: '',
  password: ''
})

const emailRules = computed(() => [rules.required, rules.email])

const onSubmit = async () => {
  const { valid } = await formRef.value.validate()

  if (valid) {
    const { status } = await store.postResource('/forgot-password', form.value)

    store.setSuccess(status)
  }
}
</script>

<style>
.login-styled-column {
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(63 81 181 / 90%)), url(https://source.unsplash.com/random/900×700/?user);
  background-position: center center;
}
</style>
