import express from "express";
import {rovers} from './rovers';
import {photos} from './photos';

const app = express();
const port = 8000;
const api_key = 'M3d4mWdNB9BtMBlncFSJ6BBy9hdlGmpOll5BJlTf';
const api_base = 'https://api.nasa.gov/mars-photos/api/v1';
const rover = 'curiosity';
const camera_type = 'NAVCAM';

app.use(express.json());
const router = express.Router();
router.get('/test', (req, res) => res.send('Hello world !'));
app.use('/', router);

router.get('/rovers', (req, res) => {
    let api_url = `${api_base}/rovers?api_key=${api_key}`;
    rovers(api_url, res);
});

router.get('/rovers/:rover/photos/:sol', (req, res) => {
    let api_url = `${api_base}/rovers/${req.params.rover}/photos?sol=${req.params.sol}&api_key=${api_key}`;
    photos(api_url, req, res);
});

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});