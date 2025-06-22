import express from 'express';
import { vote, getResults } from '../controllers/voteController.js';
const router = express.Router();

router.post('/', vote);
router.get('/results', getResults);

export default router;
