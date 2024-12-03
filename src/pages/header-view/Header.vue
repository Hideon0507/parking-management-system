<template>
  <v-row align="center" class="header-container pa-5">
    <v-col cols="2" class="pl-10 mr-10">
      <v-text-field
        v-model="searchQuery"
        label="请输入车牌号查询"
        variant="outlined"
        prepend-inner-icon="mdi-magnify"
        class="mt-6"
        density="compact"
        clearable
      >
      </v-text-field>
    </v-col>

    <v-col align="center">
      <h2 >停车场管理系统</h2>
    </v-col>

    <v-col cols="auto" class="d-flex align-center">
      <div class="mr-3">
        <span>空闲车位/全部车位 : </span>
        <span class="text-green">{{ freeSpots }} </span>
        <span> / {{ totalSpots }}</span>
      </div>

      <addCarBtn class="mr-2"/>
      <removeCarBtn />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import addCarBtn from "../../components/addCarBtn.vue";
import removeCarBtn from "../../components/removeCarBtn.vue";
import { useParkingStore } from "../../stores/parkingStore";
import { computed, ref } from "vue";

const searchQuery = ref("");
const parkingStore = useParkingStore();

const freeSpots = computed(() =>
  parkingStore.zones.reduce((sum, zone) => sum + zone.free, 0)
);

const totalSpots = computed(() =>
  parkingStore.zones.reduce((sum, zone) => sum + zone.total, 0)
);
</script>

<style scoped>
.header-container {
    height: 15vh;
  border-bottom: 1px solid #e0e0e0;
}
</style>
