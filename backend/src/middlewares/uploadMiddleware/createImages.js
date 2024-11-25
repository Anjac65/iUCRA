const createImages = async (files) => {
    if (Array.isArray(files)) {
      let images = files.map(
        (f) =>
          new Image({
            name: f.filename,
            path: f.path,
            mimeType: f.mimetype,
          }),
      );
      return Image.insertMany(images);
    } else {
      let image = new Image({
        name: files.filename,
        path: files.path,
        mimeType: files.mimetype,
      });
      return image.save();
    }
  };
  module.exports = createImages;