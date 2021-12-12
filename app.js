const http = require('http');

// @desc Our Employee Api routes
const { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee } = require('./controllers/employee.controller');

const server = http.createServer((req, res)=>{
    if(req.url === '/employees' && req.method === 'GET'){
        getEmployees(req,res);
    }else if(req.url.match(/\/employees\/\w+/) && req.method === 'GET'){
        const employeeId = req.url.split('/')[2];
        getEmployee(req,res, employeeId);
    }else if(req.url === '/employees' && req.method === 'POST'){
        createEmployee(req,res);    
    }else if(req.url.match(/\/employees\/\w+/) && req.method === 'PUT'){
        const employeeId = req.url.split('/')[2];
        updateEmployee(req,res, employeeId);
    }else if(req.url.match(/\/employees\/\w+/) && req.method === 'DELETE'){
        const employeeId = req.url.split('/')[2];
        deleteEmployee(req,res, employeeId);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Api doesn't support endpoint" }));
    }
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`);});

module.exports = server;