## Cypress notes
These are results for is cypress used for integration or end to end testing
Search instead for is cypress used for integration or endtoend teting

AI Overview
Cypress is used for both end-to-end (E2E) testing and integration testing, as well as other testing types like component testing. It was originally designed as a powerful E2E testing framework but has since expanded its capabilities. 

Primarily Known For: End-to-End Testing 
Cypress is widely known as a next-generation E2E testing tool built for the modern 

User simulation: E2E tests in Cypress simulate real user interactions and flows within the application's UI, such as clicking buttons and typing text.

Real browser environment: **Cypress runs directly within a real browser, giving it native access to the DOM and network layer, which helps in delivering consistent and reliable tests.**

Comprehensive flow testing: It is ideal for validating entire application flows, ensuring all components of a system work together as expected in a real-world scenario. 


Also Capable Of: Integration Testing 
While E2E is its primary focus, Cypress can also be effectively used for integration testing. 

Component collaboration: Integration tests verify that different parts or modules of an application work correctly when combined, which is more complex than isolated unit tests.

Network control: Cypress provides features to control network traffic (stubbing and spying on API requests) which is crucial for isolating tests from backend dependencies during integration testing.

Programmatic access: Because Cypress runs in the same run loop as your application, you have **programmatic access to objects, functions, and the application's state**, making integration testing more straightforward. 

In summary, Cypress is a flexible tool that provides solutions for a variety of testing needs, with strong features supporting both E2E and integration testing. You can find more information on the Cypress Documentation website


## Angular Testing Course

eric60 fork

This repository contains the code of the [Angular Testing Course](https://angular-university.io/course/angular-testing-course).

This course repository is updated to Angular v18, and there is a  package-lock.json file available, for avoiding semantic versioning installation issues.

![Angular Testing Course](https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-testing-small.png)


# Installation pre-requisites

Please install Node 18 Long Term Support Edition (LTE).

# Installing the Angular CLI

With the following command the angular-cli will be installed globally in your machine:

    npm install -g @angular/cli 


# How To install this repository

We can install the master branch using the following commands:

    git clone https://github.com/angular-university/angular-testing-course.git
    
This repository is made of several separate npm modules, that are installable separately. For example, to run the au-input module, we can do the following:
    
    cd angular-testing-course
    npm install

Its also possible to install the modules as usual using npm:

    npm install 

NPM 5 or above has the big advantage that if you use it you will be installing the exact same dependencies than I installed in my machine, so you wont run into issues caused by semantic versioning updates.

This should take a couple of minutes. If there are issues, please post the complete error message in the Questions section of the course.

# To Run the Development Backend Server

We can start the sample application backend with the following command:

    npm run server

This is a small Node REST API server.

# To run the Development UI Server

To run the frontend part of our code, we will use the Angular CLI:

    npm run start 

The application is visible at port 4200: [http://localhost:4200](http://localhost:4200)

================================================================
# To run cypress ETE tests (vs Integration Tests)

    npm run cypress:open

# To run tests with code coverage

    ng test --watch=false --code-coverage
    npm install -g http-server
    http-server -c-1 ./coverage (disable caching headers)

# To run ete tests in prod
In development mode is: npm start which just runs ng serve under the hood in package.json which runs the angular server in dev mode. 
To run in prod, want to run server from ./dist folder with bundled code. Run server on -p 4200 so cypress can hit those ete tests, don't need to run node backend server since cypress running mock backend http server.
1) build server, 2) run server, 3) run cypress hit server

    npm run build:prod
    npm run start:prod

# Important 

This repository has multiple branches, have a look at the beginning of each section to see the name of the branch.

At certain points along the course, you will be asked to checkout other remote branches other than master. You can view all branches that you have available remotely using the following command:

    git branch -a

  The remote branches have their starting in origin, such as for example 1-navigation-and-containers.

We can checkout the remote branch and start tracking it with a local branch that has the same name, by using the following command:

      git checkout -b section-1 origin/1-navigation-and-containers

It's also possible to download a ZIP file for a given branch,  using the branch dropdown on this page on the top left, and then selecting the Clone or Download / Download as ZIP button.

# Other Courses
# Modern Angular With Signals

If you are looking for the [Modern Angular With Signals Course](https://angular-university.io/course/angular-signals-course), the repo with the full code can be found here:

![Modern Angular With Signals Course](https://d3vigmphadbn9b.cloudfront.net/course-images/large-images/angular-signals-course.jpg)

# Angular Core Deep Dive Course

If you are looking for the [Angular Core Deep Dive Course](https://angular-university.io/course/angular-course), the repo with the full code can be found here:

![Angular Core Deep Dive](https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-core-in-depth-small.png)

# RxJs In Practice

If you are looking for the [RxJs In Practice](https://angular-university.io/course/rxjs-course), the repo with the full code can be found here:

![RxJs In Practice Course](https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png)


# NgRx In Depth

If you are looking for the [NgRx In Depth](https://angular-university.io/course/angular-ngrx-course), the repo with the full code can be found here:

![Angular Ngrx Course](https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-ngrx-course.png)

# Serverless Angular with Firebase Course

If you are looking for the [Serverless Angular with Firebase Course](https://angular-university.io/course/firebase-course), the repo with the full code can be found here:

![Serverless Angular with Firebase Course](https://s3-us-west-1.amazonaws.com/angular-university/course-images/serverless-angular-small.png)

# Angular Universal Course

If you are looking for the [Angular Universal Course](https://angular-university.io/course/angular-universal-course), the repo with the full code can be found here:

![Angular Universal Course](https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-universal-small.png)

# Angular PWA Course

If you are looking for the [Angular PWA Course](https://angular-university.io/course/angular-pwa-course), the repo with the full code can be found here:

![Angular PWA Course - Build the future of the Web Today](https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-pwa-course.png)

# Angular Security Masterclass

If you are looking for the [Angular Security Masterclass](https://angular-university.io/course/angular-security-course), the repo with the full code can be found here:

[Angular Security Masterclass](https://github.com/angular-university/angular-security-course).

![Angular Security Masterclass](https://s3-us-west-1.amazonaws.com/angular-university/course-images/security-cover-small-v2.png)

# Angular Advanced Library Laboratory Course

If you are looking for the Angular Advanced Course, the repo with the full code can be found here:

[Angular Advanced Library Laboratory Course: Build Your Own Library](https://angular-university.io/course/angular-advanced-course).

![Angular Advanced Library Laboratory Course: Build Your Own Library](https://angular-academy.s3.amazonaws.com/thumbnails/advanced_angular-small-v3.png)


## RxJs and Reactive Patterns Angular Architecture Course

If you are looking for the RxJs and Reactive Patterns Angular Architecture Course code, the repo with the full code can be found here:

[RxJs and Reactive Patterns Angular Architecture Course](https://angular-university.io/course/reactive-angular-architecture-course)

![RxJs and Reactive Patterns Angular Architecture Course](https://s3-us-west-1.amazonaws.com/angular-academy/blog/images/rxjs-reactive-patterns-small.png)


## Complete Typescript Course - Build A REST API

If you are looking for the Complete Typescript 2 Course - Build a REST API, the repo with the full code can be found here:

[https://angular-university.io/course/typescript-2-tutorial](https://github.com/angular-university/complete-typescript-course)

[Github repo for this course](https://github.com/angular-university/complete-typescript-course)

![Complete Typescript Course](https://angular-academy.s3.amazonaws.com/thumbnails/typescript-2-small.png)

