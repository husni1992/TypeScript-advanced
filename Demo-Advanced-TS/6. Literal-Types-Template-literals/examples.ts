// Literal types
type Alignments = "left" | "right" | "center";

// Strings
function printText(s: string, alignment: Alignments) {
  // print logic
}

printText("sometext", "left");

// Numeric
// Function to handle HTTP responses with specific status codes
function handleHttpResponse(code: 200 | 400, message: string) {
  if (code === 200) {
    console.log(`Success: ${message}`);
  } else if (code === 400 || code === 404) {
    console.error(`Client error (${code}): ${message}`);
  }
}

handleHttpResponse(400, "error");

export {};
