<template>
    <v-container>
        <v-btn class="mt-5" @click="goBack" color="primary">返回</v-btn>
        <h2 class="text-center ma-4">{{ zoneName }}区停车位</h2>
        <v-row>
            <v-col cols="2" v-for="(slot, index) in slots" :key="index" > 
                <span class="parking-number">{{ zoneName }} - {{ index + 1 }}</span>
                <v-card outlined class="parking-card" >
                    <v-card-text class="parking-spot">
                        <div v-if="slot.isOccupied">
                            <p class="license-plate">{{ slot.licensePlate }}</p>
                            <v-icon class="car-icon">mdi-car</v-icon>
                        </div>
                        <div v-else>
                            <p>空闲车位</p>
                        </div>
                    </v-card-text>

                    <v-card-actions class="mb-2">
                        <v-btn v-if="slot.isOccupied" variant="tonal" color="blue" @click="removeCar(index)">出 库</v-btn>
                        <v-btn v-else variant="tonal" color="green" @click="addCar(index)">入 库</v-btn>
                    </v-card-actions>


                </v-card>
            </v-col>
        </v-row>
     
    </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();


const zoneName = computed(() => route.params.zoneName);


const slots = ref(
  Array.from({ length: 18 }, (_, i) => ({
    id: i + 1,
    isOccupied: false, 
    licensePlate: "", 
  }))
)

const addCar = (index) => {
  const slot = slots.value[index];
  if (!slot.isOccupied) {
    slot.isOccupied = true;
    slot.licensePlate = `${Math.random().toString(36).substr(2, 6).toUpperCase()}`; // 随机车牌号
  }
}

const removeCar = (index) => {
  const slot = slots.value[index];
  if (slot.isOccupied) {
    slot.isOccupied = false;
    slot.licensePlate = ""; 
  }
}

const goBack = () => {
  router.push("/");
}
</script>

<style scoped>
.parking-spot{
    display: block;
}
  
.parking-number {
    text-align: center;
}

.car-icon {
    font-size: 50px;
    align-items: center;
}
</style>
