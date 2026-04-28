//path: backend/src/routes/auth.routes.ts
import {Router} from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/auth.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();


//Auth Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

//test route
router.get('/me', protect, (req: any, res: any) => {
    res.status(200).json({ user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    } });
}
)

export default router;