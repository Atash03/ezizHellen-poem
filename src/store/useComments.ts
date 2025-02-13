import { create } from 'zustand';

interface CommentsState {
  commentOpen: boolean;

  userComments: { comment_text: string }[];
  commentSucces: boolean;

  // setUserComments: (obj: { comment_text: string }[]) => void;
  setCommentOpen: (value: boolean) => void;
  setCommentSuccess: (value: boolean) => void;
  setComments: (comments: any[]) => void;
  clearComments: () => void;
}

export const useCommentsStore = create<CommentsState>((set) => ({
  userComments: JSON.parse(sessionStorage.getItem('userComments') || '[]'),
  commentSucces: false,
  commentOpen: false,
  setCommentOpen: (val) => set(() => ({ commentOpen: val })),

  // setUserComments: (obj) => set(() =>  ( return {[...userComments, obj]}))),

  setCommentSuccess: (val) => set(() => ({ commentSucces: val })),

  setComments: (userComments) => {
    sessionStorage.setItem('userComments', JSON.stringify(userComments));
    set({ userComments });
  },

  clearComments: () => {
    sessionStorage.removeItem('userComments');
    set({ userComments: [] });
  },
}));
