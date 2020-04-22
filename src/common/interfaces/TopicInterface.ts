export interface TopicInterface {
    id: string,
    name: string,
    description: string,
    club: string,
    comments: string[],
    created: string,
}


export const DEFAULT_TOPIC: TopicInterface = {
    id: '',
    name: '',
    description: '',
    club: '',
    comments: [],
    created: '',
}