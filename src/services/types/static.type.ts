export interface StaticType {
  status_code: number;
  message: string;
  data: Datum[];
}

export interface Datum {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  word: Word[];
}

export interface Word {
  id: number;
  key: string;
  word: string;
  created_at: string;
  updated_at: string;
  page_id: number;
}
