require('dotenv').config()
const express = require("express")
const path =  require("path")
const bcrypt = require("bcrypt")
const sqlite3 = require('sqlite3')
const {open} = require('sqlite')
const jwt = require("jsonwebtoken");
const cors = require("cors");



const app = express()
app.use(express.json())
app.use(cors())

const dbPath = path.join(__dirname, 'database.db')
let db = null

const initailizeDBServer = async () => {

 try {

    db = await open({
        filename:dbPath,
        driver:sqlite3.Database,
      });

 

      
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
    

 } catch(e){
    console.log(`DB Error: ${e.message}`)
    process.exit(1);
 }

};

initailizeDBServer()


// Middleware for JWT Verification 




const authenticateToken = (request, response, next)=> {

    let jwtToken ;  
    let authHeader = request.headers["authorization"]; 
    
    if(authHeader !== undefined){
        jwtToken = authHeader.split(" ")[1];
    }
     if (jwtToken === undefined){
        
        response.status(401)
        response.send("Invalid Access Token");
    
     }
     else{
        jwt.verify(jwtToken, process.env.JWT_SECRET || 'MY_SECRET_TOKEN', async (error, payload)=>{
         if(error){
            response.status(401)
            response.send("Invalid Access Token");
         }
         else {
            request.username = payload.username;
            next();
    
            
         }
        } );
     }
    

    
};



// Register API 

app.post('/users', async (request, response) => {
    const { username, password, role } = request.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const selectUserQuery = `SELECT * FROM users WHERE username = '${username}'`;
    const dbUser = await db.get(selectUserQuery);

    if (dbUser === undefined) {
        const createUserQuery = `
        INSERT INTO 
          users (username, password, role)
          VALUES 
          ('${username}', '${hashedPassword}', '${role}')`;
        const dbResponse = await db.run(createUserQuery);
        const newUserId = dbResponse.lastID;
        response.send(`Created new user with ID ${newUserId}`);
    } else {
        response.status(400);
        response.send("User Already Exists");
    }
});




// Login api

app.post('/login',async (request, response) => {

const {username, password} = request.body;
const selectUserQuery = `SELECT * FROM users WHERE username = '${username}'`;
const dbUser = await db.get(selectUserQuery);
if (dbUser === undefined){
    response.status(400)
    response.send("Invaild User")
}else{
    const isPasswordMatch = await bcrypt.compare(password, dbUser.password)
    if (isPasswordMatch === true){
     const payload = {username: username};
    const jwtToken =  jwt.sign(payload, process.env.JWT_SECRET || "MY_SECRET_TOKEN") 

        response.send({jwtToken});
    }else{
        response.status(400)
        response.send("Invalid Password")
    }
}  

    
});


// Student get api

app.get('/students',  authenticateToken, async (request, response)=>{
    
    const getStudentsQuery = `
    
    SELECT
    *
    FROM 
    students 
    ORDER BY 
    student_id;`
    const studentsArray = await db.all(getStudentsQuery);
    response.send(studentsArray)    



});

// Student post api

app.post('/students', authenticateToken, async(request, response) => {
    const studentDetails = request.body 
    const {name, grade, userId} = studentDetails

    const addStudentQuery = `
    
    INSERT INTO 
       students (name, grade, user_id)
       VALUES 
       (
       '${name}',
       '${grade}',
        '${userId}'
       ); `;



const dbResponse = await db.run(addStudentQuery)
const studentId = dbResponse.lastID;
 response.send({studentId:studentId}) 



});


// Student put api

app.put('/students/:studentId',authenticateToken, async(request,response) => {
    const{ studentId} = request.params;
    const studentDetails = request.body;
    const {name, grade, userId} = studentDetails;
    
    const updateStudentQuery = `
    
    UPDATE 
     students
     SET  
     name = '${name}',
     grade = '${grade}',
     user_id = '${userId}'
     WHERE 
     student_id = ${studentId}; `;
      await db.run(updateStudentQuery)
      response.send("Student Updated Successfully")

});



// Student delete api

app.delete('/students/:studentId',authenticateToken, async(request, response) => {

const {studentId} = request.params;
const deleteStudentQuery = `

DELETE FROM 
students 
WHERE 
student_id = ${studentId};`; 
 await db.run(deleteStudentQuery)
 response.send("Student Deleted Successfully")

} )



// Teachers get api


app.get('/teachers',  authenticateToken, async (request, response)=>{
    
          
            const getTeachersQuery = `

            SELECT
            *
            FROM 
            teachers 
            ORDER BY 
            teacher_id;`
            const teachersArray = await db.all(getTeachersQuery);
            response.send(teachersArray)





});


// Teachers  post api 


app.post('/teachers', authenticateToken,async (request, response) => {
    const teacherDetails = request.body 
    const {name, subject, userId} = teacherDetails

    const addTeacherQuery = `
    
    INSERT INTO 
       teachers (name, subject, user_id)
       VALUES 
       (
       '${name}',
       '${subject}',
        '${userId}'
       ); `;



const dbResponse = await db.run(addTeacherQuery)
const teacherId = dbResponse.lastID;
 response.send({teacherId:teacherId}) 



});

// Teachers put  api

app.put('/teachers/:teacherId',authenticateToken, async(request,response) => {
    const{ teacherId} = request.params;
    const teacherDetails = request.body;
    const {name, subject, userId} = teacherDetails;
    
    const updateTeacherQuery = `
    
    UPDATE 
     teachers
     SET  
     name = '${name}',
     subject = '${subject}',
     user_id = '${userId}'
     WHERE 
     teacher_id = ${teacherId}; `;
      await db.run(updateTeacherQuery)
      response.send("Teacher Updated Successfully")

});
   

// Teachers delete api
 
app.delete('/teachers/:teacherId', authenticateToken, async(request, response) => {

const {teacherId} = request.params;
const deleteTeacherQuery = `

DELETE FROM 
teachers
WHERE 
teacher_id = ${teacherId};`; 
 await db.run(deleteTeacherQuery)
 response.send("Teacher Deleted Successfully")

} ) 