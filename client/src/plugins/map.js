export default {
    initialize: function(latlngs, options) {
        let self = this;

        L.Polyline.prototype.initialize.call(this, latlngs, options);

        this.corridor = options.corridor;
        this.updateCallback = (function(e) {
            self._updateWeight(this);
        });
    },

    onAdd: function(map) {
        L.Polyline.prototype.onAdd.call(this, map);
        map.on('zoomend', this.updateCallback);
        this._updateWeight(map);
    },

    onRemove: function(map) {
        map.off('zoomend', this.updateCallback);
        L.Polyline.prototype.onRemove.call(this, map);
    },

    _updateWeight: function(map) {
        this.setStyle({
            'weight': this._getWeight(map, this.corridor)
        });
    },

    _getWeight: function(map, corridor) {
        return corridor * 2 / this._getMetersPerPixel(map);
    },

    _getMetersPerPixel: function(map) {
        let centerLatLng = map.getCenter();
        let pointC = map.latLngToContainerPoint(centerLatLng);
        let pointX = L.point(pointC.x + 10, pointC.y);

        let latLngX = map.containerPointToLatLng(pointX);
        return centerLatLng.distanceTo(latLngX) / 10;
    }
};

// L.corridor = function (latlngs, options) {
//   return new L.Corridor(latlngs, options || {
//     corridor: 100
//   });
// }