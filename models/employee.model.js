const connection = require('./database');

function findById(id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM employees WHERE id = ?`,id, (err, res)=>{
            if (err) {
                reject(err, null);
            }

            if (res.length) {
                resolve(res[0]);
            }

            resolve(null);     
        });
    });
}

function findAll() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM employees`, (err, res)=>{
            if (err) {
                reject(err, null);
            }
            resolve(res);     
        });
    });
}

function create(employee) {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO employees(`lastName`,`firstName`,`employeeCode`,`email`,`salary`,`jobTitle`,`promoted`) VALUES (?,?,?,?,?,?,?)";
        const values = [employee.lastName,employee.firstName,employee.employeeCode,employee.email,employee.salary,employee.jobTitle,employee.promoted];
        connection.query(sql, values, (err, res)=>{
            if (err) {
                reject(err);
            }
            resolve({ id: res.insertId, employeeCode:values[2],  ...employee });
        });
    });
}

function update(id, employee) {
    return new Promise((resolve, reject) => {
        const sql =  "UPDATE employees SET lastName = ?, firstName = ?, email = ?, salary = ?, jobTitle = ?, promoted = ? WHERE id = ?";
        const values = [employee.lastName,employee.firstName,employee.email,employee.salary,employee.jobTitle,employee.promoted,id];
        connection.query(sql, values, (err, res)=>{
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}

function remove(id) {
    return new Promise((resolve, reject) => {
        connection.query("DELETE FROM employees WHERE id = ?", id, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve();
          });
    });
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}