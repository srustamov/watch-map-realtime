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
    width: "",
    rules: [
        (v) => String(v).trim() !== "" || "Width is required",
        (v) => v > 2 || "Width invalid",
    ],
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