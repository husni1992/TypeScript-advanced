type Constructor<T = {}> = new (...args: any[]) => T;

function Dancer<T extends Constructor>(Base: T) {
  return class extends Base {
    dance() {
      console.log("Dancing");
    }
  };
}

function Singer<T extends Constructor>(Base: T) {
  return class extends Base {
    sing() {
      console.log("Singing");
    }
  };
}

class PerformanceArtist {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const MixinArtist = Singer(Dancer(PerformanceArtist));
const artist = new MixinArtist("Husny");
artist.name; // Husny
artist.sing(); // Output Husny is Singing
artist.dance(); // Output Dancing

export {};
