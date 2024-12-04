<template>
  <v-row align="center" class="header-container pa-5">
    <v-col cols="2" class="pl-10 search-container">
      <v-text-field
        v-model="searchQuery"
        label="请输入车牌号查询"
        variant="outlined"
        prepend-inner-icon="mdi-magnify"
        class="mt-6"
        density="compact"
        clearable
        @input="handleSearch"
      >
      </v-text-field>
      <div v-if="showResults && searchResults.length" class="search-results">
        <v-list v-if="searchResults.length">
          <v-list-item
            v-for="(result, index) in searchResults"
            :key="index"
            @click="handleResult(result)"
          >
            <div>
              <p><strong>车牌号:</strong> {{ result.car.licensePlate }}</p>
              <p><strong>位置:</strong> {{ result.spotNumber }}</p>
             
            </div>
          </v-list-item>
        </v-list>
        <p v-else class="text-grey-dark">未找到匹配的车辆信息</p>
      </div>
      <DetailDialog />
    </v-col>

    <v-col align="center">
      <h2>停车场管理系统</h2>
    </v-col>

    <v-col cols="auto" class="d-flex align-center">
      <div class="mr-3">
        <span>空闲车位/全部车位 : </span>
        <span class="text-green-darken-1">{{ freeSpots }} </span>
        <span> / {{ totalSpots }}</span>
      </div>

      <addCarBtn class="mr-2" />
      <removeCarBtn />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import addCarBtn from "../../components/addCarBtn.vue";
import removeCarBtn from "../../components/removeCarBtn.vue";
import {
useParkingStore,
type ParkingHistory,
} from "../../stores/parkingStore";
import DetailDialog from "../parking-zone-view/components/DetailDialog.vue";

import { useDialogStore } from "../../stores/dialogStore";
const dialogStore = useDialogStore(); 



const parkingStore = useParkingStore();

const freeSpots = computed(() =>
  parkingStore.zones.reduce((sum, zone) => sum + zone.free, 0)
);

const totalSpots = computed(() =>
  parkingStore.zones.reduce((sum, zone) => sum + zone.total, 0)
);

const searchQuery = ref("");
const router = useRouter();
const searchResults = computed(() => parkingStore.searchResults);

const handleSearch = () => {
  if (searchQuery.value.trim() === "") {
    parkingStore.searchResults.length = 0;
    showResults.value = false;
  } else {
    parkingStore.searchByLicensePlate(searchQuery.value);
    showResults.value = true;
  }
};


const handleResult = (result: ParkingHistory) => {
  const zoneName = result.spotNumber.charAt(0); 
  dialogStore.openDialog(result); 

  router.push({
    path: `/zone/${zoneName}`,
  });
  showResults.value = false;
  searchQuery.value = "";
};

const showResults = ref(false);

watch(searchQuery, (newVal) => {
  if (!newVal) {
    showResults.value = false;
  }
});
</script>

<style scoped>
.header-container {
  height: 15vh;
  border-bottom: 1px solid #e0e0e0;
}

.search-container {
  position: relative; /* 确保列表相对于搜索框定位 */
}

.search-results {
  position: absolute; /* 绝对定位，使其紧贴搜索框下方 */
  width: 100%;
  z-index: 10; /* 确保在顶层显示 */
  border-radius: 4px; /* 圆角 */
  max-height: 50vh; /* 限制高度 */
  overflow-y: auto; /* 超出部分滚动 */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}
</style>
