export interface CommentInterface {
    id: string,
    parentId: string,
    parentType: string,
    user?: string,
    anonymous: boolean,
    created: string,
    comments: string[],
}