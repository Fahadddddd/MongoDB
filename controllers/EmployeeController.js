const Employee = require('../models/Employee'); // Importing The Employee Model

// Function to Show the list of employee

const index = (req,res,next) => {
    Employee.find() // Return The List Of All Employees
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message : "An Error Occured!"
        })
    })
}

const show = (req,res,next) => {
    let employeeID = req.body.employeeID
    Employee.findById(employeeID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message:"An Error Occured"
        })
        
    })
}

// Function To Store New Employee Detail

const store = (req,res,next) => {
    let employee = new Employee({
        name: req.body.name,
        designation:req.body.designation,
        email:req.body.email,
        phone: req.body.phone,
        age : req.body.age
    })
    if(req.file)
    {
        employee.avatar = req.file.path
    }
    employee.save()

    .then(response =>{
        res.json({
            message:'Employee Added Successfully'
        })
    })
    .catch(error => {
        res.json({
            message:"An Error Occured"
        })
    })
}


// update employee function

const update = (req,res,next) => {
    let employeeID = req.body.employeeID;

    let updatedData = {
        name: req.body.name,
        designation:req.body.designation,
        email:req.body.email,
        phone: req.body.phone,
        age : req.body.age
    }

    Employee.findByIdAndUpdate(employeeID, {$set: updatedData})
    
    .then(response =>{
        res.json({
            message:'Employee updated Successfully'
        })
    })
    .catch(error => {
        res.json({
            message: "An Error Occured"
        })
    })
}

// Delete Employee Function

const destroy = (req,res,next) => {
    let employeeID = req.body.employeeID;
    Employee.findByIdAndRemove(employeeID)
    .then(() => {
        res.json({
            message:"Employee Deleted Sucessfully"
        })
    })
    .catch(() => {
        res.json({
            message:"An Error Occured"
        })
    })
}

// Exporting All The Functions

module.exports = {
    index,show,store,update,destroy
}