const singleStorageUpload = require('./singleStorageUpload');
const multerImageConfig = require('./multerImageConfig');
const createImages = require('./createImages');
const LocalSingleStorage = require('./LocalSingleStorage');

module.exports = {
  createImages,
  multerImageConfig,
  singleStorageUpload,
  LocalSingleStorage,
};
