import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { db } from './firebase';


import "./assets/index.css";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.provide('db', db); 


app.mount("#app");
