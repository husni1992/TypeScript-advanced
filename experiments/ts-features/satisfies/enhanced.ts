interface User {
  name: string;
  age: number;
}

const user = { name: "Alice", age: 30, email: "alice@example.com" } satisfies User;

// TypeScript knows `user` satisfies User but also retains the additional `email` property's type information.

export {};
