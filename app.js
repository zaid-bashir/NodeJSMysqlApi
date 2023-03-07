const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//MySQL Code Here
const pool = mysql.createPool(
    {
        connectionLimit : 10,
        host : "localhost",
        user : "root",
        password : "",
        database : "nodejsmysql"
    }
);

//Get Data From the Database
app.get('',(req,res)=>{
    pool.getConnection((err,connection) => {
        if(err){
            throw Error("Failed to Connect to Database");
        }else{
            console.log(`Connected To Database Pool with ThreadId : ${connection.threadId}`);
            //After Connected to Database Now Fire the Query To Database to Fetch Data
            connection.query("SELECT * FROM entities",(err,rows)=>{
                connection.release();
                if(!err){
                    res.send(rows);
                }else{
                    console.log(`Error Occored ${err
                    }`);
                }
            });
        }
    });
});

//Get Data From the Database using Id
app.get('/:id',(req,res)=>{
    
    pool.getConnection((err,connection) => {
        if(err){
            throw Error("Failed to Connect to Database");
        }else{
            console.log(`Connected To Database Pool with ThreadId : ${connection.threadId}`);
            //After Connected to Database Now Fire the Query To Database to Fetch Data
            connection.query("SELECT * FROM entities WHERE id = ?", req.params.id ,(err,rows)=>{
                connection.release();
                if(!err){
                    res.send(rows);
                }else{
                    console.log(`Error Occored ${err
                    }`);
                }
            });
        }
    });
});

//Delete Data From the Database using Id
app.delete('/:id',(req,res)=>{
    
    pool.getConnection((err,connection) => {
        if(err){
            throw Error("Failed to Connect to Database");
        }else{
            console.log(`Connected To Database Pool with ThreadId : ${connection.threadId}`);
            //After Connected to Database Now Fire the Query To Database to Fetch Data
            connection.query("DELETE FROM entities WHERE id = ?", req.params.id ,(err,rows)=>{
                connection.release();
                if(!err){
                    res.send(
                        {
                            "message" : "Record Deleted Successfully..."
                        }
                    );
                }else{
                    console.log(`Error Occored ${err
                    }`);
                }
            });
        }
    });
});

//Add Data in the Database.
app.post('',(req,res)=>{
    const data = req.body;
    pool.getConnection((err,connection) => {
        if(err){
            throw Error("Failed to Connect to Database");
        }else{
            console.log(`Connected To Database Pool with ThreadId : ${connection.threadId}`);
            //After Connected to Database Now Fire the Query To Database to Fetch Data
            connection.query("INSERT INTO entities SET ?", data ,(err,rows)=>{
                connection.release();
                if(!err){
                    res.send(
                        {
                            "message" : `Record Added Successfully...`,
                            "data" : data,
                        }
                    );
                }else{
                    console.log(`Error Occored ${err
                    }`);
                }
            });
        }
    });
});

//Update Data in the Database.
app.put('',(req,res)=>{
    const data = req.body;
    const {id,name,tagline,description,image} = data;
    pool.getConnection((err,connection) => {
        if(err){
            throw Error("Failed to Connect to Database");
        }else{
            console.log(`Connected To Database Pool with ThreadId : ${connection.threadId}`);
            //After Connected to Database Now Fire the Query To Database to Fetch Data
            connection.query("UPDATE entities SET name = ? , tagline = ? , description = ? , image = ? WHERE id = ?", [name,tagline,description,image,id] ,(err,rows)=>{
                connection.release();
                if(!err){
                    res.send(
                        {
                            "message" : `Record Updated Successfully...`,
                            
                        }
                    );
                }else{
                    console.log(`Error Occored ${err
                    }`);
                }
            });
        }
    });
});

app.listen(port,()=>{
    console.log("Server Listening on http:localhost:8000/");
});