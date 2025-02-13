// Интерфейс для отдельного отзыва
export interface Review {
  id: number;
  reviews_category_id: number;
  review_author: string;
  position_author_review: string;
  created_at: string; // Дата в формате ISO строки
  updated_at: string;
}

// Интерфейс для ответа API
export interface Reviews {
  status_code: number;
  message: string;
  data: Review[]; // Массив отзывов
}
