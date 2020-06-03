export interface RequestInterface {
  id: string;
  clubId: string;
  userId: string;
  username: string;
  message: string;
  requestDate: string;
}

export const DEFAULT_REQUEST_INTERFACE: RequestInterface = {
  id: '',
  clubId: '',
  userId: '',
  username: '',
  message: '',
  requestDate: '',
};
