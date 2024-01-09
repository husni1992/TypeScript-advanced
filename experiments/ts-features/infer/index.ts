// TS utility to extract a type inside an array
type ExtractArrayType<T> = T extends Array<infer U> ? U : never;

// example 1
type ObjectArray = Array<{ name: string; age: number }>;
type ExtractedType1 = ExtractArrayType<ObjectArray>; // should be '{ name: string; age: number }'

// example 2
type NestedArray = number[][];
type ExtractedType2 = ExtractArrayType<NestedArray>; // should be number []

// example 3
type NonArray = string;
type ExtractedType3 = ExtractArrayType<NonArray>; // should be never
