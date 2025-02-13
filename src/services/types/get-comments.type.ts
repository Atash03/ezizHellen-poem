export interface UserCommentsType {
  comments: Comment[];
}

export interface Comment {
  id: number;
  comment_text: string;
  user_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface PageCommentsType {
  status_code: number;
  message: string;
  data: Datum[];
}

export interface Datum {
  id?: number;
  comment_text: string;
  user_id?: number;
  created_at?: string;
  updated_at?: string;
}
