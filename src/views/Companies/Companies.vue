<template>
    <div class="card">
        <div class="card-header d-block">
            <h3 class="card-title d-inline"> Companies </h3>
        
                <div style="float: right">
                        <a @click="createCompany" title="Add" class="btn  btn-sm btn-success" style="">
                            <span class="fe fe-user-plus"> Create</span>
                        </a>
                </div>

        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered text-nowrap border-bottom w-100" id="companies-datatable">
                    <thead>
                        <tr>
                            <th class="wd-15p border-bottom-0">Id</th>
                            <th class="wd-15p border-bottom-0">Name</th>
                            <th class="wd-15p border-bottom-0">Email</th>
                            <th class="wd-15p border-bottom-0">Logo</th>
                            <th class="wd-10p border-bottom-0">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(company, index) in companies">
                            <td>{{ index + 1 }}</td>
                            <td>{{ company.name }}</td>
                            <td> {{ company.email }}</td>
                            <td>
                                <img :src="company.logo" style="max-width:100px; max-height:100px;"  alt="">
                            </td>
                            <td>
                                <button @click="editCompany(company)" id="bEdit"  class="btn btn-sm ms-1 btn-outline-warning" data-bs-placement="top" 
                                title="Edit">
                                <span class="fas fa-edit"> </span>
                                </button>
                                <button id="btn_del_'.$company->id.'" class="btn btn-sm ms-1 btn-outline-danger" data-type="Team Member" title="Delete" @click="removeCompany(company.id)" data-bs-target="#deleteModal" data-bs-toggle="modal">
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

<script setup>
import { useAppStore } from '@/store/app';
import { useCompanyStore } from '@/store/companyStore';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const companies = ref([]) // Ref to store company data
const currentPage = ref(1) // Ref for current page
const lastPage = ref(1) // Ref for last page
const perPage = 10 // Number of items per page
const store = useAppStore()
const companyStore = useCompanyStore()

const fetchCompanies = async () => {
    console.log('in api compnaies');
    let res = await store.getResource(`/companies?page=${currentPage.value}`);
    companies.value =  res.data;
    currentPage.value = res.meta.current_page
    lastPage.value = res.meta.last_page
}

const nextPage = async () => {
    console.log('currentPage.value < lastPage.value', currentPage.value < lastPage.value);
  if (currentPage.value < lastPage.value) {
    currentPage.value++
    await fetchCompanies()
  }
}

const prevPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value--
    await fetchCompanies()
  }
}

  // Function to navigate to the "Edit Company" component
const editCompany = (company) => {
    // router.push(`/companies/${id}`);
    companyStore.setSelectedCompany(company);
    router.push({ name: 'edit_company', params: { companyId: company.id }});
}

const createCompany = () => {
    // router.push(`/companies/${id}`);
    router.push({ name: 'create_company'});
}

const removeCompany = async company_id => {
   let res = await store.deleteResource('companies/'+company_id);
   if(res){
        await fetchCompanies()
   }
}


onMounted(async () => {
    console.log('in companies');
    fetchCompanies()
})

</script>