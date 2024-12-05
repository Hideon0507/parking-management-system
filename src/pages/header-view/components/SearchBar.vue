<template>
  <v-text-field
    v-model="searchQuery"
    label="请输入车牌号查询"
    variant="outlined"
    prepend-inner-icon="mdi-magnify"
    class="searchbar"
    density="compact"
    clearable
    @input="handleSearch"
    @keydown.enter="handleEnterKey"
  >
  </v-text-field>
  <div v-if="showResults && searchResults.length" class="search-results">
    <v-list v-if="searchResults.length">
      <v-list-item
        v-for="(result, index) in searchResults"
        :key="index"
        @click="handleResult(result)"
      >
        <div class="text-subtitle-2 mb-1 ml-1">
          <p>
            车牌号：<strong>{{ result.car.licensePlate }}</strong>
          </p>
          <p>
            位置：<strong>{{ result.spotNumber }}</strong>
          </p>
        </div>
      </v-list-item>
    </v-list>
  </div>
  <p
    v-if="searchQuery && !searchResults.length"
    class="text-grey-darken-1 text-subtitle-2 no-result"
  >
    未查询到匹配的车牌号
  </p>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
  useParkingStore,
  type ParkingHistory,
} from "../../../stores/parkingStore";
import { useDialogStore } from "../../../stores/dialogStore";
import { useRouter } from "vue-router";

const parkingStore = useParkingStore();
const searchResults = computed(() => parkingStore.searchResults);
const dialogStore = useDialogStore();
const searchQuery = ref("");
const router = useRouter();

const showResults = ref(false);

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

const handleEnterKey = () => {
  if (searchResults.value.length === 1) {
    handleResult(searchResults.value[0]); // 如果结果唯一，直接处理跳转
  }
};

watch(searchQuery, (newVal) => {
  if (!newVal) {
    showResults.value = false;
  }
});
</script>

<style scoped>
.search-results {
  position: absolute;
  width: 100%;
  z-index: 10;
  border-radius: 4px;
  max-height: 50vh;
  overflow-y: auto;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.searchbar {
  margin: 0;
  padding: 0;
  height: 40px;
  width: 100%;
}

.no-result {
  position: absolute;
}
</style>
