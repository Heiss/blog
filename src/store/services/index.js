import Vue from "vue"
import store from '../store.js'
import VueSocketIO from 'vue-socket.io-extended';
import { io } from 'socket.io-client';
import Blogposts from "./Blogposts.js";

let modules = ["Settings", "Blogposts"] // which modules in this folder should be added to store?

const ioInstance = io('http://localhost:8080', {
    reconnection: true,
    reconnectionDelay: 2000,
    maxReconnectionAttempts: 10,
    reconnectionAttempts: 5,
    transports: ["websocket"]
});

Vue.use(VueSocketIO, ioInstance, {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_',
    eventToActionTransformer: (actionName) => actionName // cancel camel case
})

Vue.use(Blogposts)

function insertModule(modName) {
    let resp = require(`@/store/services/${modName}.js`)
    addModule(resp.default)
}

function addModule(moduleStore) {
    if (!store.hasModule(moduleStore.name)) {
        store.registerModule(moduleStore.name, moduleStore.store, { preserveState: window.localStorage.getItem('vuex') !== null && process.env.NODE_ENV === 'production' })
    }
}

modules.forEach(element => {
    insertModule(element)
});