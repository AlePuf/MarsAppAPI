import express from "express";
import axios from 'axios';

const app = express();
const port = 8000;
const api_key = 'M3d4mWdNB9BtMBlncFSJ6BBy9hdlGmpOll5BJlTf';
const rover = 'curiosity';
const camera_type = 'NAVCAM';

interface JSONCamera {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
}

interface JSONRovers {
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

interface JSONRover {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
}

interface JSONPhoto {
    id: number;
    sol: number;
    camera: JSONCamera;
    img_src: string;
    earth_date: string;
    rover: JSONRover;
}

app.use(express.json());
const router = express.Router();
router.get('/test', (req, res) => res.send('Hello world !'));
app.use('/', router);

router.get('/rovers', (req, res) => {
    let api_url = `https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${api_key}`;
    axios.get(api_url).then(resp => {
        let data = resp.data["rovers"];
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
});

router.get('/rovers/:rover/photos/:camera/:sol', (req, res) => {
    let api_url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${req.params.rover}/photos?sol=${req.params.sol}&camera=${req.params.camera}&api_key=${api_key}`;
    axios.get(api_url).then(resp => {
        let data = resp.data["photos"];
        let response = '';
        data.forEach(function (p: JSONPhoto) {
           response += `Photo ID: ${p.id}<br>Camera: ${p.camera.name}<br><img src="${p.img_src}"><br><br>`;
        });
        res.send(response);
    }).catch(() => {
       console.log("error");
    });
})

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});