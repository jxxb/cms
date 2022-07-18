var seqGen = require('./sequenceGenerator');
var express = require('express');
var router = express.Router();
var Message = require('../models/message');

router.get('/',(req,res,next) => {
   Message.find()
   .populate('sender')
   .then(messages => {
         res.status(200).json({
         message: 'messages fetched successfully!',
         messages: messages
      });
   })
   .catch(error => {
      res.status(500).json({
         message: 'An error occurred',
         error: error
      });
   });
});

// router.get('/:id',(req,res,next) => {
//    Message.findOne({
//       "id": req.params.id
//    })
//    .populate('group')
//    .then(message => {
//          res.status(200).json({
//          message: 'message fetched successfully!',
//          message: message
//       })
//    })
//    .catch(error=>{
//          res.status(500).json({
//          message:'An error occurred',
//          error:error
//       })
//    })
// })

router.post('/', (req, res, next) => {
const maxmessageId = seqGen.nextId("messages");

const message = new Message({
   id: maxmessageId,
   subject: req.body.subject,
   msgText: req.body.msgText,
   sender: req.body.sender
});

message.save()
   .then(createdMessage => {
      res.status(201).json({
      response: 'Message added successfully',
      newMessage: createdMessage
      });
   })
   .catch(error => {
      res.status(500).json({
         message: 'An error occurred',
         error: error
      });
   });
});

router.put('/:id', (req, res, next) => {
Message.findOne({ id: req.params.id })
   .then(message => {
      message.subject = req.body.subject;
      message.msgText = req.body.msgText;
      message.sender = req.body.sender;

      message.updateOne({ id: req.params.id }, message)
      .then(result => {
         res.status(204).json({
            message: 'message updated successfully'
         })
      })
      .catch(error => {
         res.status(500).json({
         message: 'An error occurred',
         error: error
         });
      });
   })
   .catch(error => {
      res.status(500).json({
      message: 'message not found.',
      error: { message: 'Message not found'}
      });
   });
});


router.delete("/:id", (req, res, next) => {
Message.findOne({ id: req.params.id })
   .then(message => {
      message.deleteOne({ id: req.params.id })
      .then(result => {
         res.status(204).json({
            message: "Message deleted successfully"
         });
      })
      .catch(error => {
         res.status(500).json({
         message: 'An error occurred',
         error: error
         });
      })
   })
   .catch(error => {
      res.status(500).json({
      message: 'Message not found.',
      error: { message: 'Message not found'}
      });
   });
});

module.exports = router; 