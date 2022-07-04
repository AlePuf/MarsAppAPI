import {API_KEY, API_BASE} from '../Routes/server';
import {JSONRovers} from '../Models/interfaces';
import axios from 'axios';

export async function check_valid_rover(rover: string) : Promise<Boolean> {
    let api_url = `${API_BASE}/rovers?api_key=${API_KEY}`;
    let returnValue = false;
    await axios.get(api_url).then(resp => {
       let rovers : Array<JSONRovers> = resp.data.rovers;
       for (let i = 0; i < rovers.length; i++) {
           if (rovers[i].name.toLowerCase() === rover.toLowerCase())
               returnValue = true;
       }
    });
    return returnValue;
}