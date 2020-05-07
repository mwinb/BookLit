import { TopicInterface } from './../common/interfaces/TopicInterface';
import { MockDataBase } from "./mockDatabase";
import { UserInterface, ClubInterface, CommentInterface } from "../common/interfaces";


export async function login(email: string, password: string): Promise<UserInterface | undefined> {
    const id = MockDataBase.getInstance()._login(email, password);
    if (id) return await getUserById(id);
}

export async function getUserById(id: string): Promise<UserInterface | undefined> {
    return MockDataBase.getInstance()._findUser(id);
}

export async function getUsersByIds(ids: string[]): Promise<UserInterface[] | undefined> {
    return MockDataBase.getInstance()._findUsers(ids);

}

export async function updateUser(updatedUser: UserInterface): Promise<string | undefined> {
    return MockDataBase.getInstance()._updateUser(updatedUser);
}

export async function getClubById(id: string): Promise<ClubInterface | undefined> {
    return MockDataBase.getInstance()._findClub(id);
}

export async function getClubsByIds(ids: string[]): Promise<ClubInterface[] | undefined> {
    return MockDataBase.getInstance()._findClubs(ids);
}

export async function createClub(newClub: ClubInterface): Promise<string | undefined> {
    return MockDataBase.getInstance()._addClub(newClub);
}

export async function getTopicById(topicId: string): Promise<TopicInterface | undefined> {
    return MockDataBase.getInstance()._findTopic(topicId);
}

export async function getTopicsByClub(clubId: string): Promise<TopicInterface[] | undefined> {
    return MockDataBase.getInstance()._findTopics(clubId);
}

export async function addTopic(topic: TopicInterface): Promise<string | undefined> {
    return MockDataBase.getInstance()._addTopic(topic);
}

export async function deleteTopic(topicId: string): Promise<boolean> {
    const response = MockDataBase.getInstance()._deleteTopic(topicId);
    return response ? true : false;
}

export async function updateTopic(topic: TopicInterface): Promise<string | undefined> {
    return MockDataBase.getInstance()._updateTopic(topic);
}

export async function getCommentsByTopic(topicId: string): Promise<CommentInterface[] | undefined> {
    return MockDataBase.getInstance()._findComments(topicId);
}

export async function addComment(comment: CommentInterface): Promise<string | undefined> {
    return MockDataBase.getInstance()._addComment(comment);
}

export async function updateComment(comment: CommentInterface): Promise<string | undefined> {
    return MockDataBase.getInstance()._updateComment(comment);
}
