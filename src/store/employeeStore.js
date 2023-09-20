import { defineStore } from 'pinia';

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    selectedEmployee: null,
  }),
  actions: {
    setSelectedEmployee(employee) {
      this.selectedEmployee = employee;
    },
  },
});