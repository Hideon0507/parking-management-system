<template>
  <div  class="d-flex justify-center">
    <v-alert
      v-if="parkingStore.showAlert"
      dismissible
      @click:close="parkingStore.showAlert = false"
      class=" mb-6 alert text-body-2"
      :type="parkingStore.alertType"
      variant="outlined"
      border="bottom"
      :border-color="parkingStore.alertType"
      closable
    >
      {{ parkingStore.alertMessage }}
    </v-alert>
  </div>
</template>

<script setup lang="ts">
import { useParkingStore } from "../stores/parkingStore";

const parkingStore = useParkingStore();
</script>

<style scoped>
.alert {
  position: fixed;
  bottom: 0;
  opacity: 0.97;
  background-color: white;
}
</style>
