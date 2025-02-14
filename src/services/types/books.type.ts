export interface BooksType {
  status_code: number;
  message: string;
  data: Datum[];
}

export interface Datum {
  id: number;
  book_name: string;
  book_text: string;
  created_at: string;
  updated_at: string;
  image: Image | null;
  book: IBook;
}

export interface Image {
  id: number;
  disk_name: string;
  file_name: string;
  file_size: number;
  content_type: string;
  title: null;
  description: null;
  field: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
  path: string;
  extension: string;
}

interface IBook {
  id: number;
  disk_name: string;
  file_name: string;
  file_size: number;
  content_type: string;
  title: string | null;
  description: string | null;
  field: "book";
  sort_order: number;
  created_at: string;
  updated_at: string;
  path: string;
  extension: string;
}
