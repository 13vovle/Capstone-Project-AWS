const { ObjectID } = require("bson");
const employeeModel = require("../model/employee.model.js");
const validator = require("./validators");
const bcrypt = require('bcrypt');

let getAllEmpDetails = (req, res) => {
    employeeModel.find({}, (err, result) => {
        if (!err) {
            res.json(result);
        }
    });
}

let addEmployee = async (req, res) => {
    const hashedPassword = await bcrypt.hash("NewPass123", 10);
    let employee = new employeeModel({
        hashedPassword: hashedPassword,
        firstName: req.body.fName,
        lastName: req.body.lName,
        email: req.body.email,
        isAdmin: false
    });
    if (!validator.isLettersOnly(employee.firstName))
        throw 'First name must be provided and contains only letters'
    if (!validator.isLettersOnly(employee.lastName))
        throw 'Last name must be provided and contains only letters'
    if (!validator.isValidEmail(employee.email))
        throw 'Email is not valid';
    try {
        const employeeOne = await employee.save((err, result) => {
            if (!err) {
                res.send(employee.firstName + "'s info stored successfully");
            } else {
                res.send("Employee not added " + err);
            }
        });
    } catch (e) {
        console.log(e);
    }
};

let deleteEmployeeByID = (req, res) => {
    let empID = req.params.empID;
    employeeModel.deleteOne({ _id: empID }, (err, result) => {
        if (!err) {
            if (result.deletedCount > 0) {
                res.send("Employee record deleted successfully");
            } else {
                res.send("Employee record not present");
            }
        } else {
            res.send("Error " + err);
        }
    });
};

let updateEmployee = async (req, res) => {

    let empID = req.body._id;
    console.log(typeof (req.body.empID));
    let newPassword = req.body.hashedPassword;
    let isValidPassword = validator.isValidPassword(newPassword);
    if (isValidPassword) {
        newPassword = await bcrypt.hash(newPassword, 10);
        await employeeModel.updateOne({ _id: empID }, { $set: { hashedPassword: newPassword } }, (err, result) => {
            console.log(result)
            if (!err && result.nModified > 0) {
                res.status(200).json({"EmployeeFound":true});
            } else {
                console.log(err)
                res.status(422).json({"EmployeeFound":false});
            }
        })
    }
    else {
        res.status(422).json({"InvalidPassword":true});
    }

};

let getEmpByID = (req, res) => {
    let empID = req.params.ID;
    employeeModel.findOne({ _id: empID }, (err, result) => {
        if (!err) {
            res.json(result);
        }
        else {
            res.status(422).json({"EmployeeFound":false});
        }
    });
}

module.exports = { getAllEmpDetails, addEmployee, deleteEmployeeByID, updateEmployee, getEmpByID };