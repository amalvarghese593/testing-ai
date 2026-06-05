const dummy = () => {
  console.log(a); // undefined. var declaration hoisted but not assignment
  return;
  var a = 10;
};
dummy();

const dummy2 = () => {
  console.log(a); // Reference error: cant access a before initialization(TDZ). let declaration hoisted but since
  // we return before initialization we cant access it
  return;
  let a = 10;
};
dummy2();
