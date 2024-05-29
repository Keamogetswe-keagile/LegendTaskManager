 ## Legend Task Manager
Legend Task Manager is an application that is still in its premitive stage. But the main idea behind it is to assist teams with managing their tasks. Tasks associated with different projects are sometimes assign to a single indvidual. Legendary Task Manager povides you task management tools with an aesthetic and usable user interface to assist teams with task management.

### Transperancy 
The code was written solely for demonstrating my skills set and due to the demands of deadline a few comprimises had to be made. I have dedicated this section of the page to express the challenges that were encountered during the course of this project. It has only been a few weeks since I started learning react and seven days since I started with Express JS. I have had a lot trouble with react. Besides learning the suitable usecase of hooks, I had a big challenge loading asynchronous content and inducing a render for components to display the fresh content at the time when it is actually loaded. And besides having very little experience working with Express Js, it  took me a great deal of time to understand that assigning a variable outside its original scope raises an exception. I also did not save any session variables throughout the application. The only API developed for authenting the user was that of logging in via the database records.

>[!NOTE]
>About Security] 
>I did not use any encryption for data store, transmition or processing butI am aware of these disciplines of application development and do regard their importance.


# SQL PRACTICAL APPLICATION
In this section I am going to demonstrate my skills and efficiency in utilizing SQL. I decided to limit the number of queries that were involved in the whole database-creation process.

### Creating a table
The Employee table keeps the list of all teams members. Of course, techniques such as table partitoning can be utilized for optimization and performance enhanment but for the sake of demostration I've kept it concise.
>     CREATE TABLE employee(
>       id INT(11) AUTO_INCREMENT NOT NULl,
>       name VARCHAR(30) NOT NULL,
>       surname VARCHAR(30) NOT NULL,
>       idNum CHAR(11) NOT NULL,
>       PRIMARRY KEY(id),
> 
>       CONSTRAINT IdUnique UNIQUE(idNum)
>       CONSTRAINT PatternSurname CHECK(surname REGEXP "^[a-zA-Z]{3,27}$"),
>       CONSTRAINT PatternSurname CHECK(name REGEXP "^[a-zA-Z]{3,27}$"),
>       CONSTRAINT PatternIdNum CHECK(idNum REGEXP "^[0-9]{13}$"))

The project Table is used to keep records of projects(its implementaton is also kept concise). The only other thing to note about this table is that it is a weak entity to Employee table and superior to Client table. Its superiosity stems from this practical scenario: A client can propose a project and the proposal can be rejected or accepted depending on the nature of how both parties benefit from the arrangement. So before a client can actually become a client - the project has to be accepted. This is how the project entity is stronger than that of client.
>     CREATE TABLE project(
>       id INT(11) AUTO_INCREMENT NOT NULl,
>       name VARCHAR(30) NOT NULL,
>       managerID INT(11) NOT NULL,
>       clientID INT(11) NOT NULL,
>       FOREIGN KEY managerID REFERENCE employee(id))
Here is the implementation of the client table. To inturrupt the monotony of creating regular tables, for this table, we want that when a project record is deleted, to cause even the record it might be associated with inis table to also delete.

>     CREATE TABLE client(
>       id INT(11) AUTO_INCREMENT NOT NULl PRIMARY KEY,
>       name VARCHAR(30) NOT NULL,
>       email VARCHAR(30) NOT NULL,
> 
>       FOREIGN KEY projectID REFERENCE project(id) ON DELETE CASCADE)

>[!CAUTION]
>It is not recommended to use `ON DELETE CASCADE` in this situation. And this is because a client could have many projects. So if ON DELETE CASCADE is applyed as it has been above: that would cause the delection of a single project (which is associated with a client) to also trigger the delection of that client. Which will ultimately be costly becuase we will no loner have the clinet's profile. So it is important to carefully select where and how you use it.

The task table will help in assigning tasks to employees. The information that this simple class contributes to the applicaton is vital.
>     CREATE TABLE Task(
>       id INT(11) AUTO_INCREMENT NOT NULl PRIMARY KEY,
>       name VARCHAR(30) NOT NULL,
>       description VARCHAR(500) NOT NULL,
>       dueDate DATE,
>       status DEFAULT 'Pending' NOT NULL,
>       emplId int(11) NOT NULL,
>       projectId int(10) NOT NULL,
>          
>       FOREIGN KEY emplId REFERENCE employee(id),
>       FOREIGN KEY projectId REFERENCE project(id),
>       CONSTRAINT StatusChk CHECK(status REGEXP "^(Pending)|(Completed)|(In Progress)$"),
>       CONSTRAINT dueDateChk CHECK(dueDate > CURDATE())
>       

This is the table used to store the users' log-in credentials.
>     CREATE TABLE Task(
>       id INT(11) AUTO_INCREMENT NOT NULl PRIMARY KEY,
>       password VARCHAR(50) NOT NULL,
>       CONSTRAINT idChk UNIQUE(id))
>


>[!NOTE]
>## Personal sentiments
>Despite having experienced difficulties in developing with the tecnologies I was set to use(React and Express JS): there are things I now appreciate about these technologies. I particulaly love how end points are created in Node.JS with Express. It is very different from PHP which I am more with. So the hole experience was wonderful although I was challenged to think and make dicisions quicker.
