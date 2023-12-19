import { Book, DVD, Magazine } from "./exercise-1-improved";

export const bookMock: Book = {
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  isbn: "978-0743273565",
  restrictedNotes: "This book contains sensitive content.",
};

export const magazineMock: Magazine = {
  title: "National Geographic",
  issueNumber: "April 2023",
  restrictedNotes: "This magazine contains confidential information.",
};

export const dvdMock: DVD = {
  title: "Inception",
  director: "Christopher Nolan",
  rating: "PG-13",
  restrictedNotes: "Viewer discretion is advised due to intense scenes.",
};
