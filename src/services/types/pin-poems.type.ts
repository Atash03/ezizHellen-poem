export interface PinnedPoems {
  pinned_poems: PinnedPoem[];
}

export interface PinnedPoem {
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
  pivot: Pivot;
}

export interface CoupletsPoem {
  textarea1: string;
}

export interface Pivot {
  user_id: number;
  poem_id: number;
}
