<template>
  <v-container>
    <v-row class="align-center justify-space-between">
      <v-col cols="auto mt-4">
        <v-btn @click="goBack" color="blue-grey-lighten-2" class="pr-4 pl-4">返回</v-btn>
      </v-col>
      <v-col class="text-center">
        <h3>{{ zoneName }}区停车位</h3>
      </v-col>
      <v-col
        cols="auto"
        :class="{ 'text-green-darken-1': zone.free > 0, 'text-red': zone.free === 0 }"
      >
        <span class="pr-5">空闲车位：{{ zone.free }} / {{ zone.total }}</span>
      </v-col>
    </v-row>

    <v-row class="ml-16">
      <v-col cols="2" v-for="(spot, index) in spots" :key="index">
        <ParkingSpot :spot="spot" :zoneName="zoneName" :spotIndex="index" />
      </v-col>
    </v-row>

    <DetailDialog />
  </v-container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useParkingStore } from "../../stores/parkingStore";
import ParkingSpot from "./components/ParkingSpot.vue";
import DetailDialog from "./components/DetailDialog.vue"

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
});

const goBack = () => {
  router.push("/");
};
</script>