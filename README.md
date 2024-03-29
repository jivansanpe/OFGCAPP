# OFGCAPP

Mobile app for the Orquesta Filarmónica de Gran Canaria.

## Description

Nowadays, our society moves fast. People feel the ever growing need of instant access to the things they want and this project comes as 
one of the reimaginations of old resources, made to satisfy that need. The OFGCAPP is the evolution of the old pamphlet that announces 
all the concerts you love but in your pocket, with a fresh look and many functions such as administrator functions (CRUDS for all entities).

## Technologies used
* Ionic-Angular
* Laravel and it's ORM (Eloquent)


## Getting Started

### Requirements for installation

* Code editor (Visual Studio Code).
* Laragon or XAMPP.
* php Composer.
* MySQL Workbench.
* Postman if you want to test the API.

### Installing

* Open your code editor and go to the folder of your choice.

* Clone this project.

* Create a MySQL Schema called "ofgcapp" and set the .env of the backend folder properly (ports, mysql password, etc).

* Execute npm install.

* Execute composer install.

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
![diagrama er proyecto drawio](https://user-images.githubusercontent.com/56371021/221216305-bac92f17-ae37-4ce4-9988-94a0ec104c7a.png)
### Relational Diagram
![diagrama relacional drawio](https://user-images.githubusercontent.com/56371021/221216362-a83ed10b-4d90-451a-b49c-9a25f7359fa6.png)
### UML Diagram
![Captura de pantalla (2376)](https://user-images.githubusercontent.com/56371021/221216412-588739f4-9be3-406f-b23d-62b59076319e.png)
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
* image: the event's image.
#### Musicians
* name: the musician's name.
* description: the musician's description.
* image: the musician's image.
#### Authors
* name: the author's name.
* description: the author's description.
* image: the author's image.
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
## Technology stack comparison
#### Ionic 
Ionic is a mobile app framework based on Angular, a Javascript framework for web apps.
Some of the main competitors are:
* React Native: It's a framework for mobile apps created in Facebook. It uses JavaScript and the React library to build mobile apps.
* Flutter: It's a mobile app framework made by Google. It uses a programming language called Dart and a group of widgets for building mobile web apps.
* NativeScript: It's a mobile framework that uses JavaScript and allows the developers to create native mobile apps.

In general, Ionic is considered to be a solid option for developing hybrid mobile apps, apps that can be run in mobile and web. However, React Native, FLutter and NativeScript are also very popular between mobile developers and can be a better option depending on the needs and priorities of the project.
#### Laravel

Laravel is a PHP framework for web application development. Some of its main competitors are:

* Symfony: It is a very popular and widely used PHP framework in the industry. It offers a full set of tools and components for web application development.

* CodeIgniter: It is a lightweight and easy-to-use PHP framework. It is popular among developers who are looking for a quick and simple solution for creating web applications.

* Zend Framework: It is a full-featured and powerful PHP framework, with a set of advanced components and tools for web application development.

* CakePHP: It is a PHP framework with a focus on simplicity and ease of use. It offers a wide range of features and tools for web application development.

Overall, Laravel is considered one of the most popular and widely used PHP frameworks in the industry. It offers a wide range of features and tools for web application development and is highly praised for its focus on simplicity and ease of use. However, there are also many other PHP frameworks available, each with its own advantages and disadvantages, and the choice of the right framework depends on the needs and preferences of the project.
## Author

Pablo Hernández Marrero.


## Acknowledgments

Resources used for this project:
* [Figma](https://www.figma.com/)
* [Diagrams.net](https://www.diagrams.net/)
* [Ionic Documentation](https://ionicframework.com/docs/)
* [Laravel Documentation](https://laravel.com/docs/9.x)
