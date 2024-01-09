// Product class
class Product {
  constructor(
    public name: string,
    public price: number,
    public inventoryCount: number,
    public supplierInfo: string,
  ) {}
}

// User roles
enum UserRole {
  SystemAdmin,
  Customer,
}

type LimitedAccess<T> = Omit<T, "inventoryCount" | "supplierInfo">;

// Conditional type for product details based on the user role
type ProductDetails<T extends Product, R extends UserRole> = R extends UserRole.SystemAdmin
  ? T
  : LimitedAccess<T>;

// Function to get product details
function getProductDetails<T extends Product, R extends UserRole>(
  product: T,
  role: R,
): ProductDetails<T, R> {
  if (role === UserRole.SystemAdmin) {
    // SystemAdmin has access to all product information
    return product as ProductDetails<T, R>;
  } else {
    // Customer view excludes inventory count and supplier information
    const { inventoryCount, supplierInfo, ...customerView } = product;
    return customerView as ProductDetails<T, R>;
  }
}

// Example usage
const newProduct = new Product("Smartphone", 299.99, 50, "Supplier XYZ");

// Below variables are strongly typed
const adminView = getProductDetails(newProduct, UserRole.SystemAdmin); // Full access
const customerView = getProductDetails(newProduct, UserRole.Customer); // Limited access

export {};
