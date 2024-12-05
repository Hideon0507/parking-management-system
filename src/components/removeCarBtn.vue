<template>
  <v-btn
    color="cyan"
    class="pr-5 pl-5"
    size="small"
    :disabled="parkingStore.isEmpty"
    @click="handleClick"
  >
    出 库
  </v-btn>

  <v-dialog v-model="showDialog" max-width="400">
    <v-card>
      <v-card-text class="ml-5 mt-5">
        <p>
          是否确认将车牌号 <strong>{{ licensePlate }}</strong> 的车辆出库？
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" @click="showDialog = false">取消</v-btn>
        <v-btn color="red" @click="confirmRemove">确认</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useParkingStore } from "../stores/parkingStore";

interface IProps {
  zoneName?: string;
  spotIndex?: number;
}
const props = defineProps<IProps>();

const parkingStore = useParkingStore();
const showDialog = ref(false);
const licensePlate = ref("");

const handleClick = () => {
  if (props.zoneName && props.spotIndex !== null) {
    openDialog();
  } else {
    parkingStore.removeCar();
  }
};

const openDialog = () => {
  const zone = parkingStore.zones.find((z) => z.name === props.zoneName);
  const spot = zone!.spots[props.spotIndex!];
  licensePlate.value = spot.carInfo!.licensePlate;
  showDialog.value = true;
};

const confirmRemove = () => {
  parkingStore.removeCar();
  showDialog.value = false;
};
</script>
