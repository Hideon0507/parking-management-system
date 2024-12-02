<template>
  <v-container>
    <v-row class="align-center justify-space-between">
      <v-col cols="auto mt-4">
        <v-btn @click="goBack" color="primary">返回</v-btn>
      </v-col>
      <v-col class="text-center">
        <h2>{{ zoneName }}区停车位</h2>
      </v-col>
      <v-col
        cols="auto"
        :class="{ 'text-green': zone.free > 0, 'text-red': zone.free === 0 }"
      >
        <span class="pr-5">空闲车位：{{ zone.free }} / {{ zone.total }}</span>
      </v-col>
    </v-row>

    <v-row class="ml-16">
      <v-col cols="2" v-for="(spot, index) in spots" :key="index">
        <ParkingSpot :spot="spot" :zoneName="zoneName" :spotIndex="index" />
        <span class="text-greyDark text-subtitle-2 text-center">
          {{ spot.spotNumber }}
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useParkingStore } from "../../stores/parkingStore";
import addCarBtn from "../../components/addCarBtn.vue";
import removeCarBtn from "../../components/removeCarBtn.vue";
import ParkingSpot from "./components/ParkingSpot.vue";

const route = useRoute();
const router = useRouter();
const parkingStore = useParkingStore();

const zoneName = computed(() => route.params.zoneName);
const zone = computed(() =>
  parkingStore.zones.find((z) => z.name === zoneName.value)
);

const spots = computed(() => {
  const zone = parkingStore.zones.find((z) => z.name === zoneName.value);
  return zone ? zone.spots : [];
  console.log("zoneName:", zoneName.value);
  console.log("spots:", spots.value);
});

const goBack = () => {
  router.push("/");
};
</script>
