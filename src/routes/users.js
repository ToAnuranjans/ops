import { Router } from 'express';
import { validate, User } from '../models/user';
import { pick } from 'lodash';

const router = Router();

router.get('/me', async (req, res) => {

});

router.post('/', async (req, res) => {
    const data = pick(req.body, ['name', 'email', 'isAdmin', 'password']);

    console.log({ data });
    const { error } = validate(data);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: data.email });
    if (user) return res.status(400).send('User already exists');

    user = new User(data);
    await user.save();

    const result = pick(user, ['_id', 'name', 'email']);
    const token = user.getToken();

    res.header('x-auth-token', token).send(result);
});

module.exports = router;