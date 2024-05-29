## Legend Task Manager
Legend Task Manager is an application that is still in its premitive stage. But the main idea behind it is to assist teams with managing their tasks. Tasks associated with different projects are sometimes assign to a single indvidual. Commiting to many projects as an individual is by nature quite complex. Legendary Task Manager povides you task management tools with an aesthetic and usable user interface to assist teams with task management.

### Transperancy 
The code was written solely for demonstrating my skills set and due to the demands of deadline a few comprimises had to be made. I have dedicated this section of the page to express the challenges that were encountered during the course of this project. It has only been a few weeks since I started learning react and seven days since I started Express JS. I have had a lot trouble with react. Besides learning the suitable usecase of hooks, I a had big challenge loading asynchronous content and inducing a render for components to display the fresh content a the time when it is actually loaded. And besides having very little experience working with Express Js, it  took me a great deal of time to understand that assigning a variable outside its original scope raises an exception. I also did not save any session variables throughout the application. The only API developed for authenting the user was that of logging in via the database records.

>[!WARNING]
>About Security] 
>I did not use any encryption for data store, transmition or processing butI am aware of these disciplines of application development and do regard their importance.


# SQL PRACTICAL APPLICATION
In this section I am going to demonstrate my skills and efficiency in utilizing SQL. I decided to limit the number of queries that were involved in the whole database-creation process.

### Creating a table
> 1. CREATE TABLE employee(
> -      id INT(11) AUTO_INCREMENT NOT NULl,
>       name VARCHAR(30) NOT NULL,
>       surname VARCHAR(30) NOT NULL,
>       idNum INT(11) NOT NULL,
>       PRIMARRY KEY(id, idNum),
>       ADD CONSTRAINT PatternName CHECK(name REGEXP "^[a-zA-Z]{3,27}$") 
> )


