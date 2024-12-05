import { createRouter, createWebHistory } from "vue-router";
import ParkingGrid from '../pages/parking-grid-view/ParkingGrid.vue';
import ParkingZone from '../pages/parking-zone-view/ParkngZone.vue';

const routes = [
  {
    path: "/",
    children: [
      {
        path: "",
        name: "ParkingGrid",
        component: ParkingGrid, 
      },
      {
        path: "zone/:zoneName",
        name: "ParkingZone",
        component: ParkingZone, 
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
