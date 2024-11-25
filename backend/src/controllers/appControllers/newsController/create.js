const mongoose = require('mongoose');

const Model = mongoose.model('News');
const express = require('express');
const multer = require('multer');

const custom = require('@/controllers/pdfController');
const { calculate } = require('@/helpers');
const { increaseBySettingKey } = require('@/middlewares/settings');
const create = async (req, res) => {
  const { number, tittle, content, schedule, status } = req.body;
  let body = req.body;
  // Process photo upload if available
  let photo = null;
  if (req.files[0]) {
    photo = req.files[0].path.replace('src\\', '');
  }

  console.log(photo);
  // body['subTotal'] = subTotal;
  // body['taxTotal'] = taxTotal;
  // body['total'] = total;
  // body['items'] = items;
  body['number'] = number;
  body['tittle'] = tittle;
  body['content'] = content;
  body['photo'] = photo;
  body['schedule'] = schedule;
  body['status'] = status;
  body['createdBy'] = req.admin._id;

  // Creating a new document in the collection
  const result = await new Model(body).save();
  const fileId = 'news-' + result._id + '.pdf';
  const updateResult = await Model.findOneAndUpdate(
    { _id: result._id },
    { pdf: fileId },
    {
      new: true,
    }
  ).exec();
  // Returning successfull response

  increaseBySettingKey({
    settingKey: 'last_news_number',
  });

  // Returning successfull response
  return res.status(200).json({
    success: true,
    result: updateResult,
    message: 'News created successfully',
  });
};
module.exports = create;

// const mongoose = require('mongoose');
// const express = require('express');
// const Model = mongoose.model('News');
// const { singleStorageUpload } = require('@/middlewares/uploadMiddleware');
// const createNews = async (req, res) => {
//   // Utilizing multer middleware
  
//     // Process the rest of the form data after file handling
//     const { number, tittle, content, schedule, status } = req.body;
//     const photo = req.body.file ? { name: req.body.file.path } : null;

//     let body = req.body;

  


//   // body['subTotal'] = subTotal;
//   // body['taxTotal'] = taxTotal;
//   // body['total'] = total;
//   // body['items'] = items;
//   body['number'] = number;
//   body['tittle'] = tittle;
//   body['content'] = content;
//   body['photo'] = photo;
//   body['schedule'] = schedule;
//   body['status'] = status;
//   body['createdBy'] = req.admin._id;

//   // Creating a new document in the collection
//   const result = await new Model(body).save();
//   const fileId = 'news-' + result._id + '.pdf';
//   const updateResult = await Model.findOneAndUpdate(
//     { _id: result._id },
//     { pdf: fileId },
//     {
//       new: true,
//     }
//   ).exec();
//   // Returning successfull response

//   increaseBySettingKey({
//     settingKey: 'last_news_number',
//   });

//   // Returning successfull response
//   return res.status(200).json({
//     success: true,
//     result: updateResult,
//     message: 'News created successfully',
//   });
//   }

// module.exports = {
//   singleStorageUpload,
//   createNews
// };
