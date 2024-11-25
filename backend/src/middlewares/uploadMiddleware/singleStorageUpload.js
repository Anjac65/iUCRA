const multer = require('multer');
const path = require('path');
const { slugify } = require('transliteration');

const fileFilter = require('./utils/LocalfileFilter');

const singleStorageUpload = ({
  entity,
  fileType = 'default',
  uploadFieldName = 'file',
  fieldName = 'file',
}) => {
  var diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `src/public/uploads/${entity}`);
    },
    filename: function (req, file, cb) {
      try {
        // fetching the file extension of the uploaded file
        let fileExtension = path.extname(file.originalname);
        let uniqueFileID = Math.random().toString(36).slice(2, 7); // generates unique ID of length 5

        let originalname = '';
        if (req.body.seotitle) {
          originalname = slugify(req.body.seotitle.toLocaleLowerCase()); // convert any language to English characters
        } else {
          originalname = slugify(file.originalname.split('.')[0].toLocaleLowerCase()); // convert any language to English characters
        }

        let _fileName = `${originalname}-${uniqueFileID}${fileExtension}`;

        const filePath = `public/uploads/${entity}/${_fileName}`;
        // saving file name and extension in request upload object
        req.upload = {
          fileName: _fileName,
          fieldExt: fileExtension,
          entity: entity,
          fieldName: fieldName,
          fileType: fileType,
          filePath: filePath,
        };

        req.body[fieldName] = filePath;

        cb(null, _fileName);
      } catch (error) {
        cb(error); // pass the error to the callback
      }
    },
  });

  let filterType = fileFilter(fileType);

  const multerStorage = multer({ storage: diskStorage, fileFilter: filterType }).single('file');
  return multerStorage;
};


module.exports = singleStorageUpload;
// const multer = require('multer');
// const { Storage } = require('@google-cloud/storage');
// const { slugify } = require('transliteration');
// const path = require('path');

// const fileFilter = require('./utils/LocalfileFilter');

// // Configure Google Cloud Storage
// const storage = new Storage({
//   keyFilename: 'src/middlewares/uploadMiddleware/iucra-434407-258d07b1a55b.json' // Path to your JSON key file
// });
// const bucket = storage.bucket('iucra'); // Your GCS bucket name

// const singleStorageUpload = ({
//   entity,
//   fileType = 'default',
//   uploadFieldName = 'file',
//   fieldName = 'file',
// }) => {
//   const multerStorage = multer({
//     storage: multer.memoryStorage(), // Temporarily store files in memory
//     fileFilter: fileFilter(fileType) // Apply your custom file filter
//   }).single(uploadFieldName);

//   return (req, res, next) => {
//     multerStorage(req, res, function (err) {
//       if (err) {
//         return next(err);
//       }
//       if (!req.file) {
//         return next(new Error('No file uploaded!'));
//       }

//       // Generate the file name and path for GCS
//       let fileExtension = path.extname(req.file.originalname);
//       let uniqueFileID = Math.random().toString(36).slice(2, 7); // Unique ID
//       let originalname = req.body.seotitle ? slugify(req.body.seotitle.toLocaleLowerCase()) : 
//                                             slugify(req.file.originalname.split('.')[0].toLocaleLowerCase());

//       let _fileName = `${originalname}-${uniqueFileID}${fileExtension}`;
//       const blob = bucket.file(`${entity}/${_fileName}`);

//       // Create a stream to upload the file to GCS
//       const blobStream = blob.createWriteStream({
//         resumable: false
//       });

//       blobStream.on('error', err => next(err));

//       blobStream.on('finish', () => {
//         // Construct the public URL for the file
//         const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
//         req.upload = {
//           fileName: _fileName,
//           fieldExt: fileExtension,
//           entity: entity,
//           fieldName: fieldName,
//           fileType: fileType,
//           filePath: publicUrl,
//         };
//         req.body[fieldName] = publicUrl;

//         next();
//       });

//       blobStream.end(req.file.buffer);
//     });
//   };
// };

// module.exports = singleStorageUpload;

// const multer = require('multer');
// const { Storage } = require('@google-cloud/storage');
// const { slugify } = require('transliteration');
// const path = require('path');

// // Configure Google Cloud Storage
// const storage = new Storage({
//   keyFilename: 'src/middlewares/uploadMiddleware/iucra-434407-258d07b1a55b.json' // Path to your JSON key file
// });
// const bucket = storage.bucket('iucra'); // Your GCS bucket name

// // Middleware to handle file uploads
// const singleStorageUpload = ({
//   entity,
//   fileType = 'default',
//   uploadFieldName = 'file',
//   fieldName = 'file',
// }) => {
//   const multerStorage = multer({
//     storage: multer.memoryStorage(), // Temporarily store files in memory
//   }).single(uploadFieldName);

//   return (req, res, next) => {
//     multerStorage(req, res, function (err) {
//       if (err) {
//         return next(err);
//       }
//       if (!req.file) {
//         return next(new Error('No file uploaded!'));
//       }

//       // Generate the file name and path for GCS
//       let fileExtension = path.extname(req.file.originalname);
//       let uniqueFileID = Math.random().toString(36).slice(2, 7); // Unique ID
//       let originalname = req.body.seotitle ? slugify(req.body.seotitle.toLocaleLowerCase()) : 
//                                             slugify(req.file.originalname.split('.')[0].toLocaleLowerCase());

//       let _fileName = `${originalname}-${uniqueFileID}${fileExtension}`;
//       const blob = bucket.file(`${entity}/${_fileName}`);

//       // Create a stream to upload the file to GCS
//       const blobStream = blob.createWriteStream({
//         resumable: false
//       });

//       blobStream.on('error', err => next(err));

//       blobStream.on('finish', () => {
//         // Construct the public URL for the file
//         const publicUrl = `gs://${bucket.name}/${blob.name}`;
//         req.upload = {
//           fileName: _fileName,
//           fieldExt: fileExtension,
//           entity: entity,
//           fieldName: fieldName,
//           fileType: fileType,
//           filePath: publicUrl,
//         };
//         req.body[fieldName] = publicUrl;

//         next();
//       });

//       blobStream.end(req.file.buffer);
//     });
//   };
// };

// module.exports = singleStorageUpload;