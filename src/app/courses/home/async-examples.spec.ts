import {fakeAsync, flush, flushMicrotasks, tick} from '@angular/core/testing';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';

// Udemy Lesson #28-37
describe('Async Testing Examples', () => {

    it('Asynchronous test example with Jasmine done()', (done: DoneFn) => {
      let test = false;
      setTimeout(() => {
        console.log('running assertions');
        test = true;
        expect(test).toBeTruthy();
        done();
      },1000)
    });

    it('Asynchronous test example - setTimeout()', fakeAsync(() => {

        let test = false;

        setTimeout(() => {
        });

        setTimeout(() => {

            console.log('running assertions setTimeout()');

            test = true;

        }, 1000);

        flush();

        expect(test).toBeTruthy();

    }));

    // wrapped in fakeasync(...) zone
    it('Asynchronous test example - plain promise', fakeAsync(() => {
      let test = false;
      console.log('Creating promise')

/*      setTimeout(() => {
        console.log('setTimeout() 1 callback triggered')
      });

      setTimeout(() => {
        console.log('setTimeout() 2 callback triggered')
Logs
context.js:265 Creating promise
context.js:265 Running test assertions
context.js:265 Promise 1st then() evaluated successfully
context.js:265 Promise 2nd then() evaluated successfully
context.js:265 setTimeout() 1 callback triggered
context.js:265 setTimeout() 2 callback triggered
      });*/

      Promise.resolve().then(() => {
        console.log('Promise 1st then() evaluated successfully')
        return Promise.resolve();
      }).then(() => {
        console.log('Promise 2nd then() evaluated successfully')
          test = true;
      });

      // Note: Promise higher priority than setTimeout, 2 separate async tasks in 2 separate queues, browser does microtask queue first
      // promise is microtask queue in separate queue, browser will not update view in between, lightweight, makes browser more responsive
      // setTimeout is a macro task queue (setInterval, ajax calls, mouseClicks) added to event loop between each macrotask, browser rendering engine can re-render screen

      flushMicrotasks();
      console.log('Running test assertions')
      expect(test).toBeTruthy() // execute assertions after the promise change microtasks are flushed
    }));


    it('Asynchronous test example - Promises + setTimeout()', fakeAsync(() => {
        let counter = 0;
        Promise.resolve()
            .then(() => {
               counter+=10;
               // macro task gives opportunity for angular to update DOM, between the 2 setTimeout macrotasks angular will update the DOM
               setTimeout(() => {
                   counter += 1;
               }, 1000);
            });
        expect(counter).toBe(0);

        flushMicrotasks();
        expect(counter).toBe(10);

        tick(500);
        expect(counter).toBe(10);
        tick(500); //waited for a whole second
        expect(counter).toBe(11);
    }));

    // fakeasync zone
    it('Asynchronous test example - Observables', fakeAsync(() => {
        let test = false;
        console.log('Creating Observable');

        // synchronous observables emit test then immediately complete for observers to use
        const test1$ = of(test);

        // asynchronous observable using setTimeout, promises, etc emit test then wait 1 second before completing for observers to get the test value
        const test2$ = of(test).pipe(delay(1000));

        test2$.subscribe(() => {
            test = true;
            // for synchronous observable, the callback immediately executes before the assertions get a chance to run
        });

        tick(1000); // move time forward 1 second
        console.log('Running test assertions');
        expect(test).toBe(true);
    }));

});
















