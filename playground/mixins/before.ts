class Dancer {
  dance() {
    console.log("Dancing");
  }
}

class SingerWithDancer extends Dancer {
  sing() {
    console.log("Singing");
  }
}

class PerformingArtist extends SingerWithDancer {}

const artist = new PerformingArtist();
artist.dance();
artist.sing();

export {};
