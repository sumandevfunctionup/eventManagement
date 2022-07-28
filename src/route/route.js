const express = require('express');
const router = express.Router();

const userController=require("../controllers/userContoller");
const eventController=require("../controllers/eventController");
const mw=require('../middleware/middleware');
//createuser
router.post('/createUser',userController.registerUser);
//loginUser
router.post('/login',userController.login);
//updatePassword
router.put('/updatePassword',userController.updatePassword);
//createEvent
router.post('/createEvent',mw.authentication,mw.authorization,eventController.createEvent);
//updateEvent
router.put('/updateEvent',mw.authentication,mw.authorization,eventController.updateEvent);
//deleteEventById
router.delete('/deleteeventById',mw.authentication,mw.authorization,eventController.deleteEventBypath);
//getevents
router.get('/getEvents',mw.authentication,eventController.getEvents);


module.exports=router;
