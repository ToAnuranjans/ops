
const path = require('path');
const multer = require('multer');
import express, { urlencoded } from 'express';
import auth from '../middleware/auth';
import admin from '../middleware/admin';

const route = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images'));
    },
    filename: (req, file, cb) => {
        cb(null, 'OPS-' + new Date().toISOString() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileTypes = /png|jpg|jpeg/;
    cb(null, fileTypes.test(ext));
};

const upload = multer({ storage: storage, fileFilter });

route.get('/', (req, res) => {
    res.send(courses);
});

route.get('/:id', (req, res) => {
    const id = req.params.id;
    const course = courses.find(c => c.id === +id);
    if (!course) return res.status(404).send(`No course found for id ${id}`);
    res.send(course);
});

route.post('/', [auth, admin], upload.single('fileAttachment'), (req, res) => {
    const imageUrl = encodeURI(`${req.protocol}://${req.headers.host}/assets/images/${req.file.filename}`);
    const course = req.body;
    return res.send({
        imageUrl
    });
});


route.delete('/:id', (req, res) => {
    const id = req.params.id;
    const course = courses.find(c => c.id === +id);
    if (!course) return res.status(404).send(`No course found for id ${id}`);

    const index = courses.findIndex(c => c.id === +id);
    courses.slice(index, 1);
    return res.send(course);

});


module.exports = route;
