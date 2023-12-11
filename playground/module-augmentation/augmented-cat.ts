import { Cat } from "./Cat";

// feature #19 Module Augmentation
// Declare a module augmentation for the 'Cat' class.
// Add a new method 'meow' to the 'Cat' class.
declare module "./Cat" {
  interface Cat {
    meow(): string;
  }
}

export default Cat;
