//feature #14 Conditional types: Demonstration of complex use of conditional types and Generics in TypeScript
//feature #6 Conditional types: Demonstration of complex use of Generics in TypeScript
//feature #21 Conditional types: Demonstration of complex use of Generics in TypeScript

import { bookMock, dvdMock, magazineMock } from "./mocks";

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
type LibraryItems = Book | Magazine | DVD;

// Conditional type that picks certain properties from library items based on the user role 'Member'
type MemberOnlyData<L extends LibraryItems> = L extends Book
  ? Pick<Book, "title" | "author" | "isbn">
  : L extends Magazine
  ? Pick<Magazine, "title" | "issueNumber">
  : L extends DVD
  ? Pick<DVD, "title" | "director" | "rating">
  : never;

// Conditional type that picks certain public-facing properties from library items based on the user role 'Guest'.
type PublicData<L extends LibraryItems> = L extends Book
  ? Pick<Book, "title" | "author">
  : L extends Magazine
  ? Pick<Magazine, "title">
  : L extends DVD
  ? Pick<DVD, "title" | "rating">
  : never;

// General conditional type for returning data based on user role and library item type.
type ItemDetailsByUserRole<L extends LibraryItems, R extends UserRole> = R extends UserRole.Admin
  ? L
  : R extends UserRole.Member
  ? MemberOnlyData<L>
  : PublicData<L>;

// Type guard functions to check the specific type of a library item.
function isBook(item: LibraryItems): item is Book {
  return (item as Book).isbn !== undefined;
}

function isMagazine(item: LibraryItems): item is Magazine {
  return (item as Magazine).issueNumber !== undefined;
}

function isDvd(item: LibraryItems): item is DVD {
  return (item as DVD).director !== undefined;
}

// Function to extract data based on the user role and the type of library item.
function extractDataByRole<L extends LibraryItems, R extends UserRole>(item: L, userRole: R) {
  switch (userRole) {
    case UserRole.Admin: {
      return item;
    }

    case UserRole.Member: {
      if (isBook(item)) {
        return { title: item.title, author: item.author, isbn: item.isbn };
      }

      if (isMagazine(item)) {
        return {
          title: item.title,
          issueNumber: item.issueNumber,
        };
      }

      if (isDvd(item)) {
        return {
          title: item.title,
          director: item.director,
          rating: item.rating,
        };
      }
    }

    case UserRole.Guest: {
      if (isBook(item)) {
        return { title: item.title, author: item.author };
      }

      if (isMagazine(item)) {
        return {
          title: item.title,
        };
      }

      if (isDvd(item)) {
        return {
          title: item.title,
          rating: item.rating,
        };
      }
    }
  }

  throw new Error("Invalid item type of user role");
}

// Using the function to get item details based on role and item type.
function getItemDetailsFilteredByRole<L extends LibraryItems, R extends UserRole>(
  item: L,
  userRole: R
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
s;
