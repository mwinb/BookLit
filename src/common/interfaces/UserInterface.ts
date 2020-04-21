export interface UserInterface {
    id: string;
    name: string;
    email: string;
    clubs: string[];
    lastLogin: string;
    created: string;
}

export const DEFAULT_USER: UserInterface = {
    id: '',
    name: '',
    email: '',
    clubs: [],
    lastLogin: '',
    created: ''
}