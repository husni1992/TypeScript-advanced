type Book = {
  title: string;
  author: string;
  isbn: string;
  restrictedNotes: string[];
};

type Magazine = {
  issueNumber: string;
} & Book;

type DVD = {
  director: string;
  rating: string;
} & Book;

type LibraryItem = Magazine & DVD;

const mockBookData: LibraryItem = {
  title: "The TypeScript Chronicles",
  author: "Jane Doe",
  isbn: "978-3-16-148410-0",
  rating: "4.5",
  director: "NewMan",
  restrictedNotes: ["Members only section notes"],
  issueNumber: "1122223",
};

enum UserRoles {
  Admin = "ADMIN",
  Member = "MEMBER",
  Guest = "GUEST",
}

// type ExcludeProps<Type, PropsToExclude extends keyof Type> = {
//   [Prop in Exclude<keyof Type, PropsToExclude>]: Type[Prop];
// };

export type ConType<T extends UserRoles> = T extends UserRoles.Admin
  ? LibraryItem
  : T extends UserRoles.Member
    ? Omit<LibraryItem, "restrictedNotes" | "issueNumber">
    : never;

function fetchLibraryItemDetails<T extends UserRoles>(userRole: T): ConType<T> {
  if (userRole === UserRoles.Admin) {
    return mockBookData as ConType<T>;
  }

  if (userRole === UserRoles.Member) {
    return {
      title: mockBookData.title,
      author: mockBookData.author,
      isbn: mockBookData.isbn,
      rating: mockBookData.rating,
      director: mockBookData.director,
    } as ConType<T>;
  }

  throw new Error("error ");
}

const a = fetchLibraryItemDetails(UserRoles.Admin);
const m = fetchLibraryItemDetails(UserRoles.Member);
