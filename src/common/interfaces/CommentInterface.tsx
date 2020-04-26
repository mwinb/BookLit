export const ANON_USER: string = 'ANON';

export interface CommentInterface {
  id: string;
  user: string;
  topic: string;
  message: string;
  created: string;
  agreements: string[];
  reports: string[];
}

export const DEFAULT_COMMENT: CommentInterface = {
  id: '',
  user: ANON_USER,
  topic: '',
  message: '',
  created: '',
  agreements: [],
  reports: [],
};
