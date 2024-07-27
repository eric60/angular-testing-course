import {CoursesService} from "./courses.service";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import {COURSES} from "../../../../server/db-data";
import {Course} from "../model/course";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {HttpErrorResponse} from "@angular/common/http";

describe("CoursesService", () => {
  let coursesService: CoursesService;
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService, provideHttpClientTesting]
    })
    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);

  })
  it("should retrieve all courses", () => {
    coursesService.findAllCourses()
      .subscribe(courses => {
        expect(courses).toBeTruthy("No courses found")
        expect(courses.length).toBe(12, "incorrect number of courses")

        const course = courses.find(course => course.id == 12)

        expect(course.titles.description).toBe("Angular Testing Course")
      })

    // not synchronous test: mock request is made AFTER the subscription to the result of findAllCourses
    const req = httpTestingController.expectOne("/api/courses")
    expect(req.request.method).toEqual("GET");

    // req.flush triggers the http request
    // only when flush call is made, will the mock http request simulate a response which will pass to the executing code of findAllCourses() (subscribe block)
    // Resolve the request by returning a body plus additional HTTP information (such as response headers) if provided.
    req.flush({payload: Object.values(COURSES)})

  })

  it("should find a course by id", () => {
    coursesService.findCourseById(12)
    .subscribe(course => {
      expect(course).toBeTruthy();
      expect(course.id).toBe(12);
    })

    const req = httpTestingController.expectOne("/api/courses/12");
    expect(req.request.method).toEqual("GET")
    req.flush(COURSES[12])

  })

  it("should save the course data", () => {
    const testCourse: Partial<Course> = {titles:{description:"Testing Course"}}

    coursesService.saveCourse(12, testCourse)
      .subscribe(course => {
        expect(course).toBeTruthy();
        expect(course.id).toBe(12)
        expect(course.titles.description).toBe(testCourse.titles.description);
      })
    const req = httpTestingController.expectOne("/api/courses/12")
    expect(req.request.method).toEqual("PUT");
    expect(req.request.body.titles.description).toBe(testCourse.titles.description)
    req.flush({
      ...COURSES[12],
      ...testCourse
    })
  })

  it("should give an error if save course fails", () => {
    const testCourse: Partial<Course> = {titles:{description:"Testing Course"}}

    coursesService.saveCourse(12, testCourse)
      .subscribe(
        () => { fail("the save course operation should have failed")},
        (error: HttpErrorResponse) => {
          expect(error.status).toBe(500)
        })
    const req = httpTestingController.expectOne("/api/courses/12")
    expect(req.request.method).toEqual("PUT");
    req.flush("Save course failed", {status: 500, statusText:"Internal Server Error"});
  })

  it("should find a list of lessons", () => {
    coursesService.findLessons(12)
      .subscribe(lessons => {
        expect(lessons).toBeTruthy()
        expect(lessons.length).toBe(3);
      })


  })

  afterEach(() => {
    httpTestingController.verify()
  })

})
