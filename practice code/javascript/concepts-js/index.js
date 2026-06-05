// const p1 = Promise.resolve("fulfill-1");
// const p2 = new Promise((res, rej) => {
//   setTimeout(() => res("fulfill-2"), 3000);
// });
// const p3 = new Promise((res, rej) => {
//   //   setTimeout(() => res("reason1"), 3000);
//   setTimeout(() => rej("reason1"), 3000);
// });
// const p4 = Promise.reject("reason2");

const dummy = () => {
  Promise.allSettled([333])
    //   Promise.allSettled([p1, p2, p3, p4])
    .then((val) => console.log("promise resolved", val))
    .catch((err) => {
      console.log(
        "Promise rjects",
        // typeof err,
        // err instanceof AggregateError,
        err,
        // err.errors,
      );
    });
};
dummy();
