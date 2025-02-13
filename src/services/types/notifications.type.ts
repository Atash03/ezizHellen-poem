export interface NotificationsType {
  notifications: Notification[];
}

export interface Notification {
  id: number;
  user_id: number;
  title: string;
  text: string;
  created_at: string;
  updated_at: string;
}
