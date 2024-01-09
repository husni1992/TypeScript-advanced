type UserRole = "admin" | "user" | "guest";

// allowed pattern for path
// /{userRole}/profile

type UserApiPath<Role extends UserRole> = `${Role}/profile`;

// Fix this to accept correct path
function fetchUserProfile<T extends UserRole>(path: UserApiPath<T>): Promise<Response> {
  return fetch(path); // fetches data from the API using the typed path
}

const data = fetchUserProfile<"admin">("admin/profile");

export {};
