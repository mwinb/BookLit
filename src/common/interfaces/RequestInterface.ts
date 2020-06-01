export interface RequestInterface {
    id: string,
    clubId: string,
    userId: string,
    userName: string,
    message: string,
    requestDate: string,
}


export const DEFAULT_REQUEST_INTERFACE: RequestInterface = {
    id: '',
    clubId: '',
    userId: '',
    userName: '',
    message: '',
    requestDate: '',
}