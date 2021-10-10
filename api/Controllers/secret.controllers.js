const { nanoid } = require('nanoid');
const add = require('date-fns/add');
const SecretModel = require('../Models/secret');

// controller fns

const createSecret = async (req, res) => {
    const newSecret = new SecretModel({
        hash: nanoid(),
        secretText: req.body.secret,
        expiresAt: getSecretExpireTime(req.body.expireAfter),
        remainingViews: req.body.expireAfterViews,
        createdAt: new Date().getTime(),
        });
    newSecret.encryptSecret();
    const saved = await newSecret.save();
    res.send(saved);
}

const getSecret = async (req, res) => {
    const hash = req.params.hash;

    const oldSecret = await SecretModel.findOne({ hash })
        .select({'_id': 0, '__v': 0})
        .exec();

    if (!oldSecret) return res.status(404).send({message: 'Entity not found!'});
    if (!isSecretCanBeViewed(oldSecret)) return res.status(403).send({message: 'The requested entity can no longer be viewed!'});

    const updatedSecret = await SecretModel.findOneAndUpdate({ hash },{ $inc: { remainingViews: -1 }}, { new: true })
    .select({'_id': 0, '__v': 0})
    .exec();
    updatedSecret.decryptSecret();

    return res.send(updatedSecret);
}



// helper fns

const getSecretExpireTime = (expiresAt) => {
    return expiresAt ? add(new Date(), {minutes: expiresAt}).getTime() : null;
}

const isSecretCanBeViewed = (secret) => {
    return secret.remainingViews > 0 && (secret.expiresAt ? secret.expiresAt > new Date().getTime() : true);
}

module.exports = {
    createSecret,
    getSecret
};