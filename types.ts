export interface CollectionItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
