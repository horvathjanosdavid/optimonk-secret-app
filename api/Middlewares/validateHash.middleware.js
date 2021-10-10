const Joi = require('joi');

module.exports = (req, res, next) => {
    const secretSchema = Joi.object({
        hash: Joi.string().required().pattern(/[A-Za-z0-9_-]{21}/, { name: 'hash'}),
    })
    const {error} = secretSchema.validate(req.params);
    if (error) return res.status(400).send({
        message: error.details[0].message
    });
    return next();
}