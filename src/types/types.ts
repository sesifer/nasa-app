export type PhotoItem = {
    sol: number,
    earth_date: string,
    total_photos: number,
    cameras: string[],
};

export type Camera = {
    id: number,
    name: string,
    rover_id: number,
    full_name: string,
}

export type Rover = {
    id: number,
    name: string,
    landing_date: string,
    launch_date: string,
    status: string,
}

export type GalleryItem = {
    camera: Camera,
    earth_date: string,
    id: number,
    img_src: string,
    rover: Rover,
    sol: number,
}