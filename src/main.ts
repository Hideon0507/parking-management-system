import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createVuetify } from "vuetify";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import router from "./router/router";
import colors from "vuetify/util/colors";
import { createPinia } from "pinia";

// createApp(App).mount('#app')
const vuetify = createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          blueLight: colors.blue.lighten5,
          greyLight: colors.grey.lighten1,
          greyDark: colors.grey.darken1,
          primary: "#4caf50",
          secondary: "#2196f3",
          error: "#f44336",
          warning: "#ff9800",
          info: "#00bcd4",
          success: "#8bc34a",
          background: "#f5f5f5",
        },
      },
    },
  },
});

const pinia = createPinia();
const app = createApp(App);
app.use(vuetify);
app.use(router);
app.use(pinia);
app.mount("#app");
