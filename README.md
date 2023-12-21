# Mastering TypeScript: From Basics to Advanced Features

TypeScript has become an essential tool in modern web development, empowering developers to write more maintainable and error-resistant code. This repository is your one-stop shop for mastering TypeScript, covering everything from core concepts to advanced features. More than just theory, you'll find practical examples for every feature, encouraging experimentation and adaptation to your own projects. I welcome your feedback and contributions to make this a valuable resource for the entire TypeScript community.

### Easy Navigation

To find examples and implementations of each TypeScript feature in this project, simply search by feature number. For instance, searching "feature #9" will lead you to examples and usage of Generics.

### Features We'll Explore

<details>
<summary>Basic Features</summary>

1. **Type Annotations**: Define types for variables, parameters, and return values to leverage TypeScript's static type checking.
   <br> Examples: [1](https://github.com/husni1992/TypeScript-advanced/blob/main/src/app/services/UserService.ts#L72)
   [2](https://github.com/husni1992/TypeScript-advanced/blob/main/src/app/services/UserService.ts#L89)
   [3](https://github.com/husni1992/TypeScript-advanced/blob/main/src/types/userTypes.ts#L36)
2. **Interfaces**: Create contracts for object structures, ensuring adherence to specified shapes.
   <br> Examples: [1](https://github.com/husni1992/TypeScript-advanced/blob/main/src/data/interfaces/IGenericDatabase.ts#L7)
   [2](https://github.com/husni1992/TypeScript-advanced/blob/main/src/types/userTypes.ts#L32)
3. **Classes**: Use object-oriented principles to construct objects with properties and methods.
   <br> Examples: [1](https://github.com/husni1992/TypeScript-advanced/blob/main/src/app/services/UserService.ts#L8)
   [2](https://github.com/husni1992/TypeScript-advanced/blob/main/src/data/repositories/MockUserDatabase.ts#L7)
4. **Enums**: Enumerate a set of named constants to improve code readability and maintainability.
   <br> Examples: [1](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/types/userTypes.ts#L21)
5. **Type Aliases**: Create custom type definitions to simplify complex type signatures and enhance code readability.
   <br> Examples: [1](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/config/featureFlags.ts#L4-L5)
   [2](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/types/userTypes.ts#L18)
6. **Nullable Types**: Work with values that may be `null` or `undefined`, denoted with a `?` for optional properties and variables.
   <br> Examples: [1](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/types/index.ts#L19)
   [3](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/types/userTypes.ts#L9-L10)

</details>

<details>
<summary>Intermediate Features</summary>

7. **Union Types**: Allow for a value to be one of several types, providing versatility in variable and function typing.
   <br> Examples: [1](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/experiments/real-world-samples/type-safe-logger-middleware/enhanced.ts#L7)
   [2](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/app/services/UserService.ts#L79)
8. **Intersection Types**: Combine types into one by merging their properties, creating a new type that has all the properties of the constituent types.
   <br> Examples: [1](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/types/index.ts#L20)
   [2](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/types/userTypes.ts#L13)
9. **Generics**: Design flexible and reusable components by creating types that work over a variety of values while maintaining type integrity.
   <br> Examples: [1](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/experiments/ts-features/conditional-types/exercise-1/enhanced.ts#L39)
   [2](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/experiments/ts-features/conditional-types/exercise-1/enhanced.ts#L57)
   [3](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/app/models/User.ts#L52)
   [4](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/types/index.ts#L18)
   [5](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/experiments/random-activities.ts#L66)
10. **Type Guards**: Apply runtime checks to determine the type of a variable and narrow its type within scope.
    <br> Examples: [1](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/app/models/User.ts#L15)
    [2](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/app/models/User.ts#L33)
    [3](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/app/services/UserService.ts#L22)
11. **Tuples**: Utilize fixed-length arrays with elements whose types are known, but not necessarily the same.
    <br> Examples: [1](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/app/models/User.ts#L39)
12. **Literal Types**: Constrain variables to specific values, offering a way to signal intent and enforce function contracts.
    <br> Examples: [1](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/app/models/User.ts#L47)
    [2](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/config/featureFlags.ts#L10)
    [3](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/app/middlewares/requestLogger.ts#L7)
    [4](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/experiments/real-world-samples/type-safe-event-emitter/functional-based/enhanced.ts#L7)
13. **Utility Types**: Leverage TypeScript's built-in utility types for common transformations and operations on types.
    <br> Examples: [1](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/config/featureFlags.ts#L21)
    [2](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/data/interfaces/IGenericDatabase.ts#L4)
    [3](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/types/index.ts#L19)
    [4](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/experiments/ts-features/conditional-types/exercise-1/enhanced.ts#L40)
14. **Namespaces**: Structure code with logical grouping and prevent pollution of the global scope.
<br> Examples: [1](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/types/custom.d.ts#L12)
[2](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/types/userTypes.ts#L2)
</details>

<details> 
<summary>Advanced Features</summary>

15. **Mapped Types**: Generate new types by transforming existing ones, iterating over their properties and applying modifications.
    <br> Examples: [1](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/types/index.ts#L18)
    [2](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/utils/typedObjectBuilder.ts#L22)
    [3](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/experiments/real-world-samples/type-safe-config-store/enhanced.ts#L55)
16. **Conditional Types**: Define types that are determined based on conditional logic, allowing for types to change based on the input types.
    <br> Examples: [1](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/types/userTypes.ts#L60)
    [2](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/experiments/real-world-samples/type-safe-event-emitter/class-based/enhanced.ts#L27)
    [3](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/experiments/real-world-samples/type-safe-config-store/enhanced.ts#L55)
17. **Decorators**: Functions that modify class, method, property, or parameter behavior and metadata at compile or runtime.
    <br> Examples: [1](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/decorators/requireAuthRole.ts#L7)
18. **Mixins**: Create classes that combine multiple classes or interfaces into one.
    <br> Examples: [1](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/experiments/ts-features/mixins/enhanced.ts#L43)
19. **Module Augmentation**: Enhance or modify existing modules by adding new properties or methods.
    <br> Examples: [1](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/experiments/ts-features/module-augmentation/augmented-cat.ts#L6)
    [2](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/types/custom.d.ts#L13)
20. **Advanced Generics**: Utilize generics to create highly reusable components capable of handling complex typing scenarios.
    <br> Examples: [1](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/experiments/real-world-samples/type-safe-config-store/enhanced.ts#L55)
    [2](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/utils/genericDataFilter.ts#L11)
    [3](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/src/types/userTypes.ts#L60)
    [4](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/experiments/real-world-samples/type-safe-event-emitter/class-based/enhanced.ts#L27)
21. **Template Literals**: Use template literal types to construct types based on template literal strings, introducing string manipulation capabilities into the type system.
<br> Examples: [1](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/experiments/real-world-samples/type-safe-config-store/enhanced.ts#L55)
[3](https://vscode.dev/github/husni1992/TypeScript-advanced/blob/main/experiments/real-world-samples/type-safe-event-emitter/functional-based/enhanced.ts#L7)
</details>

### 💡 Side Note

This project serves as a practical guide to TypeScript, focusing on demonstrating a wide range of TypeScript features from basic to advanced. While it showcases TypeScript features effectively, it might not always adhere to conventional best practices and does not intend to provide production-ready solutions for aspects like API design, configuration management, logging, error handling, authorization or unit testing. The primarily goal is to provide clear, isolated examples of TypeScript capabilities rather than presenting a model of a fully optimized application.
