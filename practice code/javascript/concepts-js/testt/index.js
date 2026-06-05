const b = 10;
a = 20;

function pqrs() {
  return new Promise((resolve) => {
    resolve(7);
  });
}

function xyz(i) {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(() => {
        return a + i;
      });
      var a = 10;
    }, 1);
  });
}

async function abc() {
  const f = await pqrs(); //7
  const g = await (await xyz(10))(); //30
  return a + b + c + f + g;
}

abc().then((data) => {
  console.log("result", data);
});

var a;
let c = 30;
