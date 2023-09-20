import { defineStore } from 'pinia';

export const useCompanyStore = defineStore('company', {
  state: () => ({
    selectedCompany: null,
  }),
  actions: {
    setSelectedCompany(company) {
      this.selectedCompany = company;
    },
  },
});