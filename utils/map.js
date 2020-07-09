export default class {
  static isInsidePitch = (latitude, longitude, latArray, longArray) => {
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
  };

  static angle2D = (y1, x1, y2, x2) => {
    let dtheta, theta1, theta2;

    theta1 = Math.atan2(y1, x1);
    theta2 = Math.atan2(y2, x2);
    dtheta = theta2 - theta1;
    while (dtheta > PI) dtheta -= TWO_PI;
    while (dtheta < -PI) dtheta += TWO_PI;

    return dtheta;
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

export const notifyMe = (message) => {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(message);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(message);
      }
    });
  }
};
