const Employee = require('../models/employee.model');
const {getDataFromRequestBody,createUUID} = require('../utils/utils');



//getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee

// @desc    Gets All Employees
// @route   GET /employees
async function getEmployees(req, res){
    try {
        const employees = await Employee.findAll();
        console.log(employees);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(employees));
    } catch (error) {
        console.log(error);
    }
}

// @desc    Gets Employee
// @route   GET /employees/:id
async function getEmployee(req, res, employeeId){
    try {
        const employee = await Employee.findById(employeeId);

        if(!employee) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Employee Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(employee))
        }
    } catch (error) {
        console.log(error);
    }
}


// @desc    Create Employee
// @route   POST /employees
async function createEmployee(req, res){
    try {
        const body = await getDataFromRequestBody(req);

        const {lastName,firstName,email,salary,jobTitle} = JSON.parse(body);

        const employee = { lastName, firstName, salary,email,jobTitle,employeeCode:'x'+createUUID(7),promoted:0 };

        const newEmployee = await Employee.create(employee);

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newEmployee))  
    } catch (error) {
        console.log(error);
    }
}

// @desc    Update a Employee
// @route   PUT /employees/:id
async function updateEmployee(req, res, id) {
    try {
        const employee = await Employee.findById(id)

        if(!employee) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Employee Not Found' }))
        } else {
            const body = await getDataFromRequestBody(req)

            const {lastName,firstName,email,salary,jobTitle,promoted} = JSON.parse(body);

            const employeeData = { lastName, firstName, salary,email,jobTitle,promoted};

            const updatedEmployee = await Employee.update(id, employeeData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updatedEmployee)) 
        }
 

    } catch (error) {
        console.log(error)
    }
}

// @desc    Delete Employee
// @route   DELETE /employee/:id
async function deleteEmployee(req, res, id) {
    try {
        const employee = await Employee.findById(id)

        if(!employee) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Employee Not Found' }))
        } else {
            await Employee.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Employee ${id} removed` }))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
}