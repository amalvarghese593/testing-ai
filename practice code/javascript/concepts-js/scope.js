const dummy = () => {
  const a = 1;
  console.log(a);
  {
    console.log(a); // Error-> We are trying to access inner a in TDZ. Inner a declaration gets hoisted to top of block
    // but initialization occurs below. Also inner a shadows outer vraiable a
    const a = 3;
    console.log(a);
  }
};
dummy();

const dummy2 = () => {
  const a = 2;
  {
    var a = 3; // var declaration gets hoisted to top of function. Now we have 2 declarations in same scope.
    // Redeclaration of const variable throws error
  }
};
