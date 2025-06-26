

// 1 terminal running frontend "npm start", not running backend "npm run server" (not needed for ete test since going to mock the backend responses)
// 2nd terminal running cypress "npm run cypress:open" not "npm run server"
// ete test: real http request now, but just mocking the backend http request
describe('Home Page', () => {

    beforeEach(() => {
        cy.fixture('courses.json').as("coursesJSON"); // courses.json is mock http response
        cy.server(); // startup cypress mock http backend server
        cy.route('/api/courses', "@coursesJSON").as("courses");
        cy.visit('/');
        cy.wait('@courses')
    });

    it('should display the "All Courses" h3 header even with no backend running. No need for cy.server() mock http backend server', () => {
      cy.visit('/');
      cy.contains("All Courses");
      cy.get('h3').contains("All Courses")
      // Get the child DOM element that contains given text.
      // cy.get('.nav').contains('About') // Yield el in .nav containing 'About'
      // cy.contains('Hello') // Yield FIRST el in document containing 'Hello'
    })

    it('should display a list of courses', () => {
        cy.contains("All Courses");
        cy.wait('@courses');
        cy.get("mat-card").should("have.length", 9); // 9 material cards
    });


    // Simulating user interaction clicks in Cypress End to End Tests
    it.only('should display the advanced courses', () => {
        // cy.get('.mat-tab-label').should("have.length", 2);
        // cy.get('.mat-tab-label').last().click();

        cy.get('.mat-mdc-tab').should("have.length", 2);
        cy.get('.mat-mdc-tab').last().click();

        // get this css class .mat-card-title contained within active container elements containing this other css class .mat-tab-body-active
      // .mat-tab-body-active .mat-card-title could not be found in the DOM
        const matTabBodyActiveTitle = '.mat-tab-body-active .mat-card-title';

        let firstMatCardInCoursesList = cy.get('courses-card-list').first();
        firstMatCardInCoursesList.should('have.length', 1)
        firstMatCardInCoursesList.get('mat-card-title').should('contain', 'Angular Security Course');

        // cy.get(matTabBodyActiveTitle).its('length').should('be.gt', 1);
        // cy.get(matTabBodyActiveTitle).first()
        //     .should('contain', "Angular Security Course");

        /*
  <mat-tab-group>

.mat-tab-body-active

    <mat-tab label="Beginners">
      <courses-card-list (courseChanged)="reload()"
        [courses]="beginnerCourses$ | async">
      </courses-card-list>
    </mat-tab>

    <mat-tab label="Advanced">
      <courses-card-list  (courseChanged)="reload()"
        [courses]="advancedCourses$ | async"
      ></courses-card-list>
    </mat-tab>
  </mat-tab-group>

========================================================================
  <courses-card-list> component below

  <mat-card *ngFor="let course of courses" class="course-card mat-elevation-z10">

    <mat-card-header>
        <mat-card-title>{{course.titles.description}}</mat-card-title>
    </mat-card-header>

    <img mat-card-image [src]="course.iconUrl">

    <mat-card-content>
        <p>{{course.titles.longDescription}}</p>
    </mat-card-content>

    <mat-card-actions class="course-actions">

        <button mat-raised-button color="primary" [routerLink]="['/courses', course.id]">
            VIEW COURSE
        </button>

        <button mat-raised-button color="accent"
                (click)="editCourse(course)">
            EDIT
        </button>

    </mat-card-actions>

</mat-card>

         */
    });


});






















