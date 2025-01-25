function Promisefy(callback) {
  return function call(...args) {
    return new Promise((resolve, reject) => {
      const handleError = (error, data) => {
        if (data !== null) {
          resolve(data);
        } else {
          reject(error);
        }
      };
      callback.call(this, ...args, handleError);
    });
  };
}

function add(num1, num2, handleError) {
  const value = num1 + num2;

  if (typeof value === "number") {
    handleError(null, value);
  } else {
    const error = "not a number";
    handleError(error, null);
  }
}

const res = Promisefy(add);
res(1, 2)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

res(1, "2")
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
