const express = require('express');
const multer = require('multer');
const { catchErrors } = require('@/handlers/errorHandlers');
const router = express.Router();

const appControllers = require('@/controllers/appControllers');
const { routesList } = require('@/models/utils');
const { singleStorageUpload } = require('@/middlewares/uploadMiddleware');
const { multerImageConfig } = require('@/middlewares/uploadMiddleware');

const routerApp = (entity, controller) => {
  router.post(`/${entity}/create`, 
    multer(multerImageConfig).array("files[]"),
    
    catchErrors(controller['create'])
  );
  // router.post(
  //   `/${entity}/update/:id`, 
  //   multer(multerImageConfig).array("file[0][originFileObj]"), 
  //   catchErrors(controller['update'])
  // );
  
  let sensorData = null;

  router.post('/test', (req, res) => {
    const { data } = req.body;
    console.log(`Received distance: ${data}`);
    sensorData = data;
    res.status(200).json({message: "Data received"});
});

router.get('/test', (req, res) => {
    res.json({ data: sensorData });
});

  router.route(`/${entity}/read/:id`).get(catchErrors(controller['read']));
  router
  .route(`/${entity}/update/:id`)
  .patch(
    multer(multerImageConfig).array("files[]"),
    catchErrors(controller['update'])
  );

  router.route(`/${entity}/delete/:id`).delete(catchErrors(controller['delete']));
  router.route(`/${entity}/search`).get(catchErrors(controller['search']));
  router.route(`/${entity}/list`).get(catchErrors(controller['list']));
  router.route(`/${entity}/listAll`).get(catchErrors(controller['listAll']));
  router.route(`/${entity}/filter`).get(catchErrors(controller['filter']));
  router.route(`/${entity}/summary`).get(catchErrors(controller['summary']));

  if (entity === 'invoice' || entity === 'quote' || entity === 'offer' || entity === 'payment') {
    router.route(`/${entity}/mail`).post(catchErrors(controller['mail']));
  }

  if (entity === 'quote') {
    router.route(`/${entity}/convert/:id`).get(catchErrors(controller['convert']));
  }
};

routesList.forEach(({ entity, controllerName }) => {
  const controller = appControllers[controllerName];
  routerApp(entity, controller);
});

module.exports = router;
