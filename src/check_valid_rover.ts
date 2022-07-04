import {api_key, api_base} from './server';
import {JSONRovers} from './interfaces';
import axios from 'axios';

export async function check_valid_rover(rover: string) : Promise<Boolean> {
    let api_url = `${api_base}/rovers?api_key=${api_key}`;
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