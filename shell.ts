function concatenateArrays<T, U>(
  array1: Array<T>,
  array2: Array<U>,
): Array<T | U> {
  return [...array1, ...array2];
}

type DummyFunctionType = <T, U>(
  array1: Array<T>,
  array2: Array<U>,
) => Array<T | U>;

interface YY {
  fly(d: string): void;
  bark: (a: number) => void;
}

const dummy: DummyFunctionType = (array1, array2) => {
  return [...array1, ...array2];
};
// const dummy = <T, U>(array1: Array<T>, array2: Array<U>): Array<T | U> => {
//   return [...array1, ...array2];
// };
