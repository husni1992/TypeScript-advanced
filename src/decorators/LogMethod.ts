export function LogMethod(target: any, propertyName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    // Log the method call details
    console.log(`Calling method: ${propertyName}`);
    console.log(`Arguments: ${args.map((a) => JSON.stringify(a)).join(", ")}`);

    // Call the original method and return its result
    const result = originalMethod.apply(this, args);
    return result;
  };

  return descriptor;
}
