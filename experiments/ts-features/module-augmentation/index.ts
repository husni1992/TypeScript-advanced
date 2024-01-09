import { Cat, CatType } from "./Cat";

let cat1 = new Cat();
cat1.type = CatType.BritishShorthair;

// Call the 'meow' method added through augmentation.
cat1.meow();

let cat2 = new Cat();
cat2.type = CatType.Siamesecat;
cat2.meow();

export {};
