interface BookItem {
  pageCount: number;
  id: string;
  name: string;
  uri: string;
  addedDate: string; 
}

interface Section {
  title: string;
  data: BookItem[];
}

const BOOKS: Section[] = [
 
];

const CATEGORIES = BOOKS.map((item) => item.title);

export { BOOKS, CATEGORIES, Section, BookItem };
