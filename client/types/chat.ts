export interface Doc {
  pageContent?: string;
  metadata?: {
    loc?: {
      pageNumber?: number;
    };
    source?: string;
  };
}

export interface Message {
  id: string;
  role: 'assistant' | 'user';
  content?: string;
  documents?: Doc[];
  timestamp: Date;
}
