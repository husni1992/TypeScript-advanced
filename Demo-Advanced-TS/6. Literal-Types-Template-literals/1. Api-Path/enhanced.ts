// Literal types
type UserRole = "admin" | "user" | "guest";

// Generics + Template literal type for generating API paths
type UserApiPath<Role extends UserRole> = `/${Role}/profile`;

function fetchUserProfile<Role extends UserRole>(path: UserApiPath<Role>): Promise<Response> {
  return fetch(path); // fetches data from the API using the typed path
}

// Specific paths based on user roles
const adminPath: UserApiPath<"admin"> = "/admin/profile"; // "/admin/profile"
const userPath: UserApiPath<"user"> = "/user/profile"; // "/user/profile"
const guestPath: UserApiPath<"guest"> = "/guest/profile"; // "/guest/profile"

fetchUserProfile("/admin/profile");
fetchUserProfile("/guest/profile");

export {};
