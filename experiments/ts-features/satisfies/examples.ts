namespace N1 {
  type Colors = "red" | "green" | "blue";
  type RGB = [red: number, green: number, blue: number];
  const palette: Record<Colors, string | RGB> = {
    red: [255, 0, 0],
    green: "#00ff00",
    bleu: [0, 0, 255],
    //  ~~~~ The typo is now correctly detected
  };
  // But we now have an undesirable error here - 'palette.red' "could" be a string.
  const redComponent = palette.red.at(0);
}

namespace N2 {
  type Colors = "red" | "green" | "blue";
  type RGB = [red: number, green: number, blue: number];
  const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
    blue: [0, 0, 255],
    //  ~~~~ The typo is now caught!
  } satisfies Record<Colors, string | RGB>;

  // Both of these methods are still accessible!
  const redComponent = palette.red.at(0);
  const greenNormalized = palette.green.toUpperCase();
}

namespace N3 {
  type MyType = {
    a: number;
    b: string;
  };

  const myVar = { a: 10, b: "hello", c: true };

  // Using 'satisfies' to check if 'myVar' matches 'MyType'
  let foo = myVar satisfies MyType;
}
