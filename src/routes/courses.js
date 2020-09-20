
const path = require('path');
const multer = require('multer');
import express from 'express';
import auth from '../middleware/auth';
import admin from '../middleware/admin';

const route = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images'));
    },
    filename: (req, file, cb) => {
        cb(null, 'OPS-' + req.ops_id + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileTypes = /png|jpg|jpeg/;
    cb(null, fileTypes.test(ext));
};

const upload = multer({ storage: storage, fileFilter });

route.get('/', [auth], (req, res) => {
    res.send([]);
});

route.get('/:id', [auth], (req, res) => {
    const id = req.params.id;
    const course = [].find(c => c.id === +id);
    if (!course) return res.status(404).send(`No course found for id ${id}`);
    res.send(course);
});
//[auth, admin] , upload.single('fileAttachment')
route.post('/', [assignId], upload.single('fileAttachment'), (req, res) => {
    const imageUrl = encodeURI(`${req.protocol}://${req.headers.host}/assets/images/${req.file.filename}`);
    const course = req.body;
    const result = {
        imageUrl,
        id: req.ops_id,
        ...course
    };
    console.log(result);
    return res.send(result);
});

route.delete('/:id', (req, res) => {
    const id = req.params.id;
    const course = courses.find(c => c.id === +id);
    if (!course) return res.status(404).send(`No course found for id ${id}`);

    const index = courses.findIndex(c => c.id === +id);
    courses.slice(index, 1);
    return res.send(course);

});

function assignId(req, res, next) {
    req.ops_id = new Date().toISOString();
    next();
}


module.exports = route;
