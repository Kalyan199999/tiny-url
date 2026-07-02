import express, { Router } from 'express';

import { UpadteCounter } from '../middlewares/counter.js'

import { 
    addNewUrl,
    fecthUrl
} from '../controllers/router_controller.js'

const router: Router = express.Router();

router.post( '/' , UpadteCounter , addNewUrl );
router.get( '/tiny-url/:short_url' , fecthUrl )

export default router;