interface User {
    name: string;
    age: number;
  }
  
  const user = { name: "Alice", age: 30, email: "alice@example.com" } as User;
  
  // TypeScript thinks `user` is of type User, losing the information about the email property.
  