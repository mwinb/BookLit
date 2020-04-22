import { TopicInterface } from './../common/interfaces/TopicInterface';
import { MockDataBase } from "./mockDatabase";
import { UserInterface, ClubInterface, CommentInterface } from "../common/interfaces";

// This will all be replaced once I begin building the back end API.
// For now it provides names, design, and asynchronous calls to use on front ent. 
export class API {
    static _instance: API;
    _database = MockDataBase.getInstance();

    private constructor() { }

    static getInstance(): API {
        if (!this._instance) {
            this._instance = new API();
        }
        return this._instance;
    }

    // Will be replaced with 3rd party authentication (google/keycloak/firebase) just need to simulate login flow. 
    async login(email: string, password: string): Promise<UserInterface | undefined> {
        const id = this._database._login(email, password);
        if (id) return await this.getUserById(id);
    }

    async getUserById(id: string): Promise<UserInterface | undefined> {
        return this._database._findUser(id);
    }

    async getUsersByIds(ids: string[]): Promise<UserInterface[] | undefined> {
        return this._database._findUsers(ids);

    }

    async updateUser(updatedUser: UserInterface): Promise<string | undefined> {
        return this._database._updateUser(updatedUser);
    }

    async getClubById(id: string): Promise<ClubInterface | undefined> {
        return this._database._findClub(id);
    }

    async getClubsByIds(ids: string[]): Promise<ClubInterface[] | undefined> {
        return this._database._findClubs(ids);
    }

    async createClub(newClub: ClubInterface): Promise<string | undefined> {
        return this._database._addClub(newClub);
    }

    async getTopicById(topicId: string): Promise<TopicInterface | undefined> {
        return this._database._findTopic(topicId);
    }

    async getTopicsByClub(clubId: string): Promise<TopicInterface[] | undefined> {
        return this._database._findTopics(clubId);
    }

    async addTopic(topic: TopicInterface): Promise<string | undefined> {
        return this._database._addTopic(topic);
    }

    async updateTopic(topic: TopicInterface): Promise<string | undefined> {
        return this._database._updateTopic(topic);
    }

    async getCommentsByTopic(topicId: string): Promise<CommentInterface[] | undefined> {
        return this._database._findComments(topicId);
    }

    async addComment(comment: CommentInterface): Promise<string | undefined> {
        return this._database._addComment(comment);
    }

    async updateComment(comment: CommentInterface): Promise<string | undefined> {
        return this._database._updateComment(comment);
    }
}