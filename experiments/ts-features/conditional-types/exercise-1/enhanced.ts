// This implementation demonstrates some complex use of Generics and Mapped Types in TypeScript
// feature #16 Conditional Types define types that are determined based on conditional logic, allowing for types to change based on the input types
// feature #9 Generics enables reusable code for multiple data types with type safety
// feature #20 Advanced Generics enables more complex and flexible reusable code for multiple data types with type safety

import { bookMock, dvdMock, magazineMock } from "../mocks";

export type Book = {
  title: string;
  author: string;
  isbn: string;
  restrictedNotes: string;
};

export type Magazine = {
  title: string;
  issueNumber: string;
  restrictedNotes: string;
};

export type DVD = {
  title: string;
  director: string;
  rating: string;
  restrictedNotes: string;
};

enum UserRole {
  Admin = "ADMIN",
  Member = "MEMBER",
  Guest = "GUEST",
}

// Union type for any kind of library item.
type LibraryItem = Book | Magazine | DVD;

// Conditional type that picks certain properties from library items based on the user role 'Member'
// feature #13 Utility Types "Pick": Constructs a type by picking the set of properties Keys from Type
type MemberOnlyData<L extends LibraryItem> = L extends Book
  ? Pick<Book, "title" | "author" | "isbn">
  : L extends Magazine
    ? Pick<Magazine, "title" | "issueNumber">
    : L extends DVD
      ? Pick<DVD, "title" | "director" | "rating">
      : never;

// Conditional type that picks certain public-facing properties from library items based on the user role 'Guest'.
type PublicData<L extends LibraryItem> = L extends Book
  ? Pick<Book, "title" | "author">
  : L extends Magazine
    ? Pick<Magazine, "title">
    : L extends DVD
      ? Pick<DVD, "title" | "rating">
      : never;

// General conditional type for returning data based on user role and library item type.
type ItemDetailsByUserRole<L extends LibraryItem, R extends UserRole> = R extends UserRole.Admin
  ? L
  : R extends UserRole.Member
    ? MemberOnlyData<L>
    : PublicData<L>;

// Type guard functions to check the specific type of a library item.
function isBook(item: LibraryItem): item is Book {
  return (item as Book).isbn !== undefined;
}

function isMagazine(item: LibraryItem): item is Magazine {
  return (item as Magazine).issueNumber !== undefined;
}

function isDvd(item: LibraryItem): item is DVD {
  return (item as DVD).director !== undefined;
}

function pickData<T extends LibraryItem, K extends keyof T>(
  item: T,
  propertiesToPick: K[],
): Pick<T, K> {
  const pickedData: Partial<Pick<T, K>> = {};
  for (const property of propertiesToPick) {
    if (property in item) {
      pickedData[property] = item[property];
    }
  }
  return pickedData as Pick<T, K>;
}

// Function to extract data based on the user role and the type of library item.
function extractDataByRole<L extends LibraryItem, R extends UserRole>(item: L, userRole: R) {
  switch (userRole) {
    case UserRole.Admin: {
      return item;
    }

    case UserRole.Member: {
      if (isBook(item)) {
        return pickData(item, ["title", "author", "isbn"]);
      }

      if (isMagazine(item)) {
        return pickData(item, ["title", "issueNumber"]);
      }

      if (isDvd(item)) {
        return pickData(item, ["title", "director", "rating"]);
      }
    }

    case UserRole.Guest: {
      if (isBook(item)) {
        return pickData(item, ["title", "author"]);
      }

      if (isMagazine(item)) {
        return pickData(item, ["title"]);
      }

      if (isDvd(item)) {
        return pickData(item, ["title", "rating"]);
      }
    }
  }

  throw new Error("Invalid item type of user role");
}

// Using the function to get item details based on role and item type.
function getItemDetailsFilteredByRole<L extends LibraryItem, R extends UserRole>(
  item: L,
  userRole: R,
): ItemDetailsByUserRole<L, R> {
  return extractDataByRole(item, userRole) as ItemDetailsByUserRole<L, R>;
}

// Examples demonstrating TypeScript's type understanding in different scenarios:
const adminBook = getItemDetailsFilteredByRole(bookMock, UserRole.Admin);
const memberBook = getItemDetailsFilteredByRole(bookMock, UserRole.Member);
const guestBook = getItemDetailsFilteredByRole(bookMock, UserRole.Guest);

// Logging the results to demonstrate the different data accessible by each user role.
console.log({ adminBook, memberBook, guestBook });

/*
The above console.log outputs the following:

{
  adminBook: {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0743273565',
    restrictedNotes: 'This book contains sensitive content.'
  },
  memberBook: {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0743273565'
  },
  guestBook: { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' }
}
*/
