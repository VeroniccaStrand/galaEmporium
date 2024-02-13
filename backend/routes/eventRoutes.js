import express from 'express';
import { createEvent,getEventsWithClubId,getOneEvent,deleteEvents,updateEvent } from '../controllers/eventController.js';
const router = express.Router();


router.route('/').post(createEvent)
router.route('/:id').get(getOneEvent).delete(deleteEvents).put(updateEvent);
router.route('/club/:clubId').get(getEventsWithClubId);
export default router;
