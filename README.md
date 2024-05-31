 ## Legend Task Manager
Legend Task Manager is an application that is still in its premitive stage. But the main idea behind it is to assist teams with managing their tasks. Tasks associated from different projects are sometimes assign to a single indvidual and they can be difficult to manage. Legendary Task Manager povides you task management tools with an aesthetic and usable user interface to assist teams with task management.

### Transperancy 
The code was written solely for demonstrating my skills set and due to the demands of the deadline a few comprimises had to be made. I have dedicated this section of the page to express the challenges that were encountered during the course of this project. It has only been a few weeks since I started learning react and seven days since I started with Express JS. I have had a lot trouble with react. Besides learning the suitable use case of hooks, I had a big challenge loading asynchronous content and inducing a render for components to display the fresh content at the time when it is actually loaded. And besides having very little experience working with Express Js, it  took me a great deal of time to understand that assigning a variable outside its original scope raises an exception. I also did not save any session variables throughout the application. The only API developed for authenting the user was that of logging in via the database records.

>My mistake as I was developing this react app was that I wanted to use AJAX in my react app to log in. Browsers restrict the reading of HTTPonly cookies which are normally send from the server to the users as tokens that uniquely identitfy them. Since it is a security standard to make these cookies confidencial they can not be read by Ajax or the fetch API. This is the reason why single page applications have to manually submit login forms. Another one of my mistakes was my limited knowledge: instead of letting express js to serve my react app I based everything on my react app leading me to call all the endpoints, which I defined, directly from the react app. My approach has proven to be a big blunder but the test(together with these blunders) was a great learning curve for me.
>

>[!NOTE]
>[About Security] 
>I did not use any encryption for data store, transmition or processing but I am aware of these disciplines of application development and do regard their importance. 


# SQL PRACTICAL APPLICATION
In this section I am going to demonstrate my skills and efficiency in utilizing SQL. I decided to limit the number of queries that were involved in the whole database-creation process.

### Creating a table
The Employee table keeps the list of all teams members. Of course, techniques such as table partitoning can be utilized for optimization and performance enhanment but for the sake of demostration I've kept the code concise.
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

The project Table is used to keep records of projects(its implementation is also kept concise). The only other thing to note about this table is that it is a weak entity to Employee table and superior to Client table. Its superiosity stems from this practical scenario: A client can propose a project and the proposal can either be rejected or accepted depending on the nature of the arrangement and how both parties benefit from it. So before a client can actually become a client - the project has to be accepted. This is how the project entity is stronger than that of client.
>     CREATE TABLE project(
>       id INT(11) AUTO_INCREMENT NOT NULl,
>       name VARCHAR(30) NOT NULL,
>       managerID INT(11) NOT NULL,
>       clientID INT(11) NOT NULL,
>       FOREIGN KEY managerID REFERENCE employee(id))
Here is the implementation of the client table. To inturrupt the monotony of creating regular tables, for this table, we want that when a project record is deleted, to cause even the record it might be associated with this table to also delete.

>     CREATE TABLE client(
>       id INT(11) AUTO_INCREMENT NOT NULl PRIMARY KEY,
>       name VARCHAR(30) NOT NULL,
>       email VARCHAR(30) NOT NULL,
> 
>       FOREIGN KEY projectID REFERENCE project(id) ON DELETE CASCADE)

>[!CAUTION]
>It is not recommended to use `ON DELETE CASCADE` in this situation. And this is because a client could have many projects. So if `ON DELETE CASCADE` is applyed as it has been above: that would cause the delection of a single project (which is associated with a client) to also trigger the delection of that client. Which will ultimately be costly becuase we will no loner have the clinet's profile. So it is important to carefully select where and how you use it. There's also an option for when the parent record updates.

The task table will help in assigning tasks to employees. The information that this entity contributes to the applicaton is simple but vital. 
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
>Despite having experienced difficulties in developing with the tecnologies I was set to use(React and Express JS): there are things I now appreciate about these technologies. I love how end points are created in Node.JS with Express. It is very different from PHP which I am more familiar with. Only recently I learnt that there needs to be a middleware for express to render react components as standard html content. As a developer I value and enjoy learning. I value the importance of acknowledging my lack of expertise in certain areas to make room for more growth. Being inexperienced is only a temporary liability if you're open enough to learn. So the hole experience of this test was wonderful although I was challenged to think and make dicisions quicker.

