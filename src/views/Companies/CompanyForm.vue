<template>
    <div class="row">
        <div class="col-sm-6">
            <div class="form-group">
                <label class="form-label"> Name <span class="text-red">*</span></label>
                <input type="text" name="name" value=""
                class="form-control " required placeholder="Enter Name">
                
            </div>
        </div>
    
        <div class="col-6">
            <div class="form-group">
                <label class="form-label">Email <span class="text-red">*</span></label>
                <input type="email" name="email" value="" required
                class="form-control "  placeholder="Email" autocomplete="off">
                

            </div>
        </div>

        <div class="col-12">
            <div class="form-group">
                <label class="form-label"> Logo  </label>
                <input type="file" name="logo_path" class="form-control ">
                
            </div>
        </div>
    </div>
</template>