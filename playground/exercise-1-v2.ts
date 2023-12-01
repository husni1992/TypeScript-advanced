// Demonstration of complex conditional types and Generics in TypeScript

type Book = {
  title: string;
  author: string;
  isbn: string;
  restrictedNotes: string;
};

type Magazine = {
  title: string;
  issueNumber: string;
  restrictedNotes: string;
};

type DVD = {
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

type LibraryItems = Book | Magazine | DVD;
type MemberOnlyData = Pick<Book, "title" | "author" | "isbn"> | Pick<Magazine, "title" | "issueNumber"> | Pick<DVD, "title" | "director" | "rating">;
type PublicData = Pick<Book, "title" | "author"> | Pick<Magazine, "title"> | Pick<DVD, "title" | "rating">;

type ItemDetailsByUserRole<T> = T extends UserRole.Admin ? LibraryItems : T extends UserRole.Member ? MemberOnlyData : PublicData;

function isBook(item: LibraryItems): item is Book {
  return (item as Book).isbn !== undefined;
}

function isMagazine(item: LibraryItems): item is Magazine {
  return (item as Magazine).issueNumber !== undefined;
}

function isDvd(item: LibraryItems): item is DVD {
  return (item as DVD).director !== undefined;
}

function extractDataByRole(item: LibraryItems, role: UserRole): LibraryItems | MemberOnlyData | PublicData {
  switch (role) {
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

function getItemDetailsFilteredByRole<T extends UserRole>(item: LibraryItems, userRole: UserRole): ItemDetailsByUserRole<T> {
  return extractDataByRole(item, userRole) as ItemDetailsByUserRole<T>;
}
