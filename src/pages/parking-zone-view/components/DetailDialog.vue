<template>
  <v-dialog v-model="dialogStore.showDialog" max-width="400">
    <v-card>
      <div align="end" class="pt-2 pr-2">
        <v-btn
          icon
          @click="dialogStore.closeDialog"
          size="x-small"
          color="greyDark"
          style="opacity: 0.5"
        >
          <v-icon size="20">mdi-close</v-icon>
        </v-btn>
      </div>
      <v-card-title class="pa-0">
        <p class="text-h6 font-weight-bold" align="center">停车详情</p>
      </v-card-title>
      <v-card-text class="ml-6 mb-5" style="line-height: 2">
        <ParkingDetails :log="dialogStore.dialogData!" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import ParkingDetails from "../../../components/ParkingDetails.vue";
import { useDialogStore } from "../../../stores/dialogStore";

const dialogStore = useDialogStore();
</script>
