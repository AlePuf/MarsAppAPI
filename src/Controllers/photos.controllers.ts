import axios from 'axios';
import {JSONPhoto} from '../Models/interfaces';
import {check_valid_rover} from '../Middleware/check_valid_rover.middleware';
import {API_BASE, API_KEY} from '../Routes/server'

export async function photos(req: any, res: any) {
    let valid = await check_valid_rover(req.params.rover);
    if (!valid) {
        res.send("Error: Invalid rover!");
        return;
    }
    let api_url = `${API_BASE}/rovers/${req.params.rover}/photos?sol=${req.params.sol}&api_key=${API_KEY}`;
    let page = req.query.page;
    let camera = req.query.camera;
    let paginationStart = req.query.paginationStart;
    let paginationEnd = req.query.paginationEnd;
    if (page && paginationStart || page && paginationEnd) {
        res.send("Error: can't have both page and pagination params!");
        return;
    }
    if (paginationStart && !paginationEnd || !paginationStart && paginationEnd) {
        res.send("Error: must have both paginationStart and paginationEnd!");
        return;
    }
    if (page) {
        api_url += `&page=${page}`;
    }
    if (camera) {
        api_url += `&camera=${req.query.camera}`;
    }
    if (paginationStart && paginationEnd && typeof paginationStart == "string" && typeof paginationEnd == "string") {
        let response: Array<JSONPhoto> = [];
        let promiseArray: any[] = [];
        for (let i = parseInt(paginationStart); i <= parseInt(paginationEnd); i++) {
            let url = api_url + `&page=${i}`;
            promiseArray.push(axios.get(url));
        }
        Promise.all(promiseArray).then(resp => {
            for (let i = 0; i < promiseArray.length; i++) {
                response.push(resp[i].data.photos);
            }
            res.send(response);
        }).catch(() => {
            res.send("Error: invalid parameters");
        });
    } else {
        axios.get(api_url).then(resp => {
            res.send(resp.data.photos);
        }).catch(() => {
            res.send("Error: invalid parameters");
        });
    }
}