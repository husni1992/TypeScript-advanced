// Define response types for different API endpoints
type UserResponse = { user: { id: string; name: string } };
type OrderResponse = { order: { id: string; items: string[] } };
type NotFoundResponse = { error: string };

// Define a conditional type that will determine the return type based on the endpoint
type ApiResponse<T> = T extends "user"
  ? UserResponse
  : T extends "order"
    ? OrderResponse
    : NotFoundResponse;

// A function that fetches data from an API and uses the conditional type for its return type
async function fetchApiData<T extends string>(endpoint: T): Promise<ApiResponse<T>> {
  const response = await fetch(`https://api.example.com/${endpoint}`);
  const data = await response.json();
  return data as ApiResponse<T>;
}

// Usage
async function getUserData() {
  const userData = await fetchApiData("user"); // userData is of type UserResponse
}

async function getOrderData() {
  const orderData = await fetchApiData("order"); // orderData is of type OrderResponse
}
