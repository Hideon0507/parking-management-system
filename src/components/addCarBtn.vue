<template>
  <v-btn
    color="teal"
    class="pr-5 pl-5"
    size="small"
    :disabled="parkingStore.isFilled"
    @click="handleClick"
  >
    入 库
  </v-btn>
</template>

<script setup lang="ts">
import { useParkingStore } from "../stores/parkingStore";

interface IProps {
  zoneName?: string;
  spotIndex?: number;
}

const props = defineProps<IProps>();

const parkingStore = useParkingStore();
const handleClick = () => {
  if (props.zoneName && props.spotIndex !== null) {
    parkingStore.addCar(props.zoneName, props.spotIndex);
  } else {
    parkingStore.addCar();
  }
};
</script>
