export const CIRCLE_AREA = 1;
export const LIEN_AREA = 2;
export const RECTANGLE_AREA = 3;
export const POLYGON_AREA = 4;

export const LINE_AREA_SYSTEM_CARTESIAN = 1;
export const LINE_AREA_SYSTEM_POLAR = 2;

export const coordinatesRules = {
    lat: [
        v => String(v).trim() !== "" || "Latitude is required",
        v => (v <= 90 && v >= -90) || "Latitude invalid"
    ],
    lng: [
        v => String(v).trim() !== "" || "Longitude is required",
        v => (v <= 180 && v >= -180) || "Longitude invalid"
    ]
}

export const areas = [{
    id: CIRCLE_AREA,
    name: 'circle'
}, {
    id: LIEN_AREA,
    name: 'navigation line'
}, {
    id: RECTANGLE_AREA,
    name: 'rectangle'
}, {
    id: POLYGON_AREA,
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
    types: [{
            number: LINE_AREA_SYSTEM_CARTESIAN,
            name: 'Cartesian coordinate system'
        },
        {
            number: LINE_AREA_SYSTEM_POLAR,
            name: 'Polar coordinate system'
        }
    ],
    type: LINE_AREA_SYSTEM_CARTESIAN,
    coords: {
        start: {
            lat: '',
            lng: ''
        },
        end: {
            lat: '',
            lng: ''
        },
    },
    width: 2,
    bearing: '',
    distance: ''
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