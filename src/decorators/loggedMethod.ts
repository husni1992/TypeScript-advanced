// feature #17 Decorators are functions that modify class, method, property, or parameter behavior and metadata at compile or runtime.
export function loggedMethod(headMessage = "LOG:") {
  return function actualDecorator(originalMethod: any, context: ClassMethodDecoratorContext) {
    const methodName = String(context.name);

    function replacementMethod(this: any, id: string, hobbies: string[]) {
      console.log(`LOG: Entering method '${methodName}'. hobbies: ${hobbies}`);

      const result = originalMethod.call(this, id, hobbies);

      console.log(`LOG: Exiting method '${methodName}'.`);

      return result;
    }
    return replacementMethod;
  };
}
