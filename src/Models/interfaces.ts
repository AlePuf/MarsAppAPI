export interface JSONCamera {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
}

export interface JSONRovers {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
    max_sol: number;
    max_date: string;
    total_photos: number;
    cameras: Array<JSONCamera>;
}

export interface JSONRover {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
}

export interface JSONPhoto {
    id: number;
    sol: number;
    camera: JSONCamera;
    img_src: string;
    earth_date: string;
    rover: JSONRover;
}