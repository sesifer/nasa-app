export const DEFAULT_ENDPOINT = "https://api.nasa.gov/mars-photos/api/v1/";
export const API_KEY = "sk6a2WZ1vspEWxMYFKXmRUUQYIHMqe8GNl8r6f49";
export const ROVERS = [
    {id: 1, name: "perseverance"},
    {id: 2, name: "curiosity"},
    {id: 3, name: "opportunity"},
    {id: 4, name: "spirit"}
];
export const CAMERAS = [
    {
        key: "FHAZ",
        name: "Front Hazard Avoidance Camera"
    },
    {
        key: "RHAZ",
        name: "Rear Hazard Avoidance Camera"
    },
    {
        key: "MAST",
        name: "Mast Camera"
    },
    {
        key: "CHEMCAM",
        name: "Chemistry and Camera Complex"
    },
    {
        key: "MAHLI",
        name: "Mars Hand Lens Imager"
    },
    {
        key: "MARDI",
        name: "Mars Descent Imager"
    },
    {
        key: "NAVCAM",
        name: "Navigation Camera"
    },
    {
        key: "PANCAM",
        name: "Panoramic Camera"
    },
    {
        key: "MINITES",
        name: "Miniature Thermal Emission Spectrometer"
    }
];

export const fetcher = (...args) => fetch(...args).then(res => res.json());
