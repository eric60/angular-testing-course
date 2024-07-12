import {CalculatorService} from "./calculator.service";
import {LoggerService} from "./logger.service";
import createSpyObj = jasmine.createSpyObj;

/*
Test Example
 */
describe('CalculatorService', () => {

  beforeEach(() => {

  })

  it('should add two numbers', () => {

    const logger = jasmine.createSpyObj("LoggerService", ["log"])

    logger.log.and.returnValue();

    const calculator = new CalculatorService(logger)

    const result = calculator.add(1,1)

    expect(result).toBe(2)
    expect(logger.log).toHaveBeenCalledTimes(1);
  })

  it('should subtract two numbers', () => {

     const calculator = new CalculatorService(new LoggerService())

    const result = calculator.subtract(1,1)

    expect(result).toBe(0, "unexpected subtraction result")

  })
})
