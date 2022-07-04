import axios from 'axios';
import {JSONPhoto} from './interfaces';

export function photos(api_url: string, req: any, res: any) {
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
    if (paginationStart && paginationEnd) {
        if (typeof paginationStart == "string" && typeof paginationEnd == "string") {
            let response = '';
            let promiseArray: any[] = [];
            for (let i = parseInt(paginationStart); i <= parseInt(paginationEnd); i++) {
                let url = api_url + `&page=${i}`;
                promiseArray.push(axios.get(url));
            }
            Promise.all(promiseArray).then(resp => {
                for (let i = 0; i < promiseArray.length; i++) {
                    let data = resp[i].data.photos;
                    data.forEach(function (p: JSONPhoto) {
                        response += `Photo ID: ${p.id}<br>Camera: ${p.camera.name}<br><img src="${p.img_src}"><br><br>`;
                    });
                }
                res.send(response);
            }).catch(() => {
                console.log("error");
            });
        }
    } else {
        axios.get(api_url).then(resp => {
            let data = resp.data.photos;
            let response = '';
            data.forEach(function (p: JSONPhoto) {
                response += `Photo ID: ${p.id}<br>Camera: ${p.camera.name}<br><img src="${p.img_src}"><br><br>`;
            });
            res.send(response);
        }).catch(() => {
            console.log("error");
        });
    }
}