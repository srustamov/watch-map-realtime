import Vue from 'vue'
import io from 'socket.io-client'

window.$socket = io(window.SOCKET_URL)

Vue.prototype.$socket = window.$socket;

export default window.$socket;