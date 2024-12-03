<template>
  <v-card class="parking-card" variant="outlined">
    <v-card-text class="parking-spot">
      <div v-if="spot.isOccupied">
        <!-- <v-hover v-slot:default="{ isHovering }">
          <div class="d-flex cursor-pointer pl-4">
            <span class="text-h6 font-weight-bold">
              {{ spot.carInfo?.licensePlate }}
            </span>
            <v-icon color="blue-lighten-1" size="18"
              >mdi-information-outline</v-icon
            >
          </div>

          <div v-if="isHovering" class="parking-info-card">
            <p><strong>车牌号:</strong> {{ spot.carInfo?.licensePlate }}</p>
          </div>
        </v-hover> -->

        <div class="d-flex cursor-pointer pl-4" @click="showDetails">
          <span class="text-h6 font-weight-bo ld">
            {{ spot.carInfo?.licensePlate }}
          </span>
          <v-icon color="blue-lighten-1" size="18"
            >mdi-information-outline</v-icon
          >
        </div>

        <v-icon color="greyDark" size="60">mdi-car</v-icon>
      </div>
      <div v-else>
        <p class="text-greyDark text-subtitle-1">空闲车位</p>
      </div>
    </v-card-text>

    <div class="mb-4">
      <removeCarBtn
        v-if="spot.isOccupied"
        :zoneName="zoneName"
        :spotIndex="spotIndex"
      />
      <addCarBtn v-else :zoneName="zoneName" :spotIndex="spotIndex" />
    </div>
  </v-card>

  <v-dialog v-model="detailsDialog" max-width="400">
    <v-card>
      <v-card-title>
        停车详情
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDetails">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <p><strong>车牌号:</strong> {{ spot.carInfo!.licensePlate }}</p>
        <p><strong>车位:</strong> {{ zoneName }} - {{ spotIndex + 1 }}</p>
        <p>
          <strong>入库时间:</strong>
          {{ parkingStore.formatTime(spot.carInfo!.timeIn) }}
        </p>
        <p>停车时长: {{ spot.carInfo }}</p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { Spot } from "../../../stores/parkingStore";
import addCarBtn from "../../../components/addCarBtn.vue";
import removeCarBtn from "../../../components/removeCarBtn.vue";
import { ref } from "vue";
import { useParkingStore } from "../../../stores/parkingStore";

interface IProps {
  spot: Spot;
  spotIndex: number;
  zoneName: string;
}

defineProps<IProps>();

const parkingStore = useParkingStore();

const detailsDialog = ref(false);

// 打开弹窗
const showDetails = () => {
  detailsDialog.value = true;
};

// 关闭弹窗
const closeDetails = () => {
  detailsDialog.value = false;
};
</script>

<style scoped>
.parking-spot {
  min-height: 10vh;
  display: flex;
  align-items: center;
}
.parking-card {
  background-color: white;
  height: 18vh;
  width: 8vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.parking-info-card {
  position: absolute;
  top: -100%; /* 停车信息卡片显示在车牌号上方 */
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border-radius: 8px;
  padding: 8px;
  z-index: 10;
}
</style>
