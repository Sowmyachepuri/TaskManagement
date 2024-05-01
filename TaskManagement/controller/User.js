const User = require("./../models/User");
const Admin = require("./../models/Admin");
const Task = require("./../models/Task");
const Role = require("./../models/Role");
const TaskAssignment = require("./../models/TaskAssignment");

exports.getUser = async (req, res) => {
    const { userId } = req.body;
    try {
        const findUser = await User.findOne({ _id: userId, Active: 1 });
        if (findUser) {
            return res.status(200).json({ message: "User found", findUser });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.editUser = async (req, res) => {
    try {
        const {
            name,
            country,
            city,
            image,
            phoneNumber,
            gender,
            userId
        } = req.body;
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId, Active: 1 },
            {
                $set: {
                    Username: name,
                    Country: country,
                    City: city,
                    Image: image,
                    Gender: gender,
                    PhoneNumber: phoneNumber
                }
            },
            { new: true }
        );

        if (updatedUser) {
            return res.status(200).json({ message: "Updated successfully", user: updatedUser });
        } else {
            return res.status(404).json({ message: "User not found or not updated" });
        }
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const{userId} = req.body 
        const findUser = await User.findOne({_id:userId,Active:1})
        if(findUser){
            const required = await User.findOneAndUpdate({_id:userId},{
                Active:0
            },{new:true})
            if(required){
                return res.status(200).json({message:"User Deleted",required})
            }
            else{
                return res.status(200).json({message:"User not deleted"})
            }
        }
        else{
            return res.status(404).json({message:"User not found"})
        }
        
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getAllUsers = async(req,res)=>{
    const required = await User.find({Active:1})
    if(required.length>0){
        return res.status(200).json({message:"All Users",required})
    }
    else {
        return res.status(400).json({message:"Users doesn't exist"})
    }

}

exports.getAdmin = async (req, res) => {
    const { userId } = req.body;
    try {
        const findUser = await User.findOne({ _id: userId, Active: 1 });
        if (findUser) {
           const findAdmin = await Admin.findOne({Admin_adminId:userId,Active:1})
           if(findAdmin){
            return res.status(200).json({message:"Admin",findAdmin})
           }
           else{
            return res.status(404).json({ message: "Admin not found" });
           }
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.editAdmin = async (req, res) => {
    try {
        const {
            name,
            country,
            city,
            image,
            phoneNumber,
            gender,
            userId
        } = req.body;
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId, Active: 1 },
            {
                $set: {
                    Username: name,
                    Country: country,
                    City: city,
                    Image: image,
                    Gender: gender,
                    PhoneNumber: phoneNumber
                }
            },
            { new: true }
        );

        if (updatedUser) {
            const updatedAdmin = await Admin.findOneAndUpdate(
                { Admin_adminId: userId, Active: 1 },
                {
                    $set: {
                        Username: name,
                        Country: country,
                        City: city,
                        Image: image,
                        Gender: gender,
                        PhoneNumber: phoneNumber
                    }
                },
                { new: true }
            );
            if(updatedAdmin){
                return res.status(200).json({message:"Admin updated", updatedAdmin})
            }
            else{
                return res.status(400).json({ message: "Admin not updated" });
            }
           
        } else {
            return res.status(404).json({ message: "User not found or not updated" });
        }
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        const{userId} = req.body 
        const findUser = await User.findOne({_id:userId,Active:1})
        if(findUser){
            const required = await User.findOneAndUpdate({_id:userId},{
                Active:0
            },{new:true})
            if(required){
                const findAdmin = await Admin.findOneAndUpdate({Admin_adminId:userId,Active:1},{
                  Active:0  
                },
                {new:true})
                if(findAdmin){
                    return res.status(200).json({message:"Admin Deleted",findAdmin})
                }
                else{
                    return res.status(200).json({message:"Admin not deleted"})
                } 
            }
            else{
                return res.status(200).json({message:"User not deleted"})
            }
        }
        else{
            return res.status(404).json({message:"User not found"})
        }
        
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getAllAdmins = async(req,res)=>{
    const required = await Admin.find({Active:1})
    if(required.length>0){
        return res.status(200).json({message:"All Admins",required})
    }
    else {
        return res.status(400).json({message:"Admins doesn't exist"})
    }

}

exports.CreateTask = async (req, res) => {
    const { title, description, status, dueDate,adminId,role } = req.body;
    try {
        const findTask = await Task.findOne({ Title: title });
        const findAdmin = await Admin.findOne({Admin_adminId:adminId,Active:1})
        if(findAdmin){
            if (findTask) {
                return res.status(400).json({ message: "Task already created" });
            } else {
                const newTask = new Task({
                    Title: title,
                    Description: description,
                    Status: status,
                    DueDate: dueDate,
                    AdminId:adminId,
                    Role:role
                });
                const createdTask = await newTask.save();
                return res.status(201).json({ message: "Task Created", createdTask });
            }

        }
        else{
            return res.status(404).json({message:"Admin not found"})
        }
        
    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.editTask = async (req, res) => {
    const { title, description, status, dueDate, taskId,adminId } = req.body;
    try {
        const findTask = await Task.findOne({ _id: taskId, Status: "Active" });
        const findAdmin = await Admin.findOne({Admin_adminId:adminId,Active:1})
        if(findAdmin){
            if (findTask) {
                const updatedTask = await Task.findOneAndUpdate(
                    { _id: taskId },
                    {
                        Title: title,
                        Description: description,
                        Status: status,
                        DueDate: dueDate
                    },
                    { new: true }
                );
                if (updatedTask) {
                    return res.status(200).json({ message: "Task updated", updatedTask });
                } else {
                    return res.status(400).json({ message: "Task not updated" });
                }
            } else {
                return res.status(404).json({ message: "Task not found or inactive" });
            }
        }
        else{
            return res.status(404).json({meassgae:"Admin not found"})
        }
    } catch (error) {
        console.error("Error editing task:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.deleteTask = async(req,res)=>{
    const {taskId} = req.body
    try {
        const findTask = await Task.findOne({ _id: taskId, Status: "Active" });
        if (findTask) {
            const updatedTask = await Task.findOneAndUpdate(
                { _id: taskId },
                {
                    Status: "InActive",
                },
                { new: true }
            );
            if (updatedTask) {
                return res.status(200).json({ message: "Task deleted", updatedTask });
            } else {
                return res.status(400).json({ message: "Task not deleted" });
            }
        } else {
            return res.status(404).json({ message: "Task not found or inactive" });
        }
    } catch (error) {
        console.error("Error deleting task:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

exports.getTask = async(req,res)=>{
    const {taskId} = req.body 
    const findTask = await Task.findOne({_id:taskId,Status:"Active"})
    if(findTask){
        return res.status(200).json({message:"Required Task", findTask})
    }
    else{
        return res.status(400).json({message:"Task not found"}) 
    }

}

exports.getAllTasks = async(req,res)=>{
    const findAllTasks = await Task.find({Status:"Active"})
    if(findAllTasks.length >0){
        return res.status(200).json({message:"AllTasks", findAllTasks})
    }
    else{
        return res.status(200).json({message:"No Tasks Created"})
    }
        
}

exports.createRole = async (req, res) => {
    const { roleName, adminId } = req.body;

    try {
        const findRole = await Role.findOne({ RoleName: roleName, Status: "Active" });
        if (findRole) {
            return res.status(400).json({ message: "This Role already exists" });
        }

        const findAdmin = await Admin.findOne({ Admin_adminId: adminId, Active: 1 });
        if (!findAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const newRole = new Role({
            RoleName: roleName,
            Status: "Active",
            AdminId: adminId
        });
        const createdRole = await newRole.save();
        if (createdRole) {
            return res.status(201).json({ message: "Role created", newRole: createdRole });
        } else {
            return res.status(500).json({ message: "Failed to create role" });
        }
    } catch (error) {
        console.error("Error creating role:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


exports.getUsersBasedonRoles = async(req,res)=>{
    const{role,roleId} = req.body 
    const findRole=await Role.findOne({Status:"Active",_id:roleId})
    if(findRole){
        const findUsers = await User.find({Role:role,Active:1})
        if(findUsers.length>0){
            return res.status(200).json({message:"Role based Users",findUsers})
        }
        else{
            return res.status(400).json({message:"Users based on given role doesn't exists"})
        }
        
    }
    else{
        return res.status(400).json({message:"Role not found"})
    }

}

exports.taskAssignment = async (req, res) => {
    const { userId, taskId, adminId, date } = req.body;

    try {
        const findTask = await Task.findOne({ _id: taskId, AdminId: adminId, Status: "Active" });
        if (!findTask) {
            return res.status(400).json({ message: "Task does not exist or is inactive" });
        }

        const findUser = await User.findOne({ _id: userId, Active: 1 });
        if (!findUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (findTask.Role !== findUser.Role) {
            return res.status(403).json({ message: "User's role does not match task's role" });
        }

        const findAssignments = await TaskAssignment.find({ TaskId: taskId, Status: "Active" });
        for (let assignment of findAssignments) {
            if (assignment.UserIds.includes(userId)) {
                return res.status(400).json({ message: "This user is already assigned to this task" });
            }
        }

        const assignedTask = new TaskAssignment({
            TaskId: taskId,
            UserIds: [userId],
            AssignedDate: date,
            AdminId: adminId,
            Role: findTask.Role,
            Status: "Active"
        });

        const savedAssignment = await assignedTask.save();
        if (savedAssignment) {
            return res.status(200).json({ message: "Task assigned", assignedTask: savedAssignment });
        } else {
            return res.status(400).json({ message: "Task not assigned" });
        }
    } catch (error) {
        console.error("Error assigning task:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// exports.getAssignedUsers = async(req,res)=>{
//     const{role} = req.body
//     let requiredUsers = [];
//     const findUsers = await TaskAssignment.find({Role:role,Status:"Active"})
//     if(findUsers.length>0){
//         for (let i of findUsers){
//             if(i.UserIds.length>0){
//                 for (let j of i.UserIds){
//                     const findUser = await User.findOne({_id:j,Active:1})
//                     requiredUsers.push(findUser)
//                 }
//             }
//         }
//         if(requiredUsers.length>0){
//            return res.status(200).json({message:"assigned Userts",requiredUsers})
//         }
//         else{
//             return res.status(400).json({message:"no one assigned for this task"})
//         }
//     }

//     else{
//         return res.status(400).json({message:"no one assigned for this task"})
//     }
// }

exports.getAssignedUsers = async (req, res) => {
    const { role } = req.body;

    try {
        const findUsers = await TaskAssignment.find({ Role: role, Status: "Active" });

        let requiredUsers = [];
        for (let assignment of findUsers) {
            if (assignment.UserIds.length > 0) {
                for (let userId of assignment.UserIds) {
                    const findUser = await User.findOne({ _id: userId, Active: 1 });
                    if (findUser) {
                        requiredUsers.push(findUser);
                    }
                }
            }
        }
        if (requiredUsers.length > 0) {
            return res.status(200).json({ message: "Assigned users", requiredUsers });
        } else {
            return res.status(404).json({ message: "No users assigned for this task" });
        }
    } catch (error) {
        console.error("Error fetching assigned users:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};











