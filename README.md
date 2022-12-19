# OFGCAPP

Mobile app for the Orquesta Filarmónica de Gran Canaria.

## Description

Nowadays, our society moves fast. People feel the ever growing need of instant access to the things they want and this project comes as 
one of the reimaginations of old resources, made to satisfy that need. The OFGCAPP is the evolution of the old pamphlet that announces 
all the concerts you love but in your pocket, with a fresh look and many functions such as administrator functions (CRUDS for all entities).

## Technologies used
* Ionic-Angular
* Laravel


## Getting Started

### Requirements for installation

* Code editor (Visual Studio Code).
* Laragon or XAMPP.
* php Composer.
* MySQL Workbench.
* Postman if you want to test the API.

### Installing

* Open your code editor and go to the folder of your choice.

* Install php composer in this project folder or globally.

* Install the laravel installer in this project folder or globally.

* Clone this project.

* Create a MySQL Schema called "ofgcapp" and set the .env of the backend folder properly (ports, mysql password, etc).

* Execute npm install.

* Enjoy!

### Executing OFGCAPP

* Run the backend.
```
php artisan serve
```
* Run the frontend.
```
ionic serve
```
## API Testing
If you want to test the API and check the different endpoints before jumping in, feel free to check the 
[Postman documentation](https://documenter.getpostman.com/view/23478629/2s8YzZPe45).

## Data Model

### Entity Relationship Diagram
![diagrama er proyecto drawio](https://user-images.githubusercontent.com/56371021/208326724-0597ff0f-e288-42cf-b982-084e0e7176af.png)
### Relational Diagram
![diagrama relacional drawio](https://user-images.githubusercontent.com/56371021/208326733-70f8e832-52a5-4000-9540-ecc869852e59.png)
### UML Diagram
![Diagrama UML](https://user-images.githubusercontent.com/56371021/208326738-f4d4c430-5c53-4079-979a-3f104483523d.png)
### Entities and attributes explained
#### Users
* name: the user's name.
* email: the user's email.
* password: the user's password. This value is encrypted so no personal passwords are stored in the database.
#### Events
* name: the event's name.
* description: the event's description.
* category: the event's category.
* date: the event's date.
#### Musicians
* name: the musician's name.
* description: the musician's description.
#### Authors
* name: the author's name.
* description: the author's description.
#### Pieces
* name: the piece's name.
* description: the piece's description.
#### Event Musician table
* category: the category of a certain musician in a certain event such as Director or Soloist.
* special: if a certain musician is a highlighted participant in an event.
## Use cases
![diagrama casos de uso](https://user-images.githubusercontent.com/56371021/208329978-29a8def0-6bee-4ff3-9f60-0a5a108ba3d5.png)

As we can see, the admin has full control of all the CRUDS while the average user of the app will only be able to see the information.
## Prototype
[Figma Prototype](https://www.figma.com/file/CR9ft732P6DSkdf3yY9DKT/Untitled?node-id=1%3A2&t=t63D9M46tMqHRbyB-1)

The basic prototype helped me to obtain the style and feel that I want to convey through the app,
along with the navigation structure and the page's design.

## Project organization

A basic project and task organization of this app was done in my Github Projects tool.

[Planning](https://github.com/users/PabloHern/projects/1)

## Authors

Pablo Hernández Marrero.


## Acknowledgments

Resources used for this project:
* [Figma](https://www.figma.com/)
* [Diagrams.net](https://www.diagrams.net/)
* [Ionic Documentation](https://ionicframework.com/docs/)
* [Laravel Documentation](https://laravel.com/docs/9.x)
