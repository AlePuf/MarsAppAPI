import express from "express";
import {rovers} from './rovers';
import {photos} from './photos';
import {check_valid_rover} from './check_valid_rover';

const app = express();
const port = 8000;
export const api_key = 'M3d4mWdNB9BtMBlncFSJ6BBy9hdlGmpOll5BJlTf';
export const api_base = 'https://api.nasa.gov/mars-photos/api/v1';

app.use(express.json());
const router = express.Router();
router.get('/test', (req, res) => res.send('Hello world !'));
app.use('/', router);

router.get('/rovers', (req, res) => {
    let api_url = `${api_base}/rovers?api_key=${api_key}`;
    rovers(api_url, res);
});

router.get('/rovers/:rover/photos/:sol', async (req, res) => {
    let valid = await check_valid_rover(req.params.rover);
    if (!valid) {
        res.send("Error: Invalid rover!");
        return;
    }
    let api_url = `${api_base}/rovers/${req.params.rover}/photos?sol=${req.params.sol}&api_key=${api_key}`;
    photos(api_url, req, res);
});

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});