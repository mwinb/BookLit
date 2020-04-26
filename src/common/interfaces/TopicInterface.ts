export interface TopicInterface {
    id: string,
    name: string,
    description: string,
    club: string,
    created: string,
    public: boolean,
}


export const DEFAULT_TOPIC: TopicInterface = {
    id: '',
    name: '',
    description: '',
    club: '',
    created: '',
    public: false,
}