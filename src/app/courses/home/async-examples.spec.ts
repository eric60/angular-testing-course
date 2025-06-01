import {fakeAsync, flush, flushMicrotasks, tick} from '@angular/core/testing';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';

// uat#28-37
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

    fit('Asynchronous test example - plain promise', (() => {
      let test = false;
      console.log('Creating promise')

/*      setTimeout(() => {
        console.log('setTimeout() 1 callback triggered')
      });

      setTimeout(() => {
        console.log('setTimeout() 2 callback triggered')

        Creating promise
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
      console.log('Running test assertions')
      expect(test).toBeTruthy()
    }))

    it('Asynchronous test example - plain Promise', fakeAsync(() => {

        let test = false;

        console.log('Creating promise');

        Promise.resolve().then(() => {

            console.log('Promise first then() evaluated successfully');

            return Promise.resolve();
        })
        .then(() => {

            console.log('Promise second then() evaluated successfully');

            test = true;

        });

        flushMicrotasks();

        console.log('Running test assertions');

        expect(test).toBeTruthy();

    }));


    it('Asynchronous test example - Promises + setTimeout()', fakeAsync(() => {

        let counter = 0;

        Promise.resolve()
            .then(() => {

               counter+=10;

               setTimeout(() => {

                   counter += 1;

               }, 1000);

            });

        expect(counter).toBe(0);

        flushMicrotasks();

        expect(counter).toBe(10);

        tick(500);

        expect(counter).toBe(10);

        tick(500);

        expect(counter).toBe(11);

    }));

    it('Asynchronous test example - Observables', fakeAsync(() => {

        let test = false;

        console.log('Creating Observable');

        const test$ = of(test).pipe(delay(1000));

        test$.subscribe(() => {

            test = true;

        });

        tick(1000);

        console.log('Running test assertions');

        expect(test).toBe(true);


    }));


});
















