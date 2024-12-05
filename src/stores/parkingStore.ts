import { defineStore } from "pinia";
import { onMounted, onUnmounted, reactive, ref } from "vue";

export interface Car {
  licensePlate: string;
  timeIn: Date;
  timeOut?: Date;
  duration: string;
}

export interface Spot {
  spotNumber: string;
  isOccupied: boolean;
  carInfo?: Car;
}

export interface Zone {
  name: string;
  total: number;
  free: number;
  spots: Spot[];
}

export interface ParkingHistory {
  car: Car;
  spotNumber: string;
}

export const useParkingStore = defineStore("parkingStore", () => {
  const zones = reactive(
    Array.from({ length: 13 }, (_, zoneIndex): Zone => {
      const isLastZone = zoneIndex === 12;
      const zoneName = String.fromCharCode(65 + zoneIndex);
      return {
        name: zoneName,
        total: isLastZone ? 12 : 24,
        free: isLastZone ? 12 : 24,
        spots: Array.from(
          { length: isLastZone ? 12 : 24 },
          (_, spotIndex): Spot => ({
            spotNumber: `${zoneName}-${(spotIndex + 1)
              .toString()
              .padStart(2, "0")}`,
            isOccupied: false,
          })
        ),
      };
    })
  );

  const parkingHistory = ref<Array<ParkingHistory>>([]);

  const updateDurations = () => {
    const now = new Date();
    parkingHistory.value.forEach((entry) => {
      if (!entry.car.timeOut) {
        const durationMs = now.getTime() - entry.car.timeIn.getTime();
        entry.car.duration = formatDuration(durationMs);
      }
    });
  };

  let durationInterval: number | undefined;

  onMounted(() => {
    updateDurations(); // 立即更新
    durationInterval = setInterval(updateDurations, 60000); // 每分钟更新
  });

  onUnmounted(() => {
    if (durationInterval) {
      clearInterval(durationInterval);
    }
  });

  const addEntry = (car: Car, spotNumber: string) => {
    parkingHistory.value.unshift({
      car: car,
      spotNumber,
    });
    updateDurations();
  };

  const updateExit = (licensePlate: string, timeOut: Date) => {
    const log = parkingHistory.value.find(
      (entry) => entry.car.licensePlate === licensePlate
    );
    if (log) {
      log.car.timeOut = timeOut;
    }
  };

  const formatDuration = (duration: number): string => {
    const minutes = Math.floor((duration / 1000 / 60) % 60);
    const hours = Math.floor(duration / 1000 / 60 / 60);
    return hours > 0 ? `${hours} 小时 ${minutes} 分钟` : `${minutes} 分钟`;
  };

  const formatTime = (time: Date) => {
    return new Date(time).toLocaleString();
  };

  const alertMessage = ref("");
  const showAlert = ref(false);
  const alertType = ref("");

  const showTemporaryAlert = (message: string, type: string) => {
    alertMessage.value = message;
    showAlert.value = true;
    alertType.value = type;

    setTimeout(() => {
      showAlert.value = false;
    }, 3000); 
  };

  const addCar = (car: Car, zoneName?: string, spotIndex?: number) => {
    if (zoneName !== undefined && spotIndex !== undefined) {
      const zone = zones.find((z) => z.name === zoneName);
      if (!zone) return;
      const spot = zone.spots[spotIndex];
      if (!spot.isOccupied) {
        spot.isOccupied = true;
        spot.carInfo = car;
        zone.free -= 1;
        addEntry(car, spot.spotNumber);
        showTemporaryAlert(`车辆 ${car.licensePlate} 已入库`, "success")
      }
    } else {
      // 随机排序 zones 和 spots 并选取第一个空车位
      const shuffledZones = [...zones].sort(() => Math.random() - 0.5);
      for (const zone of shuffledZones) {
        const shuffledSpots = [...zone.spots].sort(() => Math.random() - 0.5);
        const spot = shuffledSpots.find((spot) => !spot.isOccupied);
        if (spot) {
          const spotIndex = zone.spots.indexOf(spot);
          addCar(car, zone.name, spotIndex);
          return;
        }
      }
      showTemporaryAlert("无空闲车位！", "warning")
    }
  };

  const removeCar = (zoneName?: string, spotIndex?: number) => {
    if (zoneName !== undefined && spotIndex !== undefined) {
      const zone = zones.find((z) => z.name === zoneName);
      if (!zone) return;
      const spot = zone.spots[spotIndex];
      if (!spot || !spot.isOccupied) return;

      const carInfo = spot.carInfo;
      if (carInfo) {
        const timeOut = new Date();
        carInfo.timeOut = timeOut;
        spot.isOccupied = false;
        spot.carInfo = undefined;
        zone.free += 1;
        updateExit(carInfo.licensePlate, timeOut);
        showTemporaryAlert(`车辆 ${carInfo.licensePlate} 已出库！`, "success")
      }
    } else {
      const shuffledZones = [...zones].sort(() => Math.random() - 0.5);
      for (const zone of shuffledZones) {
        const shuffledSpots = [...zone.spots].sort(() => Math.random() - 0.5);
        const spot = shuffledSpots.find((spot) => spot.isOccupied);
        if (spot) {
          const spotIndex = zone.spots.indexOf(spot);
          removeCar(zone.name, spotIndex);
          return;
        }
      }
      showTemporaryAlert("没有车辆可出库！", "warning")
    }
  };

  const searchResults = ref<ParkingHistory[]>([]);
  const searchByLicensePlate = (query: string) => {
    if (!query) {
      searchResults.value = [];
      return;
    }
    const results = [];
    for (const zone of zones) {
      for (const spot of zone.spots) {
        if (
          spot.isOccupied &&
          spot.carInfo?.licensePlate.includes(query.toUpperCase()) // 模糊匹配
        ) {
          results.push({
            car: spot.carInfo,
            spotNumber: spot.spotNumber,
          });
        }
      }
    }
    searchResults.value = results;
  };

  return {
    zones,
    parkingHistory,
    searchResults,
    alertMessage,
    showAlert,
    alertType,
    formatTime,
    addCar,
    removeCar,
    searchByLicensePlate,
  };
});
