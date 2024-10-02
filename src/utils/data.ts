// Definição dos tipos
interface BookItem {
  id: string;
  name: string;
  uri: string;
}

interface Section {
  title: string;
  data: BookItem[];
}

// Dados da seção
const BOOKS: Section[] = [
 
];

// Categorias baseadas nos livros
const CATEGORIES = BOOKS.map((item) => item.title);

export { BOOKS, CATEGORIES, Section, BookItem };
