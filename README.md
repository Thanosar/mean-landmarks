# Dubai's landmarks

A MEAN web application that provides information about famous landmarks of Dubai.

## Application

A (responsive) blog that displays information about famous landmarks of Dubai. In the home screen displays a list of landmarks with a photo thumbnail, title and some info about the landmark. Only the administrator has the privilege to update the information (title, description, short info, url, location). He can upload a photo too (not larger than 5MB) and the system automatically create a thumbnail for each photo (250px x 250px).

### Tech stack
The application is composed of a front-end and a rest api as back-end system using the following technologies:

* Angular 10
* Mongo DB
* Node.js (Express)
* Parse server (v2.7.4)
* Parse Dashoard

## How to run the application

* Clone this repo and install the dependencies by running `npm install`.
* Start the back-end server by running `npm run server`
* Start the app (front-end) by running `ng serve`
* Navigate to `http://localhost:4200/` for the web app enviroment and `http://localhost:5000/dashboard` for the Parse Dashboard

[![parse-dashboard.png](https://i.postimg.cc/6qXBMBtd/parse-dashboard.png)](https://postimg.cc/vg0RBF1B)

### Login credentials
* `admin:admin` (Admin role, rw)
* `testUser:123456` (Guest, r-)
