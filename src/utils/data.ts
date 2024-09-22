const BOOKS = [
  {
    title: "Favoritos",
    data: [
      {
        id: "1",
        name: "teste",
        uri: "/data/user/0/com.KLVTH.BookShelf281/cache/DocumentPicker/9fda500b-bd5a-4b26-9251-038d9dba03a7.pdf",
      },
      {
        id: "2",
        name: "Item 1-2",
        uri: "/data/user/0/com.KLVTH.BookShelf281/cache/DocumentPicker/7402ad3a-d4cf-4408-8049-2a7e177d66d8.pdf",
      },
      {
        id: "3",
        name: "Item 1-3",
        uri: "/data/user/0/com.KLVTH.BookShelf281/cache/DocumentPicker/a7ae53d8-8dbf-4bbe-9c39-d834b38cf519.pdf",
      },
    ],
  },
  {
    title: "Recentes",
    data: [
      {
        id: "4",
        name: "Item 1-1",
        uri: "/data/user/0/com.KLVTH.BookShelf281/cache/DocumentPicker/a7ae53d8-8dbf-4bbe-9c39-d834b38cf519.pdf",
      },
      {
        id: "5",
        name: "Item 1-2",
        uri: "/data/user/0/com.KLVTH.BookShelf281/cache/DocumentPicker/7402ad3a-d4cf-4408-8049-2a7e177d66d8.pdf",
      },
      {
        id: "6",
        name: "Item 1-3",
        uri: "/data/user/0/com.KLVTH.BookShelf281/cache/DocumentPicker/160afced-d161-4cc2-b014-2af410b978c0.pdf",
      },
    ],
  },
  {
    title: "Livros",
    data: [
      {
        id: "7",
        name: "Item 1-1",
        uri: "/data/user/0/com.KLVTH.BookShelf281/cache/DocumentPicker/a7ae53d8-8dbf-4bbe-9c39-d834b38cf519.pdf",
      },
      {
        id: "8",
        name: "Item 1-2",
        uri: "/data/user/0/com.KLVTH.BookShelf281/cache/DocumentPicker/7402ad3a-d4cf-4408-8049-2a7e177d66d8.pdf",
      },
      {
        id: "9",
        name: "Item 1-3",
        uri: "/data/user/0/com.KLVTH.BookShelf281/cache/DocumentPicker/160afced-d161-4cc2-b014-2af410b978c0.pdf",
      },
    ],
  },
  {
    title: "Documentos",
    data: [
      {
        id: "10",
        name: "Item 1-1",
        uri: "/data/user/0/com.KLVTH.BookShelf281/cache/DocumentPicker/a7ae53d8-8dbf-4bbe-9c39-d834b38cf519.pdf",
      },
      {
        id: "11",
        name: "Item 1-2",
        uri: "/data/user/0/com.KLVTH.BookShelf281/cache/DocumentPicker/7402ad3a-d4cf-4408-8049-2a7e177d66d8.pdf",
      },
      {
        id: "12",
        name: "Item 1-3",
        uri: "/data/user/0/com.KLVTH.BookShelf281/cache/DocumentPicker/160afced-d161-4cc2-b014-2af410b978c0.pdf",
      },
    ],
  },
];

const CATEGORIES = BOOKS.map((item) => item.title);

export { BOOKS, CATEGORIES };
