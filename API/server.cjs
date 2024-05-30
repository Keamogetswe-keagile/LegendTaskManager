const express = require("express");
const session = require("express-session")
const cors = require("cors")
const mysql = require("mysql")
const http = require('http')
const events = require('events')
const app = express()

const authenticateEmitter = new events.EventEmitter()
function assignVariable(req, res, variable, value) {
    req[variable] = value
}


app.use(cors())
app.use(session(
    {
        secret: "dasfdasfasf",
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    }
))
//Create connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "taskmanager"
})
db.connect((error) => {
    if (error) {
        throw new Error("Connection could not be establlished")
    }
    console.log("Connection was successfull")
})
app.get('/', (request, response) => {
    //Persits our session ids
    if (!request.session.employeeNum) {
        response.json({
            status: 'visiter'
        })
    }
    db.query(`SELECT email, name, surname 
        FROM employees 
        WHERE employeeNum = ${request.session.employeeNum}`,
        (error, result) => {
            (!response.headersSent) && response.json({ userDetails: result[0] })
        })

})


app.get('/projectstats', (request, response) => {
    if (!request.session.employeeNum) {
        response.status(401).send('Unauthorised request')
    }
    const { projectID } = request.query
    sql = `SELECT 
	(SELECT COUNT(*)FROM task WHERE status="Completed" AND projectID = 1) AS "Completed",
    (SELECT COUNT(*)FROM task WHERE status="Pending" AND projectID = 1) AS "Pending" ,
    (SELECT COUNT(*)FROM task WHERE projectID = 1) AS "Overall",
	concat(emp.name," ", emp.name ) AS 'projectManager', p.name AS 'projectName', c.enterprise, c.email AS "clientEmail"
    fROM project p INNER JOIN employees emp on p.managerNum = emp.employeeNum 
    INNER JOIN client c on p.clientID = c.ID
    WHERE p.ID = ${projectID};`

    db.query(sql, (error, result) => {
        console.log(result)
        response.json(result)
    })
})
app.get("/login", (request, response) => {
    //checking user credentials on our database
    //If the result contain employeeNum  
    const email = request.query.username
    const password = request.query.password

    db.query(`SELECT employeeNum FROM userdetails U 
        WHERE employeeNum = (
            SELECT employeeNum FROM employees 
            WHERE email = "${email}" LIMIT 1) AND password="${password}"
        ;`, (error, result) => {
        request.session.employeeNum = result[0].employeeNum
        if (result?.length > 0) {
            //Setting the session variable    
            (!response.headersSent) && response.json({ status: 'successful', msg: "Logged in successfully" })
        } else {
            request.session.destroy()
                (!response.headersSent) && response.json({ status: 'unsuccessful', msg: "Invalid credential" })
        }
    })


})


app.get("/addtask", (request, response) => {
    if (!request.session.employeeNum) {
        response.status(401).send('Unauthorised request')
    }
    employeeNum = request.session.employeeNum
    // console.log(request.query)
    const { projectID, name, description, date, status } = request.query

    const sql = `INSERT INTO task (ID, projectID, name, description, date, status, employeeNum) VALUES (NULL, '${projectID}', '${name}', '${description}', '${date}', '${status}', ${employeeNum})`

    db.query(sql, (error, result) => {
        response.json({ taskID: result.insertId })
    })
})
app.get("/tasks", (request, response) => {

    const employeeNum = request.session.employeeNum

    let sql = `
    SELECT T.ID as "taskID", T.name as "taskName", T.date as "taskDate", 
    T.description "taskDescription", T.status as "taskStatus", 
    client.email as "clientEmail", client.enterprise, 
    project.name as "projectName", project.ID as "projectID", 
    employees.name as "employeeName", employees.surname as "employeeSurname", 
    employees.email as "employeeEmail"
    FROM task T INNER JOIN project ON project.ID = T.projectID
    INNER JOIN employees ON T.employeeNum = employees.employeeNum
    INNER JOIN client ON client.ID = project.clientID
    WHERE T.employeeNum = ${employeeNum};
    `

    db.query(sql, (error, result) => {
        if (error) throw error
        response.json(result)
    })



})


app.listen(3000, () => {
    console.log("Server listening on port")
})