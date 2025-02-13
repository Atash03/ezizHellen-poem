export interface MomentsSingleType {
  status_code: number;
  message: string;
  data: Datum[];
}

export interface Datum {
  id: number;
  moment_name: string;
  moment_text: string;
  created_at: string;
  updated_at: string;
  main_image: Image;
  images: Image[];
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
