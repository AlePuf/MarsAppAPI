import axios from 'axios';
import {JSONRovers, JSONCamera} from '../Models/interfaces';
import {API_BASE, API_KEY} from '../Routes/server';

export function rovers(req: any, res: any) {
    let api_url = `${API_BASE}/rovers?api_key=${API_KEY}`;
    axios.get(api_url).then(resp => {
        res.send(resp.data.rovers);
    }).catch(() => {
        console.log("error");
        res.send("Error: Try again later");
    });
}