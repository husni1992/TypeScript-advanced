// add drive method
import { Car } from "./Car";

declare module "./Car" {
  interface Car {
    drive(): string;
  }
}
