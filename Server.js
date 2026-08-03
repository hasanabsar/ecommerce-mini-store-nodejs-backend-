const express = require('express');
const mongoose = require('mongoose');
const app = express()
const port = 3000
const cors = require("cors")

app.use(express.json())

app.use(cors())

app.use(
    cors({
         origin: "http://localhost:5173",
        credentials: true,
    })
)

mongoose.connect("mongodb://localhost:27017/ministore")
.then(()=>{
    console.log("MongoDB Connected");
})

.catch((error)=>{
    console.log("error");
})

const userSchema = new mongoose.Schema({

    fullname: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    },
},
    {
        timestamps: true
    }
);

const User = mongoose.model("user", userSchema);
   
    app.post('/register', async (req, res)=>{
        try {

            const user = await User.create(req.body);
            res.status(201).json({
                message: "Data Added Successfully",
                user: user
            })
            
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    })


    // ===LOGIN====

    app.post('/login', async (req, res)=>{
        try {

            const {email, password} = req.body;

            const user = await User.findOne({email: email});

            if(!user){
                return res.status(404).json({
                    message: "user Not Found"
                })
            }

            if(user.password !== password){
                 return res.status(401).json({
                    message: "Password Incorrect"
                })
            }

            res.status(201).json({
                message: "Login Successfully",
                user: user
            })
            
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    })


    // ===FEEDBACK====


    const feedbackSchema = new mongoose.Schema({

    fullname: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true
    },

    message: {
        type: String,
        require: true
    },
},
    {
        timestamps: true
    }
);

const Feedback = mongoose.model("feedback", feedbackSchema);
   
    app.post('/feedback', async (req, res)=>{
        try {

            const feedback = await Feedback.create(req.body);
            res.status(201).json({
                message: "Data Added Successfully",
                feedback: feedback
            })
            
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    })




//  app.get('/', (req, res) => {
//   res.send('Successfully')
// })

app.listen(port, () => {
    console.log(`Express Runing`)
})




// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.use(express.json())

// let allStudent = []

// app.post("/students", (req, res) => {

//     const student = {
//         id: allStudent.length + 1,
//         name: req.body.name,
//         course: req.body.course
//     }

//     allStudent.push(student)

//     res.json({

//         message: "Student Added Successfully",
//         student: allStudent
//     })

    
// })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })



// app.put('/students/:id', (req, res) => {

//     const student = allStudent.find(
//         s => s.id == req.params.id)

//     if (!student) {
//         return res.send("Student Not Found")
//     }

//     student.name = req.body.name;
//     student.course = req.body.course;


//     res.json({

//         message: "Student UpDate Successfully",
//         student: allStudent
//     })

//      app.get('/students', (req, res) => {
//         res.send(allStudent)
//     })
// })
