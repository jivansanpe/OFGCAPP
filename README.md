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

Let's move on to the advantages and disadvantages of using both technologies for the backend and frontend of this project.

Advantages of using Ionic in the frontend of this application include:

- The ease of adapting it for display on mobile devices.
- Access to many types of UI component templates for creating a preliminary sketch that sets the design and functionality path, always in line with the requirements proposed by the project mentor.
- Versatility for viewing the project on iOS and Android devices. This can easily be seen with the command ionic serve -l.

Some of its disadvantages include:

- Some components may need to be specifically programmed for iOS.
- It will be heavier as a hybrid technology, as it requires many more libraries, plugins, and dependencies compared to a native application.

Advantages of using Laravel in the backend include:

- The creation of migrations for different tables has been quick and simple, with no need to use SQL statements.
- The pre-established templates in the default structure have been a great help in following a consistent programming scheme in Laravel. An example would be the testing section, which had some already created as a guide.
- Thanks to the different shortcuts provided by Laravel, the code has remained compact and clean.

Some of its disadvantages include:

- The scarcity of tutorials due to the speed with which new versions of Laravel are released. In this case, we used version 9.
- Incompatibility between different versions of Laravel. Many functions that worked a year ago are no longer compatible with the current version, so updating an old project can become a headache.

Native apps, hybrid apps, web apps and PWA.

Native apps, hybrid apps, web apps, and progressive web apps (PWA) are four different types of mobile applications that have their own unique features and capabilities.

Native apps are applications built for specific platforms using their respective programming languages and development tools, such as Swift for iOS or Java for Android. They have full access to the device's functionality, including the camera, GPS, and more. They offer a smooth and fast user experience, but they need to be downloaded from an app store and often require more time and resources to build.

Hybrid apps are built using a combination of web technologies (HTML, CSS, and JavaScript) and native technologies. They run on a native container and provide a similar look and feel to native apps, but with less access to the device's hardware. Hybrid apps are easier and faster to develop, but their performance can sometimes be slower than native apps.

Web apps are web-based applications that run on a browser and do not require an app store download. They are usually built using HTML, CSS, and JavaScript and are designed to be used on multiple platforms. Web apps can be accessed from any device with an internet connection, but their performance can be limited by the capabilities of the device and the strength of the internet connection.

PWA's are a relatively new type of mobile application that provides the best of both worlds by combining the benefits of native and web apps. PWAs are built using web technologies and run on a browser, but they have access to certain native device features and can be installed on a device like a native app. PWAs offer a fast and smooth user experience, and they can be updated and accessed from anywhere with an internet connection.

In conclusion, the choice between these different types of mobile apps depends on the specific requirements and goals of the project. Native apps provide the best performance, but they require more resources and are limited to specific platforms. Hybrid apps are a good compromise between performance and ease of development, but they may not have full access to the device's hardware. Web apps are accessible from any device, but their performance can be limited. PWAs offer a fast and smooth user experience, with the ability to access certain native features, and can be updated and accessed from anywhere with an internet connection.

## Author

Pablo Hernández Marrero.


## Acknowledgments

Resources used for this project:
* [Figma](https://www.figma.com/)
* [Diagrams.net](https://www.diagrams.net/)
* [Ionic Documentation](https://ionicframework.com/docs/)
* [Laravel Documentation](https://laravel.com/docs/9.x)
