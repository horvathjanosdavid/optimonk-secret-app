const Joi = require('joi');

module.exports = (req, res, next) => {
    const secretSchema = Joi.object({
        secret: Joi.string().required(),
        expireAfterViews: Joi.number().required().min(1),
        expireAfter: Joi.number().required().min(0)
    })
    const {error} = secretSchema.validate(req.body);
    if (error) return res.status(400).send({
        message: error.details[0].message
    });
    return next();
}