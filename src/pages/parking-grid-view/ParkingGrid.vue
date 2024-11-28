<template>
    <v-container class="parking-grid">
      <v-row class="justify-space-between ml-10 mr-4" >
        <v-col cols="3" v-for="(zone, index) in zones" :key="index">
          <v-card class="parking-zone ma-3 pt-5 pb-5" outlined hover @click="navigateToZone(zone.name)">
            <v-card-title>
              {{ zone.name }}区
            </v-card-title>
            <v-card-subtitle>
              <div :class="{ 'text-success': zone.free > 0, 'text-error': zone.free === 0 }">
                <span>{{ zone.free }} / {{ zone.total }}</span>
              </div>
              <span>
                空闲车位/全部车位
              </span>
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>
  
<script setup lang="ts">
import { useParkingStore } from "../../stores/parkingStore";
import { useRouter } from "vue-router"

const router = useRouter()

const parkingStore = useParkingStore();
const zones = parkingStore.zones; 

const navigateToZone = (zoneName) => { 
    router.push(`/zone/${zoneName}`)
}
</script>

<style scoped>
.parking-grid{
  background-color: #d8f4f8;
}

.parking-zone {
  text-align: center;
}

.parking-slot {
  margin-bottom: 8px;
}

.free-slot {
  background-color: #e0f7fa;
}

.occupied-slot {
  background-color: #ffcdd2;
}

.text-success {
  color: #4caf50;
}

.text-error {
  color: #f44336;
}
</style>
