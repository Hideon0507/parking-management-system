<template>
    <v-container class="parking-grid">
      <v-row class="justify-space-between ml-10 mr-4" >
        <v-col cols="3" v-for="(zone, index) in zones" :key="index">
          <v-card class="parking-zone ma-3 pt-5 pb-5" outlined hover @click="navigateToZone(zone.name)">
            <v-card-title>
              {{ zone.name }}区
            </v-card-title>
            <v-card-subtitle>
              <div :class="{ 'text-green-darken-1': zone.free > 0, 'text-red': zone.free === 0 }">
                <span class="text-subtitle-1">{{ zone.free }} / {{ zone.total }}</span>
              </div>
              <span class="text-subtitle-2">
                空闲车位 / 全部车位
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

const navigateToZone = (zoneName: string) => { 
    router.push(`/zone/${zoneName}`)
}
</script>

<style scoped>
.parking-grid{
  --background-color: #d8f4f8;
}

.parking-zone {
  text-align: center;
}
</style>
