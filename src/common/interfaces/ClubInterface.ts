
export interface ClubInterface {
    id: string,
    name: string,
    book: string,
    description: string,
    members: string[],
    joinRequests: { user: string, message: string }[],
    generalChat: string,
    owner: string,
    created: string,
    public: boolean,
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
    joinRequests: [],
}