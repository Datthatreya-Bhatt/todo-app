const mysql = require('mysql2');

require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

exports.getData = (req,res,next)=>{
    connection.query('SELECT * FROM tasks',
    (err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.send(result);
        };
    })
};


exports.postData = (req,res,next)=>{
    const {task,description,flag} = req.body;
    connection.query('INSERT INTO tasks (task,description,flag) VALUES (?,?,?)',
    [task,description,flag],
    (err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send('success');
        }
    })
};


exports.putData = (req,res,next)=>{
    const {id} = req.params;
    const {flag} = req.body; 
    console.log(id,flag);
    connection.query(`UPDATE tasks SET flag =${flag} WHERE id = ${id} `,
    (err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send('success');
        }
    })
};


exports.deletetData = (req,res,next)=>{
    const {id} = req.params;
    console.log(req.params);
    connection.query(`DELETE FROM tasks WHERE id = ${id} `,
    (err,result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            res.send('success');
        }
    });
};