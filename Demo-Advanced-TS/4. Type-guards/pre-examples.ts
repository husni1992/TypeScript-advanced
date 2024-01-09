// typeof
function processInput(input: string | number) {
  
  // Type guard for 'string'
  if (typeof input === "string") {
    console.log(`Input is a string: ${input.toUpperCase()}`); // Safe to use string methods
  }

  // Type guard for 'number'
  if (typeof input === "number") {
    console.log(`Input is a number: ${input.toFixed(2)}`); // Safe to use number methods
  }
}

// ------------------------------------------------------------

// instanceof
function logValue(input: Date | string) {
  if (input instanceof Date) {
    console.log(input.toUTCString());
  } else {
    console.log(input.toUpperCase());
  }
}

// ------------------------------------------------------------

// in
type Fish = { swim: () => void; eat: () => void };
type Bird = { fly: () => void; eat: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal;
  } else {
    animal;
  }
}
