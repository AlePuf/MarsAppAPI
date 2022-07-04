import express from "express";
import {rovers} from '../Controllers/rovers.controllers';
import {photos} from '../Controllers/photos.controllers';

const app = express();
const port = 8000;
export const API_KEY = 'M3d4mWdNB9BtMBlncFSJ6BBy9hdlGmpOll5BJlTf';
export const API_BASE = 'https://api.nasa.gov/mars-photos/api/v1';

app.use(express.json());
const router = express.Router();
app.use('/', router);

router.get('/test', (req, res) => res.send('Hello world !'));

router.get('/rovers', rovers);

router.get('/rovers/:rover/photos/:sol', photos);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});