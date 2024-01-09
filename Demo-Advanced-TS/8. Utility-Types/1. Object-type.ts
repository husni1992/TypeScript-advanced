// ------------------------------------------------

// example 1
enum StatusEnum {
  Active = "Active",
  Inactive = "Inactive",
  Pending = "Pending",
}

type StatusLiterals = "Active" | "Inactive" | "Pending";

const statusMessage: Record<StatusEnum, string> = {
  Active: "User is active",
  Inactive: "User is inactive",
  Pending: "User registration is pending",
  FooBar: "assas",
};

// ------------------------------------------------

// example 2
type HttpCodes = 404 | 500 | 403;

const errorMessageMapper: any = {
  404: "Not Found",
  500: "Internal Server Error",
  403: "Forbidden",
};

// ------------------------------------------------

// example 3
type Role = "admin" | "user" | "guest";

const roleAccess: Record<Role, string[]> = {
  admin: "",
  user: ["read", "write"],
  guest: ["read"],
};

// ------------------------------------------------

export {};
