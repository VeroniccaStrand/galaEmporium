import express from 'express';
import { createUser, getUsers, getOneUser,deleteUser } from '../controllers/userController.js';
const router = express.Router();


router.route('/').post(createUser).get(getUsers);
router.route('/:id').get(getOneUser).delete(deleteUser);

export default router;
