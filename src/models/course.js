const Joi = require('joi');

const courseSchema = Joi.object({
    name: Joi.string().required().min(5),
    birth_year: Joi.number()
    .integer()
    .min(1900)
    .max(2013),
});



module.exports = courseSchema;