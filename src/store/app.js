// Utilities
import { defineStore } from 'pinia'
import instance from 'axios'

const TOKEN_COOKIE_NAME = '_GMJ'

export const useAppStore = defineStore('app', {
  state: () => ({
    state: {
      error: null,
      success: null,
      successSnackBar: null,
      is_loading: false
    },
    token: null,
    auth_user: null
  }),
  actions: {
    setError(err = null) {
      this.state.error = err
      this.state.success = null
    },
    setSuccess(msg = null) {
      this.state.success = msg
      this.state.error = null
    },
    setUser(user, token) {
      localStorage.setItem("token", token);
      this.user = user;
      this.authenticated = true;
    },

    checkAuthUser() {
      let token = localStorage.getItem("token");
        if(!token){
          return false;
        }
        return true;
    },

   async login(url, payload = {}, config = {}) {
      
       await instance.post(url, payload, config).then(({ data }) => {
          this.setUser(data.user, data.token);
        }).catch((err) => console.log('err on login api', err))
      
    },
    async check_user() {
      try {
        const data = await this.getResource('/user', {
          baseURL: 'http://localhost:8000/api'
        })
        this.user = data
        return true
      } catch (err) {
        this.user = null
        return false
      }
    },
    getResource(url) {
      return new Promise((res, rej) => {
        const access_token = localStorage.getItem("token");
        instance.get(url, {
          baseURL: 'http://localhost:8000/api',
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        }).then(({ data }) => res(data)).catch(() => rej())
      })
    },
    postResource(url, payload = {}) {
      return new Promise(async (res, rej) => {
        console.log('url', url, 'payload', payload);
        const access_token = localStorage.getItem("token");
        instance.post(url, payload, {
          baseURL: 'http://localhost:8000/api',
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${access_token}`
          }
        }).then(({ data }) => {
          res(data)
        })
          .catch((err) =>  rej(err))
      })
    },
    deleteResource(url, config = {}) {
      const access_token = localStorage.getItem("token");
      return new Promise((res, rej) => {
        instance.delete(url, {
          baseURL: 'http://localhost:8000/api',
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        }).then(({ data }) => {
          res(data)
        })
          .catch(() => rej())
      })
    },
    logout() {
      this.auth_user = null
      this.token = null
      localStorage.removeItem("token");
    },

  }
})
