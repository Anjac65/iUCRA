const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    keyFilename: 'iucra-434407-258d07b1a55b.json'
});
const bucket = storage.bucket('iucra');
const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), function(req, res) {
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', (err) => {
        res.status(500).send({ message: err.message });
    });

    blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        res.status(200).send({ url: publicUrl });
    });

    blobStream.end(req.file.buffer);
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});
