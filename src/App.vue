<script setup>
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useAppStore } from '@/store/app';


  const store = useAppStore();
  const route = useRoute();
  const router = useRouter();
  const isAuth  = ref(true);

  const showSidebar =  () => {
    let res =  store.checkAuthUser();
    console.log('res', res);

    if(res){
      isAuth.value  = true;
    }else{
      isAuth.value = false;
    }
    console.log(isAuth.value, 'is auth');
  }


const logout =  () => {
  store.logout();
  router.push('/login');
   showSidebar();
}

onMounted( () => {
     showSidebar();
})

</script>

<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
        <div v-if="isAuth" class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <router-link to="/companies" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline">Menu</span>
                </router-link>
                <button @click="logout" class="text-white text-decoration-none text-right btn btn-sm">Logout</button>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item">
                        <router-link to="/companies" class="nav-link align-middle px-0">
                            <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Companies</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/employees" class="nav-link px-0 align-middle">
                            <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Employees</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col py-3">
          <router-view></router-view>
        </div>
      </div>
    </div>
</template>
