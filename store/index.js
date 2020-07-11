export const state = () => ({
  create_area_dialog: {
    show: false,
    minimize: false,
    width: "auto"
  }
});

export const getters = {
  create_area_dialog: state => state.create_area_dialog
}

export const mutations = {
  createAreaDialogSizeToggle(state) {
    state.create_area_dialog.width = state.create_area_dialog.width === "auto" ? "50px" : "auto";
  },
  createAreaDialogToggle(state) {
    state.create_area_dialog.show = !state.create_area_dialog.show
  },
  createAreaDialogWidth(state, width) {
    state.create_area_dialog.width = width
  },
  createAreaDialogMin(state, min) {
    state.create_area_dialog.minimize = min
  }
}
