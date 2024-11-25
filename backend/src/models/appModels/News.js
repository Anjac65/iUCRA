// const mongoose = require('mongoose');

// const newsSchema = new mongoose.Schema({
//   removed: {
//     type: Boolean,
//     default: false,
//   },

//   createdBy: { type: mongoose.Schema.ObjectId, ref: 'Admin', required: true },
//   converted: {
//     type: Boolean,
//     default: false,
//   },
//   number: {
//     type: Number,
//     required: true,
//   },
//   year: {
//     type: Number,
//     required: true,
//   },
//   content: String,
//   date: {
//     type: Date,
//     required: true,
//   },
//   lead: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'Lead',
//     required: true,
//     autopopulate: true,
//   },
//   items: [
//     {
//       itemName: {
//         type: String,
//         required: true,
//       },
//       description: {
//         type: String,
//       },
//       quantity: {
//         type: Number,
//         required: true,
//       },
//       price: {
//         type: Number,
//         required: true,
//       },
//       // taxRate: {
//       //   type: Number,
//       //   default: 0,
//       // },
//       // subTotal: {
//       //   type: Number,
//       //   default: 0,
//       // },
//       // taxTotal: {
//       //   type: Number,
//       //   default: 0,
//       // },
//       total: {
//         type: Number,
//         required: true,
//       },
//     },
//   ],
//   currency: {
//     type: String,
//     default: 'NA',
//     uppercase: true,
//     required: true,
//   },
//   taxRate: {
//     type: Number,
//   },
//   subTotal: {
//     type: Number,
//   },
//   subNewsTotal: {
//     type: Number,
//   },
//   taxTotal: {
//     type: Number,
//   },
//   total: {
//     type: Number,
//   },
//   discount: {
//     type: Number,
//     default: 0,
//   },
//   notes: {
//     type: String,
//   },
//   status: {
//     type: String,
//     enum: ['draft', 'pending', 'sent', 'accepted', 'declined', 'cancelled', 'on hold'],
//     default: 'draft',
//   },
//   approved: {
//     type: Boolean,
//     default: false,
//   },
//   isExpired: {
//     type: Boolean,
//     default: false,
//   },
//   pdf: {
//     type: String,
//   },
//   files: [
//     {
//       id: String,
//       name: String,
//       path: String,
//       description: String,
//       isPublic: {
//         type: Boolean,
//         default: true,
//       },
//     },
//   ],
//   updated: {
//     type: Date,
//     default: Date.now,
//   },
//   created: {
//     type: Date,
//     default: Date.now,
//   },
// });

// newsSchema.plugin(require('mongoose-autopopulate'));
// module.exports = mongoose.model('News', newsSchema);

const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  // Event ID
  number: {
    type: Number,
    required: true,
  },

  // Title
  tittle: {
    type: String,
    required: true,
  },

  // Content
  content: {
    type: String,
    required: true,
  },

  // Photo (file upload metadata)
  photo: {
    type: String,
    trim: true,
  },

  // Schedule (Date and Time)
  schedule: {
    type: Date,
    required: true,
    
  },

  // Status
  status: {
    type: String,
    enum: ['draft', 'pending', 'published', 'archived'],
    default: 'draft',
  },

  // Additional metadata fields
  removed: {
    type: Boolean,
    default: false,
  },
  createdBy: { 
    type: mongoose.Schema.ObjectId, 
    ref: 'Admin', 
    required: true 
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

// Plugin for autopopulate if needed
newsSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('News', newsSchema);
