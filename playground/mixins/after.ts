/**
 * feature #16 Mixins in TypeScript
 * ---------------------------------
 * Mixins are a design pattern that allow a class to inherit (mix in) methods and properties from multiple sources.
 * This addresses the limitation of not being able to extend multiple classes, as TypeScript follows single inheritance.
 *
 * What problem is solved:
 * - Mixins enable an object to combine multiple behaviors from different classes.
 * - This is particularly useful when a class needs to exhibit functionalities from various unrelated classes.
 * - They allow for more flexible and reusable code without duplicating logic across the codebase.
 */

type Constructor<T = {}> = new (...args: any[]) => T;

function Dancer<T extends Constructor<PerfArtist>>(Base: T) {
  return class extends Base {
    dance() {
      console.log(`${this.name} is Dancing`);
    }
  };
}

function Singer<T extends Constructor<PerfArtist>>(Base: T) {
  return class extends Base {
    sing() {
      console.log(`${this.name} is Singing`);
    }
  };
}

interface PerfArtist {
  name: string;
}

class PerformanceArtist implements PerfArtist {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const MixinArtist = Dancer(Singer(PerformanceArtist));
const artist = new MixinArtist("Husny");
artist.sing(); // Output Husny is Singing
artist.dance(); // Output Dancing

export {};
