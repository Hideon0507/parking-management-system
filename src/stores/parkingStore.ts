import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export interface Car {
  licensePlate: string;
  timeIn: Date;
  timeOut?: Date;
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
  duration?: string;
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

  const addEntry = (car: Car, spotNumber: string,) => {
    parkingHistory.value.unshift({
      car: car,
      spotNumber,
    });
  };

  const updateExit = (licensePlate: string, timeOut: Date) => {
    const log = parkingHistory.value.find(
      (entry) => entry.car.licensePlate === licensePlate
    );
    if (log) {
      log.car.timeOut = timeOut;
      const duration = timeOut.getTime() - log.car.timeIn.getTime();
      log.duration = formatDuration(duration);
    }
  };

  const formatDuration = (duration: number): string => {
    const minutes = Math.floor((duration / 1000 / 60) % 60);
    const hours = Math.floor(duration / 1000 / 60 / 60);
    return hours > 0 ? `${hours} 小时 ${minutes} 分钟` : `${minutes} 分钟`;
  };


  const addCar = (car: Car, zoneName?: string, spotIndex?: number) => {
    if (zoneName !== undefined && spotIndex !== undefined) {
      const zone = zones.find((z) => z.name === zoneName);
      if (!zone) return;
      const spot = zone.spots[spotIndex];
      if (!spot.isOccupied) {
        car.timeIn = new Date();
        spot.isOccupied = true;
        spot.carInfo = car;
        zone.free -= 1;
        addEntry(car, spot.spotNumber);
      }
    } else {
      for (const zone of zones) {
        const spotIndex = zone.spots.findIndex((spot) => !spot.isOccupied);
        if (spotIndex !== -1) {
          addCar(car, zone.name, spotIndex);
          return;
        }
      }
      console.warn("没有空闲车位！");
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
        console.log(
          `车牌号: ${carInfo.licensePlate}, 入库时间: ${carInfo.timeIn}, 出库时间: ${carInfo.timeOut}`
        );
      }
   
    } else {
      for (const zone of zones) {
        const spotIndex = zone.spots.findIndex((spot) => spot.isOccupied);
        if (spotIndex !== -1) {
          removeCar(zone.name, spotIndex);
          return;
        }
      }
      console.warn("没有车辆可出库！");
    }
  };

  return {
    zones,
    parkingHistory,
    addCar,
    removeCar,
  };
});
