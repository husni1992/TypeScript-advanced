import { InternalProject } from "./eg-2";

// A type or interface "Ticket" from a namespace can only be assigned as type
const foo: InternalProject.Ticket;

// function can be directly picked up from a namespace
InternalProject.test()