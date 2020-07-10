export const areas = [{
  id: 1,
  name: 'circle'
}, {
  id: 2,
  name: 'navigation line'
}, {
  id: 3,
  name: 'rectangle'
}, {
  id: 4,
  name: 'polygon'
}, ];



export const line = {
  rules: {
    width: [
      (v) => String(v).trim() !== "" || "Width is required",
      (v) => v > 2 || "Width invalid",
    ],
    bearing: [
      (v) => String(v).trim() !== "" || "Bearing is required",
      (v) => (v >= -360 && v <= 360) || "Bearing invalid",
    ],
    distance: [
      (v) => String(v).trim() !== "" || "Distance is required",
      (v) => parseFloat(v) > 0 || "Distance invalid",
    ]
  },
  types:[
      {
        number:1,
        name:'Cartesian coordinate system'
      },
      {
        number:2,
        name:'Polar coordinate system'
      }
  ],
  type:1,
  coords:{
    start:{lat:'',lng:''},
    end:{lat:'',lng:''},
  },
  width:2,
  bearing: '',
  distance:''
}

export const polygon = {
  inputs: [{
      lat: "",
      lng: "",
    },
    {
      lat: "",
      lng: "",
    },
    {
      lat: "",
      lng: "",
    },
  ],
}

export const circle = {
  coords: {
    lat: "",
    lng: "",
  },
  radius: "",
  rules: {
    radius: [
      (v) => String(v).trim() !== "" || "Radius is required",
      (v) => v > 1 || "Radius invalid",
    ],
  },
}

export const rectangle = {
  coords: [{
      lat: "",
      lng: "",
    },
    {
      lat: "",
      lng: "",
    },
  ],
}
