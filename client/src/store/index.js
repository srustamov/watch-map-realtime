import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        create_area_dialog: {
            show: false,
            minimize: false,
            width: "auto",
        },
        layers: [{
                base: true,
                name: 'Open Street Map',
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            },
            {
                name: 'Google Map Streets',
                url: 'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
            },
            {
                name: 'Google Map Hybrid',
                url: 'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}'
            },
            {
                name: 'Google Map Satellite',
                url: 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
            },

            {
                name: 'Google Map Terrain',
                url: 'http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'
            },

        ],
        layer: {
            base: true,
            name: 'Open Street Map',
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        }
    },
    getters: {
        create_area_dialog: (state) => state.create_area_dialog,
        layers: (state) => state.layers,
        layer: (state) => state.layer,
    },
    mutations: {
        createAreaDialogSizeToggle(state) {
            state.create_area_dialog.width =
                state.create_area_dialog.width === "auto" ? "50px" : "auto";
        },
        createAreaDialogToggle(state) {
            state.create_area_dialog.show = !state.create_area_dialog.show;
        },
        createAreaDialogWidth(state, width) {
            state.create_area_dialog.width = width;
        },
        createAreaDialogMin(state, min) {
            state.create_area_dialog.minimize = min;
        },
        selectLayer(state, layer) {
            state.layer = layer;
        }

    },
    actions: {},
    modules: {},
});