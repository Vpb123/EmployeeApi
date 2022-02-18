const e = require("express");
const express= require("express");
const router = express.Router();
// const Employee = require("../services/employee")
const sql= require("../services/db");
const messages=require("../services/messages");

/*Create Employee Table if Not Exists*/
router.get('/create', async(req, res)=>{
      const tableQuery = `CREATE TABLE IF NOT EXIST employee (       
        EmployeeID INT AUTO_INCREMENT PRIMARY KEY,
        FirstName VARCHAR(255) NOT NULL,
        LastName VARCHAR(255),
        Designation VARCHAR(255) DEFAULT 'Software Intern',
        JOB_ID INT UNSIGNED,
        hired_date DATETIME DEFAULT CURRENT_TIMESTAMP
      )`;
      await sql.query(tableQuery, (err) =>{
          if(err){
              res.send(err);
          }else{
              res.json({
                  confirmation:"Success",
                  message:messages.created,
              });
          }
      });
});

/* Get list of all the Employees */
router.get('/employee', async(req,res) => {
    try{
        const getQuery="SELECT * FROM employee ";
        await sql.query(getQuery, (err, result) =>{
            if(err){ 
                throw err
            };
           res.send(result);
        });
 
    }catch(err){

     res.status(400).send(err);
    }
});

/*Get a particular employee using id*/
router.get('/employee/:id', async(req, res) =>{
    const employeeById = `SELECT * FROM employee where EmployeeID = ${req.params.id}`;
    await sql.query(employeeById, (err, result) =>{
        if(err){
            res.status(400).send(err);
        }
        else{
            res.status(200).send(result);
        }
    });
 });

 /*Create a new Employee record. ? is placeholder */
router.post('/employee', async(req, res) =>{
   const create = 'INSERT INTO employee SET ?';
   await sql.query(create, req.body, (err, result) =>{
       if(err){
           res.status(500).send(err);
       }else{
           res.json({
            message:messages.added,
            result:result
           });
       }
   });
});

/*Partially update the employee record using id */
router.patch('/employee/:id', async(req, res) =>{
    const updateQuery = `UPDATE employee SET ? WHERE EmployeeID = ${req.params.id}`;
    await sql.query(updateQuery, req.body, (err, result) =>{
        if(err){
            res.status(500).send(err);
        }else{
            res.json({
             message:messages.updated,
             result:result
            });
        }
    });
 });

 /*Delete the employee record using EmployeeID */
 router.delete('/employee/delete/:id', async(req, res) =>{
    const deleteQuery = `DELETE FROM employee WHERE EmployeeID = ${req.params.id}`;
    await sql.query(deleteQuery, (err) =>{
        if(err){
            res.status(500).send(err);
        }else{
            res.json({
             message:messages.delete(req.params.id),
            });
        }
    });
 });

 /*Delete all the record of Employee*/
 router.delete('/employee/delete/', async(req, res) =>{
    const deleteAll = `DELETE FROM employee`;
    await sql.query(deleteAll, (err) =>{
        if(err){
            res.status(500).send(err);
        }else{
            res.json({
             message:messages.allDeleted,
            });
        }
    });
 });
 
module.exports=router;