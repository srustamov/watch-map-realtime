const PI = Math.PI;
const TWO_PI = 2 * Math.PI;
// earth radius
const RADIUS = 6378.1;

function coordsCovertDistance(lat1, lon1, lat2, lon2) {

    let dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;

    let dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = RADIUS * c;
    return d * 1000;
}

function angleFromCoordinate(lat1, lon1, lat2, lon2) {
    let p1 = {
        x: lat1,
        y: lon1
    };

    let p2 = {
        x: lat2,
        y: lon2
    };

    // angle in degrees
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / PI;
}

module.exports = {
    coordsCovertDistance,
    angleFromCoordinate
}