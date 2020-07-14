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
    },
    getters: {
        create_area_dialog: (state) => state.create_area_dialog,
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
    },
    actions: {},
    modules: {},
});