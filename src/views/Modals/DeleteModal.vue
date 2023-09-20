<template>
    <div class="modal fade" :id="modalId">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmation</h5>
            <button type="button" class="close" @click="closeModal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">No</button>
            <button type="button" class="btn btn-danger" @click="confirmDelete">Yes</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      modalId: String, // Pass a unique modal ID as a prop
      onDelete: Function, // Callback function to execute when "Yes" is clicked
    },
    methods: {
      closeModal() {
        // Close the modal
        $(`#${this.modalId}`).modal('hide');
      },
      confirmDelete() {
        // Execute the onDelete callback when "Yes" is clicked
        if (typeof this.onDelete === 'function') {
          this.onDelete();
        }
        // Close the modal
        this.closeModal();
      },
    },
  };
  </script>
  