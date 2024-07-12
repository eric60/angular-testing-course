import {CalculatorService} from "./calculator.service";
import {LoggerService} from "./logger.service";
import createSpyObj = jasmine.createSpyObj;
import any = jasmine.any;

/*
Test Example
 */
describe('CalculatorService', () => {

  let calculator: CalculatorService;
  let loggerSpy: any;

  beforeEach(() => {
    console.log("Calling beforeEach")
    loggerSpy = jasmine.createSpyObj("LoggerService", ["log"])
    loggerSpy.log.and.returnValue();
    calculator = new CalculatorService(loggerSpy)
  })

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
