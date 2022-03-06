import { createApp } from "vue";
import VueNumberFormat from "vue-number-format";
import App from "./App.vue";
import store from "./store";

const app = createApp(App);

app
  .use(VueNumberFormat, {
    prefix: "",
    decimal: ".",
    thousand: ",",
    precision: 4,
  })
  .use(store)
  .mount("#app");
