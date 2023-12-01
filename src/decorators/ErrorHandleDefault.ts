export function handleError(originalMethod: any, context: ClassMethodDecoratorContext) {
  return function replacementMethod(this: any, ...args: any[]) {
    try {
      originalMethod.call(this, ...args);
    } catch (err) {
      const error = err as Error;
      const errorMessage = `Error thrown from ${String(context.name)}: ${error.message}`;
      console.log(errorMessage);
    }
  };
}
