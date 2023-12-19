import { Cat } from "./Cat";

// feature #19 Module Augmentation allows you to add new declarations to existing modules without modifying the original module
// Declare a module augmentation for the 'Cat' class.
// Add a new method 'meow' to the 'Cat' class.
declare module "./Cat" {
  interface Cat {
    meow(): string;
  }
}
