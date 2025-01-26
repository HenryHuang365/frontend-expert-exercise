type CallbackFunction = (...args: any[]) => void;

function Promisify(callback: CallbackFunction) {
  return function call(...args: any[]) {
    return new Promise((resolve, reject) => {
      const handleError = (error: string | null, value: number | null) => {
        if (value !== null) {
          resolve(value);
        } else {
          reject(error);
        }
      };
      callback(...args, handleError);
    });
  };
}

function adder(
  num1: number,
  num2: number,
  handleError: (error: string | null, value: number | null) => void
): void {
  const value = num1 + num2;
  if (typeof value === "number") {
    handleError(null, value);
  } else {
    const error = "not a number";
    handleError(error, null);
  }
}

const res = Promisify(adder);

res(1, 2)
  .then((value) => console.log(value))
  .catch((error) => console.log(error))
  .finally(() => console.log("finished 1"));

res(1, "2")
  .then((value) => console.log(value))
  .catch((error) => console.log(error))
  .finally(() => console.log("finished 2"));
