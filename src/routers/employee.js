const express= require("express");
const router = express.Router();
// const Employee = require("../services/employee")
const sql= require("../services/db");
const messages=require("../services/messages");

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