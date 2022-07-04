import axios from 'axios';
import {JSONRovers, JSONCamera} from './interfaces';

export function rovers(api_url: string, res: any) {
    axios.get(api_url).then(resp => {
        res.send(resp.data.rovers);
    }).catch(() => {
        console.log("error");
        res.send("Error: Try again later");
    });
}