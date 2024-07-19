import {CoursesService} from "./courses.service";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import {COURSES} from "../../../../server/db-data";

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

    // only when flush call is made, will the mock http request simulate a response which will pass to the subscribe block of findAllCourses
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

  afterEach(() => {
    httpTestingController.verify()
  })

})
