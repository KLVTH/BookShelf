const BOOKS = [
  {
    title: 'Favoritos',
    data: ['Livro 1', 'Livro 2', 'Livro 3'],
  },
  {
    title: 'Recentes',
    data: Array.from({ length: 2 }, (_, index) => String(index)),
  },
  {
    title: 'Livros',
    data: Array.from({ length: 10 }, (_, index) => String(index)),
  },
  {
    title: 'Documentos',
    data: Array.from({ length: 7 }, (_, index) => String(index)),
  },
  {
    title: 'AudioBook',
    data: Array.from({ length: 2 }, (_, index) => String(index)),
  },
];

const CATEGORIES = BOOKS.map((item) => item.title);

export { BOOKS, CATEGORIES };
