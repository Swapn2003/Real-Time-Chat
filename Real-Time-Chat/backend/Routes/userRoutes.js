const express = require('express');
const multer  = require('multer');


const router = express.Router();
const { registerUser,authUser,allUsers,addContact,accessContacts,accessRecipients,addMessage,accessMessage,getName,addMember,addFile} = require("../controllers/userControllers");
router.route('/').post(registerUser).get(allUsers);
router.post('/login',authUser);
router.route('/contacts/addContact').put(addContact);
router.route('/contacts/accessContacts').get(accessContacts);
router.route('/message/accessRecipients').get(accessRecipients);
router.put('/message/addMessage',addMessage);
router.put('/message/addFile',addFile);
router.route('/message/accessMessage').get(accessMessage);
router.route('/contacts/getName').get(getName);
router.route('/contacts/addMember').put(addMember);

module.exports = router;
