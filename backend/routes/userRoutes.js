import express from 'express';
import { createUser, getUsers, getOneUser } from '../controllers/userController.js';
const router = express.Router();


router.route('/').post(createUser).get(getUsers);
router.route('/:id').get(getOneUser);

export default router;
