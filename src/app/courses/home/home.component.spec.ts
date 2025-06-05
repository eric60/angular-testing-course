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
async() vs waitForAsync() zone vs fakeAsync() zone
* async() zone - replaced by waitForAsync() zone to avoid confusion with async await syntax
* waitForAsync() zone
* fakeAsync() zone

 */
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
      }).compileComponents()
          .then(() => {
              fixture = TestBed.createComponent(HomeComponent);
              component = fixture.componentInstance;
              el = fixture.debugElement;
              coursesService = TestBed.inject(CoursesService);
          });

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


  it("should display advanced courses when tab clicked - fakeAsync", fakeAsync(() => { // use fakeAsync zone with fakeAsync APIs to move time forward or flush multiple event queues to replace confusing setTimeOut( ... done(), 500))
      coursesService.findAllCourses.and.returnValue(of(setupCourses()));
      fixture.detectChanges(); // update DOM with the list of courses

      const tabs = el.queryAll(By.css(".mdc-tab"));
      click(tabs[1]); // some timer trigerred here for request animation frame
      fixture.detectChanges();

      // flushMicrotasks() this doesn't work since not a microtask like promise, it's a macrotask browser event like setTimeout(), setInterval(),
      // tick(16) this works since call to request animation frame runs every 16 seconds.
      flush(); // flush all async microtasks and macrotasks like the async "request animation frame" in clicking the advanced tab

      const cardTitles = el.queryAll(By.css('.mat-mdc-tab-body-active .mat-mdc-card-title'));
      console.log(cardTitles);

      expect(cardTitles.length).toBeGreaterThan(0,"Could not find card titles");
      expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");
  }));


    it("should display advanced courses when tab clicked - async", waitForAsync(() => {

        coursesService.findAllCourses.and.returnValue(of(setupCourses()));

        fixture.detectChanges();

        const tabs = el.queryAll(By.css(".mdc-tab"));

        click(tabs[1]);

        fixture.detectChanges();

        fixture.whenStable().then(() => {

            console.log("called whenStable() ");

            const cardTitles = el.queryAll(By.css('.mat-mdc-tab-body-active .mat-mdc-card-title'));

            expect(cardTitles.length).toBeGreaterThan(0,"Could not find card titles");

            expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");

        });

    }));


});





















