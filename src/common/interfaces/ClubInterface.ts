
export interface ClubInterface {
    id: string,
    name: string,
    book: string,
    description: string,
    members: string[],
    generalChat: string,
    owner: string,
    created: string,
    public: boolean,
    requests: string[],
}


export const DEFAULT_CLUB: ClubInterface = {
    id: '',
    name: '',
    book: '',
    description: '',
    members: [],
    owner: '',
    created: '',
    public: false,
    generalChat: '',
    requests: [],
}