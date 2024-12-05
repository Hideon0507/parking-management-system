import "@mdi/font/css/materialdesignicons.css";
import { createPinia } from "pinia";
import { createApp } from "vue";
import { createVuetify } from "vuetify";
import "vuetify/styles";
import colors from "vuetify/util/colors";
import App from "./App.vue";
import router from "./router/router";
import "./style.css";

const vuetify = createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          teal: colors.teal.lighten1,
          greyDark: colors.grey.darken1,
          orange: colors.orange.lighten1,
          cyan: colors.cyan.darken1,
          green: colors.green.darken1,
          greyLight: colors.grey.lighten3,
         red: colors.red.darken1,         
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
