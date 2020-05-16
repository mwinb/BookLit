export interface UserInterface {
    id: string;
    username: string;
    clubs: string[];
    lastLogin: string;
    created: string;
}

export const DEFAULT_USER: UserInterface = {
    id: '',
    username: '',
    clubs: [],
    lastLogin: '',
    created: ''
}