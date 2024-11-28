import { defineStore } from "pinia";
import { reactive } from "vue";

interface Car {
  licensePlate: string;
  timeIn?: Date;
  timeOut?: Date;
}

interface Slot {
  isOccupied: boolean;
  carInfo?: Car;
}

interface Zone {
  name: string;
  total: number;
  free: number;
  slots: Slot[];
}

export const useParkingStore = defineStore("parkingStore", () => {
  const zones = reactive(
    Array.from(
      { length: 17 },
      (_, i): Zone => ({
        name: String.fromCharCode(65 + i),
        total: 18,
        free: 18,
        slots: Array.from(
          { length: 18 },
          (): Slot => ({
            isOccupied: false,
          })
        ),
      })
    )
  );

  const addCar = (car: Car, zoneName?: string, slotIndex?: number) => {
    if (zoneName !== undefined && slotIndex !== undefined) {
      const zone = zones.find((z) => z.name === zoneName);
      if (!zone) return;
      const slot = zone.slots[slotIndex];
      if (!slot.isOccupied) {
        car.timeIn = new Date();
        slot.isOccupied = true;
        slot.carInfo = car;
        zone.free -= 1;
      }
    } else {
      for (const zone of zones) {
        const slotIndex = zone.slots.findIndex((slot) => !slot.isOccupied);
        if (slotIndex !== -1) {
          addCar(car, zone.name, slotIndex);
          return;
        }
      }
      console.warn("没有空闲车位！");
    }
  };

  const removeCar = (zoneName?: string, slotIndex?: number) => {
    if (zoneName !== undefined && slotIndex !== undefined) {
      const zone = zones.find((z) => z.name === zoneName);
      if (!zone) return;
      const slot = zone.slots[slotIndex];
      if (!slot || !slot.isOccupied) return;

      const carInfo = slot.carInfo;
      if (carInfo) {
        carInfo.timeOut = new Date();
        console.log(
          `车牌号: ${carInfo.licensePlate}, 入库时间: ${carInfo.timeIn}, 出库时间: ${carInfo.timeOut}`
        );
      }
      slot.isOccupied = false;
      slot.carInfo = undefined;
      zone.free += 1;
    } else {
      for (const zone of zones) {
        const slotIndex = zone.slots.findIndex((slot) => slot.isOccupied);
        if (slotIndex !== -1) {
          removeCar(zone.name, slotIndex);
          return;
        }
      }
      console.warn("没有车辆可出库！");
    }
  };

  return {
    zones,
    addCar,
    removeCar,
  };
});
