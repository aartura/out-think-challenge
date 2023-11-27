// Here is a JavaScript implementation of higher-order throttle function
// (see https://www.matthewgerstman.com/tech/throttle-and-debounce/ for
// background reading  if required):
// function throttle(funcs, timeout) {
//     let ready = true;
//     return (...args) => {
//         if (!ready) {
//             return;
//         }
//         ready = false;
//         func(...args);
//         setTimeout(() => {
//             ready = true;
//         }, timeout);
//     };
// }

// Convert/annotate the throttle function above into its type-safe TypeScript equivalent.
// The code below is a first attempt at the problem that gets past the TypeScript compiler,
// but offers very little in the way of type-safety, as can be seen in the bad-usage examples at
// the bottom of the code. Please consider the issues that have been demonstrated and improve
// the type declarations to address these issues. Please enforce that func is a function
// that returns void.
// The best outcome is that you are able to enforce that the function which is
// returned by the throttle function has exactly the same signature as func,
// regardless of how many  parameters func takes. Using incorrect types or the wrong number of
// parameters when calling the wrapped function should result in a compiler error.
// function throttle(func: Function, timeout: any) {
//     let ready = true;
//     return (...args: any) => {
//         if (!ready) {
//             return;
//         }
//         ready = false;
//         func(...args);
//         setTimeout(() => {
//             ready = true;
//         }, timeout);
//     };
// }
// function sayHello(name: string): void {
//     console.log(`Hello ${name}`);
// }
// const throttledSayHello = throttle(sayHello, 1000);
// // this should result in compilation failure
// throttledSayHello(1337);
// // so should this
// const throttledSayHello2 = throttle(sayHello, "breakstuff");

type ThrottleFunction<T extends (...args: any[]) => void> = (...args: Parameters<T>) => void;

function throttle<T extends (...args: any[]) => void>(func: T, timeout: number): ThrottleFunction<T> {
    let ready = true;

    return (...args: Parameters<T>) => {
        if (!ready) {
            return;
        }

        ready = false;
        func(...args);

        setTimeout(() => {
            ready = true;
        }, timeout);
    };
}

function sayHello(name: string): void {
    console.log(`Hello ${name}`);
}

export const throttledSayHello = throttle(sayHello, 1000);

// This will result in a compilation failure
// Error: Argument of type '1337' is not assignable to parameter of type 'string'.
// throttledSayHello(1337);

// This will result in a compilation failure
// because the second argument should be a number
// const throttledSayHello2 = throttle(sayHello, "breakstuff");

// This will result in a compilation failure
// because of expected number of arguments
// const throttledSayHello3 = throttle(sayHello, 1000, "breakstuff");
