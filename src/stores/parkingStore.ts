import { defineStore } from "pinia";
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";

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
  const TOTAL_SPOTS = 300;
  const MAX_SPOTS_PER_ZONE = 24;
  const totalZones = Math.ceil(TOTAL_SPOTS / MAX_SPOTS_PER_ZONE);

  const zones = reactive(
    Array.from({ length: totalZones }, (_, zoneIndex): Zone => {
      const isLastZone = zoneIndex === totalZones - 1;
      const zoneName = String.fromCharCode(65 + zoneIndex);
      const spotsInZone = isLastZone
        ? TOTAL_SPOTS % MAX_SPOTS_PER_ZONE || MAX_SPOTS_PER_ZONE
        : MAX_SPOTS_PER_ZONE;
      return {
        name: zoneName,
        total: spotsInZone,
        free: spotsInZone,
        spots: Array.from(
          { length: spotsInZone },
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

  const generateLicensePlate = (): string => {
    const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const numbers = "0123456789";

    const first = letters.charAt(Math.floor(Math.random() * letters.length));
    let rest = "";

    if (Math.random() > 0.5) { // A12345
      rest = Array.from({ length: 5 })
        .map(() => numbers.charAt(Math.floor(Math.random() * numbers.length)))
        .join("");
    } else { // AB1234
      const randomLetter = letters.charAt(
        Math.floor(Math.random() * letters.length)
      );
      const randomNumbers = Array.from({ length: 4 })
        .map(() => numbers.charAt(Math.floor(Math.random() * numbers.length)))
        .join("");
      rest = `${randomLetter}${randomNumbers}`;
    }

    return `${first}${rest}`;
  };

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
    updateDurations();
    durationInterval = setInterval(updateDurations, 60000); // 每分钟刷新
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

  const showTemporaryAlert = (message: string) => {
    alertMessage.value = message;
    showAlert.value = true;
    setTimeout(() => {
      showAlert.value = false;
    }, 3000);
  };

  const createCar = (): Car => {
    const car = {
      licensePlate: generateLicensePlate(),
      timeIn: new Date(),
      duration: "",
    };
    return car;
  };

  const addCar = (zoneName?: string, spotIndex?: number) => {
    if (zoneName !== undefined && spotIndex !== undefined) {
      const zone = zones.find((z) => z.name === zoneName);
      if (!zone) return;
      const spot = zone.spots[spotIndex];
      if (!spot.isOccupied) {
        spot.isOccupied = true;
        const car = createCar();
        spot.carInfo = car;
        zone.free -= 1;
        addEntry(car, spot.spotNumber);
        showTemporaryAlert(`车辆 ${car.licensePlate} 已入库`);
      }
    } else {
      // 随机排序 zones 和 spots 并选取第一个空车位
      const shuffledZones = [...zones].sort(() => Math.random() - 0.5);
      for (const zone of shuffledZones) {
        const shuffledSpots = [...zone.spots].sort(() => Math.random() - 0.5);
        const spot = shuffledSpots.find((spot) => !spot.isOccupied);
        if (spot) {
          const spotIndex = zone.spots.indexOf(spot);
          addCar(zone.name, spotIndex);
          return;
        }
      }
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
        showTemporaryAlert(`车辆 ${carInfo.licensePlate} 已出库！`);
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

  const isFilled = computed(() => zones.every((zone) => zone.free === 0));
  const isEmpty = computed(() =>
    zones.every((zone) => zone.free === zone.total)
  );

  const fillAllSpots = () => {
    zones.forEach((zone) => {
      zone.spots.forEach((spot, index) => {
        if (!spot.isOccupied) {
          addCar(zone.name, index);
        }
      });
      zone.free = 0;
    });
  };

  const clearAllSpots = () => {
    zones.forEach((zone) => {
      zone.spots.forEach((spot, index) => {
        if (spot.isOccupied) {
          removeCar(zone.name, index);
        }
      });
      zone.free = zone.total;
    });
  };

  return {
    zones,
    parkingHistory,
    searchResults,
    alertMessage,
    showAlert,
    formatTime,
    addCar,
    removeCar,
    searchByLicensePlate,
    fillAllSpots,
    clearAllSpots,
    isFilled,
    isEmpty,
  };
});
