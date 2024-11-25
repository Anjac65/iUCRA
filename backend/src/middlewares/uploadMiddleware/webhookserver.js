const express = require('express');
const bodyParser = require('body-parser');
const { Firestore } = require('@google-cloud/firestore');

const app = express();
app.use(bodyParser.json()); // Parse JSON requests

// Initialize Firestore client
const firestore = new Firestore();

// Webhook endpoint to handle Dialogflow requests
app.post('/webhook', async (req, res) => {
  try {
    // Extract parameters from Dialogflow request, if any
    const intentName = req.body.queryResult.intent.displayName;
    console.log(`Webhook triggered for intent: ${intentName}`);

    // Example: Fetch the latest file metadata from Firestore
    if (intentName === 'Get Latest File') {
      const querySnapshot = await firestore.collection('iucra').orderBy('timestamp', 'desc').limit(1).get();

      if (querySnapshot.empty) {
        return res.json({
          fulfillmentText: 'No files have been uploaded yet.'
        });
      }

      // Get file data from Firestore
      const fileData = querySnapshot.docs[0].data();

      // Respond to Dialogflow CX with file details
      return res.json({
        fulfillmentMessages: [
          {
            text: {
              text: [
                `The latest uploaded file is: ${fileData.fileName}. You can download it here: ${fileData.publicUrl}`
              ]
            }
          }
        ]
      });
    } else {
      return res.json({
        fulfillmentText: `I don't have data for this intent.`
      });
    }
  } catch (error) {
    console.error('Error handling webhook request:', error);
    res.status(500).send('Webhook Error');
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Webhook server listening on port ${port}`);
});
