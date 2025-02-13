import { CoupletsPoem } from "./pin-poems.type";

export interface PoemsType {
  status_code: number;
  message: string;
  data: Poem[];
}

export interface Poem {
  id: number;
  poem_name: string;
  couplets_poem: CoupletsPoem[];
  about_poems: string;
  place_poem: string;
  date_poem: string;
  new: number;
  title: string;
  created_at: string;
  updated_at: string;
  audio_file: AudioFile;
}

export interface AudioFile {
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
