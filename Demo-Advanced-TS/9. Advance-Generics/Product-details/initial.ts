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

// Function to get product details
function getProductDetails(product, role) {
  if (role === UserRole.SystemAdmin) {
    // SystemAdmin has access to all product information
    return product;
  } else {
    // Customer view excludes inventory count and supplier information
    const { inventoryCount, supplierInfo, ...customerView } = product;
    return customerView;
  }
}

// Example usage
const newProduct = new Product("Smartphone", 299.99, 50, "Supplier XYZ");

const adminView = getProductDetails(newProduct, UserRole.SystemAdmin); // Full access
const customerView = getProductDetails(newProduct, UserRole.Customer); // Limited access

export {};
