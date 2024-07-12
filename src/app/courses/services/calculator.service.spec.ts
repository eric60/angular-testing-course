import {CalculatorService} from "./calculator.service";
import {LoggerService} from "./logger.service";
import createSpyObj = jasmine.createSpyObj;
import any = jasmine.any;
import {TestBed} from "@angular/core/testing";

/*
Test Example

 */
describe('CalculatorService', () => {

  let calculator: CalculatorService;
  let loggerSpy: any;

  beforeEach(() => {
    console.log("Calling beforeEach")
    loggerSpy = jasmine.createSpyObj("LoggerService", ["log"])
    // loggerSpy.log.and.returnValue();

    /*
    TestBed Utility allows us to inject our services through dependency injection instead of using constructors explicitly

    * takes 1 configuration object that contains properties very similar to the angular module such as declaration, imports, providers

    * currently no components so only using the providers property

    * Why use TestBed vs just using constructor of CalculatorService?
    > calculator = new CalculatorService(loggerSpy).
    Reason is injecting HttpClient is much easier

    * don't use TestBed.get(), use the new TestBed.inject(CoursesService)
     */
    TestBed.configureTestingModule({
      providers: [
        CalculatorService, // use ACTUAL instance of CalculatorService
        {provide: LoggerService, useValue: loggerSpy} // don't want to use the ACTUAL instance, want to use jasmine spy, first specify what providing by using a unique dependency injection key/token which is the class itself since the constructor is unique to the js runtime. useValue uses loggerSpy wherever need to use LoggerService
      ]
    })
    calculator = TestBed.inject(CalculatorService);
  })

  // functional specification that tests 1 functionality of the service and 1 ONLY like the method
  it('should add two numbers', () => {
    console.log("add test")

    const result = calculator.add(1,1)

    expect(result).toBe(2)
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  })

  it('should subtract two numbers', () => {
    console.log("subtract test")

    const result = calculator.subtract(1,1)

    expect(result).toBe(0, "unexpected subtraction result")

  })
})
