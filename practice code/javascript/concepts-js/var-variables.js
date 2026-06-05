const a = 10;

const dummy = () => {
  return () => a + 100;
  var a = 20;
};
console.log(dummy()());

// const a = 10;

// const dummy = () => {
//   const a = 20; // ✅ shadowing — different scope, no error
//   console.log(a); // 20
// };
// dummy();

// console.log(a); // 10 (outer 'a' is unaffected)
