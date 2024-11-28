<template>
  <v-container>
    <v-btn class="mt-5" @click="goBack" color="primary">返回</v-btn>
    <h2 class="text-center ma-4">{{ zoneName }}区停车位</h2>
    <v-row class="ml-16">
      <v-col cols="2" v-for="(slot, index) in slots" :key="index">
        <span class="text-greyDark text-subtitle-2"
          >{{ zoneName }}-{{ index + 1 }}</span
        >
        <v-card class="parking-card" variant="outlined">
          <v-card-text class="parking-spot pt-7">
            <div v-if="slot.isOccupied">
              <p class="text-h6 font-weight-bold">{{ slot.carInfo?.licensePlate }}</p>
              <v-icon class="car-icon" color="greyDark">mdi-car</v-icon>
            </div>
            <div v-else>
              <p class="text-greyDark text-subtitle-1">空闲车位</p>
            </div>
          </v-card-text>

          <v-card-actions class="mb-2">
            <removeCarBtn  
              v-if="slot.isOccupied"
              :zoneName="zoneName"
              :slotIndex="index"/>
            <addCarBtn 
              v-else
              :zoneName="zoneName"
              :slotIndex="index"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useParkingStore } from "../../stores/parkingStore";
import addCarBtn from '../../components/addCarBtn.vue';
import removeCarBtn from '../../components/removeCarBtn.vue'

const route = useRoute();
const router = useRouter();
const parkingStore = useParkingStore();

const zoneName = computed(() => route.params.zoneName);

const slots = computed(() => {
  const zone = parkingStore.zones.find((z) => z.name === zoneName.value);
  return zone ? zone.slots : [];
  console.log("zoneName:", zoneName.value);
  console.log("slots:", slots.value);

});
  
const goBack = () => {
  router.push("/");
};
</script>

<style scoped>
.parking-spot {
  min-height: 13vh;
  display: flex;
  align-items: center;
  --0background-color: green;
}

.parking-card {
  background-color: white;
  height: 20vh;
  width: 8vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.car-icon {
  font-size: 6vh;
  align-items: center;
}
</style>
