import express from 'express';
import { createEvent,getEvents,getOneEvent,deleteEvents,updateEvent } from '../controllers/eventController.js';
const router = express.Router();


router.route('/').post(createEvent).get(getEvents);
router.route('/:id').get(getOneEvent).delete(deleteEvents).put(updateEvent);

export default router;
