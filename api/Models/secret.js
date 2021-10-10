const mongoose = require('mongoose');
const { Schema } = mongoose;
const cryptoHelper = require('../Helpers/crypto.helper')

const secretSchema = new Schema({
  hash: String,
  secretText: String,
  expiresAt: Number,
  remainingViews: Number,
  createdAt: Number,
});

secretSchema.methods.encryptSecret = function encryptSecret() {
  this.secretText = cryptoHelper.encrypt(this.secretText);
}

secretSchema.methods.decryptSecret = function decryptSecret() {
  this.secretText = cryptoHelper.decrypt(this.secretText);
}

module.exports = mongoose.model('Secret', secretSchema);