import { Router } from 'express';
import { User } from '../models/user';
import { pick } from 'lodash';
import Joi from 'joi';
import auth from '../middleware/auth';

const router = Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async (req, res) => {
    const data = pick(req.body, ['email', 'password']);

    const { error } = validate(data);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: data.email });
    if (!user) return res.status(400).send('Invalid email or password');

    const valid = await user.comparePassword(data.password);
    if (!valid) return res.status(400).send('Invalid email or password');

    const token = user.getToken();

    res.send(token);
});

function validate(data) {
    const loginSchema = Joi.object({
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(255).required()
    });
    return loginSchema.validate(data);
}

module.exports = router;