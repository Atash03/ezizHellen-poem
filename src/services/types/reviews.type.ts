// Интерфейс для отдельного отзыва
export interface Review {
  id: number;
  reviews_category_id: number;
  review_author: string;
  position_author_review: string;
  created_at: string; // Дата в формате ISO строки
  updated_at: string;
  review_text: string;
  link: string;
  file: IReviewFile;
}

export interface IReviewFile {
  id: number;
  disk_name: string;
  file_name: string;
  file_size: number;
  content_type: string;
  title: string | null;
  description: string | null;
  field: "file";
  sort_order: number;
  created_at: string;
  updated_at: string;
  path: string;
  extension: string;
}

// Интерфейс для ответа API
export interface Reviews {
  status_code: number;
  message: string;
  data: Review[]; // Массив отзывов
}
