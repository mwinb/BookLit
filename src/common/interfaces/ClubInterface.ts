
export interface ClubInterface {
    id: string,
    name: string,
    book: string,
    description: string,
    members: string[],
    joinRequests: { id: string, message: string }[],
    generalChat: string,
    owner: string,
    topics: string[],
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
    topics: [],
    created: '',
    public: false,
    generalChat: '',
    joinRequests: [],
}