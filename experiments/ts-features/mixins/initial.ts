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

class AuthorWithSingerAndDancer extends SingerWithDancer{
  write(){
    console.log('Writing')
  }
}

// class PerformingArtist extends SingerWithDancer {}

const artist = new AuthorWithSingerAndDancer();
artist.dance();
artist.sing();
artist.write

export {};

