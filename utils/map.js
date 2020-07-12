const PI = Math.PI;
const TWO_PI = 2 * Math.PI;
const RADIUS = 6378.1


export const getCoordsFromAngleAndDistance = (latitude, longitude, d, b) => {

  let bearing = b * Math.PI / 180
  let lat = latitude * Math.PI / 180
  let lon = longitude * Math.PI / 180;
  let distance = d / 1000;

  lat = Math.asin(
    Math.sin(lat) * Math.cos(distance / RADIUS) +
    Math.cos(lat) * Math.sin(distance / RADIUS) *
    Math.cos(bearing)
  );
  lon += Math.atan2(
    Math.sin(bearing) *
    Math.sin(distance / RADIUS) *
    Math.cos(lat),
    Math.cos(distance / RADIUS) - Math.sin(lat) * Math.sin(lat)
  );

  return {
    lat: lat * 180 / Math.PI,
    lng: lon * 180 / Math.PI
  };

}


export function coordsCovertDistance(lat1, lon1, lat2, lon2) {
  //1° of latitude = always 111.32 km
  //1° of longitude = 40075 km * cos( latitude ) / 360
  //eart radius

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


export class ValidateCoords {
  static isInsidePitch = (latitude, longitude, data) => {
    let latArray = [];
    let longArray = [];
    data.forEach(arr => {
      latArray.push(arr[0]);
      longArray.push(arr[1]);
    });

    let angle = 0;
    let p1Lat;
    let p1Long;
    let p2Lat;
    let p2Long;
    let n = latArray.length;

    for (let i = 0; i < n; i++) {
      p1Lat = latArray[i] - latitude;
      p1Long = longArray[i] - longitude;
      p2Lat = latArray[(i + 1) % n] - latitude;
      p2Long = longArray[(i + 1) % n] - longitude;
      angle += ValidateCoords.angle2D(p1Lat, p1Long, p2Lat, p2Long);
    }

    return !(Math.abs(angle) < PI);
  }


  static isInsideCircle = (lat, lng, center, radius) => {
    return coordsCovertDistance(lat, lng, center.lat, center.lng) <= radius;
  }

  static angle2D = (y1, x1, y2, x2) => {
    let theta, theta1, theta2;

    theta1 = Math.atan2(y1, x1);
    theta2 = Math.atan2(y2, x2);
    theta = theta2 - theta1;
    while (theta > PI) theta -= TWO_PI;
    while (theta < -PI) theta += TWO_PI;

    return theta;
  };

  static isValidCoordinate = (latitude, longitude) => {
    return (
      latitude !== "" &&
      longitude !== "" &&
      !isNaN(latitude) &&
      !isNaN(longitude) &&
      latitude > -90 &&
      latitude < 90 &&
      longitude > -180 &&
      longitude < 180
    );
  };
}
