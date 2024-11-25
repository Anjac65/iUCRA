const mongoose = require('mongoose');

// Update news controller
const updateNews = async (req, res) => {
  const News = mongoose.model('News');

  // Find the news article by its ID from request params or body
  const newsId = req.params.id || req.body.id;
  

  // Structure the update fields based on request body
  let updates = {
    number: req.body.number,
    tittle: req.body.tittle,
    content: req.body.content,
    schedule: req.body.schedule,
    status: req.body.status,
  };

  // Include photo in updates if it exists
  if (req.files[0]) {
    updates.photo = req.files[0].path.replace('src\\', '');
  }

  // Find news document by ID and update it
  const result = await News.findOneAndUpdate(
    { _id: newsId, removed: false },
    { $set: updates },
    {
      new: true, // Return the updated news document
    }
  ).exec();

  // Check if the news article was found and updated
  if (!result) {
    return res.status(404).json({
      success: false,
      result: null,
      message: 'No news article found with this id: ' + newsId,
    });
  }

  // Return successful response
  return res.status(200).json({
    success: true,
    result: {
      _id: result._id,
      number: result.number,
      tittle: result.tittle,
      content: result.content,
      photo: result.photo,
      schedule: result.schedule,
      status: result.status,
    },
    message: 'News article updated successfully with id: ' + newsId,
  });
};

module.exports = updateNews;
