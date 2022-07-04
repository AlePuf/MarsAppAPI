import axios from 'axios';
import {JSONRovers, JSONCamera} from './interfaces';

export function rovers(api_url: string, res: any) {
    axios.get(api_url).then(resp => {
        let data = resp.data.rovers;
        let response = '';
        data.forEach(function (r: JSONRovers) {
            response += `ID: ${r.id}<br>Name: ${r.name}<br>Landing date: ${r.landing_date}<br>Launch date: ${r.launch_date}<br>Status: ${r.status}<br>Max sol: ${r.max_sol}<br>Max date: ${r.max_date}<br>Total photos: ${r.total_photos}<br>Cameras:<br>`;
            r.cameras.forEach(function(c: JSONCamera) {
                response += `&emsp;ID: ${c.id}<br>&emsp;Name: ${c.name}<br>&emsp;Full name: ${c.full_name}<br><br>`;
            });
        });
        res.send(response);
    }).catch(() => {
        console.log("error");
    });
}