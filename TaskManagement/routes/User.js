const express = require('express');
const UserController = require("../controller/User"); 
const router = express.Router();
const isAuth = require('../middleware/is-auth')

//Users
router.post('/getUser',isAuth,UserController.getUser);
router.post('/getAllUsers',UserController.getAllUsers);
router.post('/editUser', UserController.editUser);
router.post('/deleteUser', UserController.deleteUser);

//Admins
router.post('/getAdmin', UserController.getAdmin);
router.post('/editAdmin', UserController.editAdmin);
router.post('/deleteAdmin', UserController.deleteAdmin);
router.post('/getAllAdmins',UserController.getAllAdmins);

//Task
router.post('/CreateTask',UserController.CreateTask)
router.post('/editTask',UserController.editTask)
router.post('/deleteTask',UserController.deleteTask)
router.post('/getTask',UserController.getTask)
router.post("/getAllTasks",UserController.getAllTasks)

//
router.post("/createRole",UserController.createRole)
router.post("/getUsersBasedonRoles",UserController.getUsersBasedonRoles)
router.post("/taskAssignment",UserController.taskAssignment)
router.post("/getAssignedUsers",UserController.getAssignedUsers)



module.exports = router;
