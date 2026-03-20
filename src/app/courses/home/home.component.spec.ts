import { ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick, waitForAsync } from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';

import {HomeComponent} from './home.component';
import { HttpTestingController } from '@angular/common/http/testing';
import {CoursesService} from '../services/courses.service';
import { HttpClient } from '@angular/common/http';
import {COURSES} from '../../../../server/db-data';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {click} from '../common/test-utils';

/*
Angular testing class conclusion notes
* import complete modules
* try to avoid writing async test with fakeasync (preferred since can write test in linear way like sync test and simulate passage of time with fine-grained tick() and micro vs macro tasks to test setTimeOut(), setTimeInterval()) and async testing zones, most tests can be written in completely sync way
* caveat: fakeasync and zones assume that component reaches a state eventually where there is no ore tasks in the queue
* but with setInterval() there will always be an async task to be queued, so you HAVE to use jasmine done() callback
* cypress tests ANYTHING that runs in the browser
* unit test only testing small unit in isolation by mocking out all dependencies that never break
* Ete test testing whole frontend JUST like its deployed to production: testing all of our actual components, directives and services like they run in production without any js mocking, only http backend responses are mocked
* deploy to CI server like travisCI: it's all about creating 1 unique command with npm script to start the dev server WITH the production bundle, wait for server to be up and running, and then and only then run cypress ete test with cypress run command, when cypress run exists, dev server also exits, with that command easy to deploy ete tests into to any continuous integeration server
* generate code coverage reports with angular CI

 */

// if unit test fails, we know IMMEDIATELY that issue is with the component and not the mocked CoursesService
describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component:HomeComponent;
  let el: DebugElement;
  let coursesService: any;

  const beginnerCourses = setupCourses()
      .filter(course => course.category == 'BEGINNER');

    const advancedCourses = setupCourses()
        .filter(course => course.category == 'ADVANCED');

  beforeEach(waitForAsync(() => {
      const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses'])

      TestBed.configureTestingModule({
          imports: [
              CoursesModule,
              NoopAnimationsModule
          ],
          providers: [
              {provide: CoursesService, useValue: coursesServiceSpy}
          ]
      }).compileComponents() // most components fetched synchronously but some legacy components may compile by fetching html/css through backend asynchronously so need a promise then for completion
          .then(() => {
              fixture = TestBed.createComponent(HomeComponent);
              component = fixture.componentInstance;
              el = fixture.debugElement;
              coursesService = TestBed.inject(CoursesService);
          });

      // flushMicrotasks() can use this if using fakeAsync if sure all components fetched sychronously without backend calls
  }));

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });


  it("should display only beginner courses", () => {
      coursesService.findAllCourses.and.returnValue(of(beginnerCourses));
      fixture.detectChanges();
      const tabs = el.queryAll(By.css(".mdc-tab"));
      expect(tabs.length).toBe(1, "Unexpected number of tabs found");
  });


  it("should display only advanced courses", () => {

      coursesService.findAllCourses.and.returnValue(of(advancedCourses));

      fixture.detectChanges();

      const tabs = el.queryAll(By.css(".mdc-tab"));

      expect(tabs.length).toBe(1, "Unexpected number of tabs found");

  });


  it("should display both tabs", () => {

      coursesService.findAllCourses.and.returnValue(of(setupCourses()));

      fixture.detectChanges();

      const tabs = el.queryAll(By.css(".mdc-tab"));

      expect(tabs.length).toBe(2, "Expected to find 2 tabs");

  });


  fit("should display advanced courses when tab clicked - fakeAsync", fakeAsync(() => { // use fakeAsync zone with fakeAsync APIs to move time forward or flush multiple event queues to replace confusing setTimeOut( ... done(), 500))
      coursesService.findAllCourses.and.returnValue(of(setupCourses()));
      fixture.detectChanges(); // update DOM with the list of courses

      const tabs = el.queryAll(By.css(".mdc-tab"));
      console.log(`=> tabs: ${tabs}`)
      click(tabs[1]); // some timer trigerred here for request animation frame
      fixture.detectChanges();

      // flushMicrotasks() this doesn't work since not a microtask like promise, it's a macrotask browser event like setTimeout(), setInterval(),
      // tick(16) this works since call to request animation frame runs every 16 seconds.
      flush(); // flush all async microtasks and macrotasks like the async "request animation frame" in clicking the advanced tab

      const cardTitles = el.queryAll(By.css('.mat-mdc-tab-body-active .mat-mdc-card-title'));
      console.log(cardTitles);

      expect(cardTitles.length).toBeGreaterThan(0,"Could not find card titles");
      expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");

      /*
      docs on nativeElement.textContent from lib.dom.ts

Differences from innerText
Don't get confused by the differences between Node.textContent and HTMLElement.innerText. Although the names seem similar, there are important differences:

textContent gets the content of all elements, including <script> and <style> elements.
In contrast, innerText only shows "human-readable" elements.
textContent returns every element in the node.
In contrast, innerText is aware of styling and won't return the text of "hidden" elements.

Moreover, since innerText takes CSS styles into account, reading the value of innerText triggers a reflow to ensure up-to-date computed styles.
(Reflows can be computationally expensive, and thus should be avoided when possible.)

Differences from innerHTML
Element.innerHTML returns HTML, as its name indicates.
Sometimes people use innerHTML to retrieve or write text inside an element, but textContent has better performance because its value is not parsed as HTML.
Moreover, using textContent can prevent XSS attacks.
       */
  }));


  /*
async() vs waitForAsync() zone vs fakeAsync() zone
* async() zone - replaced by waitForAsync() zone to avoid confusion with async await syntax
* waitForAsync() zone - can't do flush() to empty task queues or tick() to control time, so in order to pass async test need to use fixture.detectChanges() after every async operation like window.requestAnimationFrame() method, biggest pro is supports actual http calls to the backend - this is relevant in beforeEach TestBed which has legacy modules fetching html/css from backend using http calls instead of having files bundled locally | in general never used except in beforeEach block
* fakeAsync() zone better since have more testing capabilities to test fine-grained control of passage of time, to test intermediate states of our component at specific points in time running task by task  while the whenStable() callback executed after ALL the async oepations complete | allows you to run your assertions in a synchronous clean way

* both are test utilities to test async functionality, only use if necessary and not systematically, most components able to be tested synchronously
 */
    it("should display advanced courses when tab clicked - async", waitForAsync(() => {
        coursesService.findAllCourses.and.returnValue(of(setupCourses()));
        fixture.detectChanges();

        const tabs = el.queryAll(By.css(".mdc-tab"));
        click(tabs[1]); // click runs async operation requestAnimationFrame()
        fixture.detectChanges();

        // whenStable returns promise to run any code you want to run after all the async operations completed
        fixture.whenStable().then(() => {
            console.log("called whenStable() ");
            const cardTitles = el.queryAll(By.css('.mat-mdc-tab-body-active .mat-mdc-card-title'));
            expect(cardTitles.length).toBeGreaterThan(0,"Could not find card titles");
            expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");
        });
    }));


});





















