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

// // Define the type for the callback function
// type Callback<T> = (...args: any[]) => void;

// // Generic Promisefy function
// function Promisefy<T>(callback: (...args: any[]) => void): (...args: any[]) => Promise<T> {
//   return function call(...args: any[]): Promise<T> {
//     return new Promise((resolve, reject) => {
//       const handleError = (error: any, data: T | null) => {
//         if (data !== null) {
//           resolve(data);
//         } else {
//           reject(error);
//         }
//       };
//       callback.call(this, ...args, handleError);
//     });
//   };
// }

// // Define the `add` function with types
// function add(
//   num1: number,
//   num2: number,
//   handleError: (error: string | null, result: number | null) => void
// ): void {
//   const value = num1 + num2;

//   if (typeof value === "number") {
//     handleError(null, value);
//   } else {
//     const error = "not a number";
//     handleError(error, null);
//   }
// }

// // Use the Promisefy function with proper types
// const res = Promisefy<number>(add);

// res(1, 2)
//   .then((data) => {
//     console.log(data); // Should log: 3
//   })
//   .catch((error) => {
//     console.log(error); // Will not run in this case
//   });

// res(1, "2" as unknown as number) // Type assertion used for demonstration
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(error); // Should log: not a number
//   });
