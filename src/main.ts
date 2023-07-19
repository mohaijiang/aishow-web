import { createApp } from 'vue'
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { PolkadotAiChanClient } from "@/components/polkadot/ai-model"
import App from './App.vue'
import router from "./router";
//ant-design-vue
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import "./design/main.css";
import "./design/app.less";

const app = createApp(App);

const allInjected = await web3Enable('my cool dapp');
console.log(allInjected, '---123')
// const allAccounts = await web3Accounts();
// const account = allAccounts[0].address
const wsProvider = new WsProvider('wss://ws.aishow.hamsternet.io');
const api = await ApiPromise.create({ provider: wsProvider });
const client = new PolkadotAiChanClient(api)
app.config.globalProperties.client = client;
// app.config.globalProperties.account = account;
app.config.globalProperties.PolkdotApi = api;

app.use(router);
app.use(Antd);
app.mount("#app");
