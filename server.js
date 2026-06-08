const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Database Connection

db.connect((err) => {

    if(err){

        console.log(err);

    }else{

        console.log("Database Connected");

    }

});

// ADD STUDENT

app.post("/add", (req,res)=>{

    const {name,email,course} = req.body;

    db.query(

        "INSERT INTO students(name,email,course) VALUES(?,?,?)",

        [name,email,course],

        (err,result)=>{

            if(err) throw err;

            res.send("Student Added");

        }

    );

});

// GET ALL STUDENTS

app.get("/students",(req,res)=>{

    db.query(

        "SELECT * FROM students",

        (err,result)=>{

            if(err) throw err;

            res.json(result);

        }

    );

});

// UPDATE STUDENT

app.put("/update/:id",(req,res)=>{

    const {name,email,course} = req.body;

    db.query(

        "UPDATE students SET name=?, email=?, course=? WHERE id=?",

        [name,email,course,req.params.id],

        (err,result)=>{

            if(err) throw err;

            res.send("Student Updated Successfully");

        }

    );

});

// DELETE STUDENT

app.delete("/delete/:id",(req,res)=>{

    db.query(

        "DELETE FROM students WHERE id=?",

        [req.params.id],

        (err,result)=>{

            if(err) throw err;

            res.send("Student Deleted");

        }

    );

});

// SERVER

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});