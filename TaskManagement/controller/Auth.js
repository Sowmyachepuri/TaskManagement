const express = require("express");
const { models } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./../models/User");
const Task = require("./../models/Task");
// const lib1 = require("./../middleware1/email");
const otpGenerator = require("otp-generator");
const date = require("date-and-time");
const TaskManagement = require("./../models/TaskAssignment");
const Role = require("./../models/Role");
const Admin = require("./../models/Admin");

const dotenv = require("dotenv").config();

exports.Signup = async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        confirmPassword,
        country,
        city,
        image,
        phoneNumber,
        gender,
        userType,
        role
      } = req.body;
  
      const userEmailData = await User.findOne({ Email: email });
      const userPhoneData = await User.findOne({ PhoneNumber: phoneNumber });
  
      if (userEmailData) {
        return res.status(401).json({ message: "User already exists with this email Id" });
      } else if (userPhoneData) {
        return res.status(401).json({ message: "Phone number already exists, try with another number" });
      } else if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
  
      const otp = otpGenerator.generate(8, {
        digits: true,
        alphabets: false,
        upperCase: false,
        specialChars: false,
      });
  
      const bcryptPassword = await bcrypt.hash(password, 7);
  
      let date1 = new Date();
      let now = date.format(date1, "YYYY-MM-DDTHH:mm:ss");
  
      let userProps = {
        Otp: otp,
        Email: email,
        Password: bcryptPassword,
        PhoneNumber: phoneNumber,
        Username: name,
        City: city,
        Country: country,
        Gender: gender,
        Image: image,
      };
  
      if (userType === "Admin") {
        userProps.Active = 1;
        const user = new User(userProps);
        const savedUser = await user.save();
        if (savedUser) {
          const newAdmin = new Admin({
            Email: email,
            PhoneNumber: phoneNumber,
            Active: 1,
            Username: name,
            City: city,
            Country: country,
            Gender: gender,
            Image: image,
            Admin_adminId: savedUser._id
          });
          const savedAdmin = await newAdmin.save();
          if (savedAdmin) {
            return res.status(200).json({ message: "User and Admin created successfully", userDetails: savedUser, AdminDetails: savedAdmin });
          } else {
            return res.status(400).json({ message: "Admin not created" });
          }
        } else {
          return res.status(400).json({ message: "User not created" });
        }
      } else {
        userProps.Active = 0;
        userProps.Role=role;
        const user = new User(userProps);
        const savedUser = await user.save();
        if (savedUser) {
          return res.status(200).json({ message: "User created successfully", userDetails: savedUser });
        } else {
          return res.status(400).json({ message: "User not created" });
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

exports.VerifyOTP = async (req, res) => {
    try {
      const { otp, email } = req.body;
      if (!otp || !email) {
        return res.status(400).json({ message: "Invalid request, OTP and email are required" });
      }
      const findUser = await User.findOne({ Email: email });
  
      if (!findUser) {
        return res.status(404).json({ message: "User not found" });
      }
      if (findUser.Otp === otp) {
        findUser.Active = 1; 
        await findUser.save(); 
  
        return res.status(200).json({ message: "OTP matched", UserDetails: [findUser] });
      } else {
        return res.status(400).json({ message: "Invalid OTP" });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

exports.Login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ Email: email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const isEqual = await bcrypt.compare(password, user.Password);
  
      if (!isEqual) {
        return res.status(400).json({ message: "Wrong password!" });
      }
  
      const token = jwt.sign(
        { email: user.Email, userId: user._id.toString() },
        process.env.TOKEN_KEY,
        { expiresIn: "24h" }
      );
  
      const updatedUser = await User.findOneAndUpdate(
        { Email: email },
        { $set: { Token: token } },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(500).json({ message: "Failed to update token in the database" });
      }
  
      if (user.Active === 0) {
        return res.status(400).json({ message: "OTP not verified" });
      } else if (user.UserType === "Admin" && user.Active === 1) {
        const admin = await Admin.findOne({ Email: email, Active: 1 });
        if (admin) {
          return res.status(200).json({ token: token, userDetails: user, adminDetails: admin });
        } else {
          return res.status(400).json({ message: "Admin not found" });
        }
      } else {
        return res.status(200).json({ token: token, userDetails: updatedUser });
      }
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  


  


