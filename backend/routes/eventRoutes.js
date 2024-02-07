import express from 'express';
import { createEvent,getEvents,getOneEvent,deleteEvents } from '../controllers/eventController.js';
const router = express.Router();


router.route('/').post(createEvent).get(getEvents);
router.route('/:id').get(getOneEvent).delete(deleteEvents);

export default router;
