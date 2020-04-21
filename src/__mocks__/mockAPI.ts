import { MockDataBase } from "./mockDatabase";
import { UserInterface, ClubInterface } from "../common/interfaces";

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
        if (id) return await this.getUser(id);
    }

    async getUser(id: string): Promise<UserInterface | undefined> {
        const user = this._database._findUser(id);
        if (user) return user;
    }

    async getUsers(ids: string[]): Promise<UserInterface[] | undefined> {
        const users = this._database._findUsers(ids);
        if (users && users.length > 0) return users;
    }

    async getClub(id: string): Promise<ClubInterface | undefined> {
        const club = this._database._findClub(id);
        if (club) return club;
    }

    async getClubs(ids: string[]): Promise<ClubInterface[] | undefined> {
        const clubs = this._database._findClubs(ids);
        if (clubs && clubs.length > 0) return clubs;
    }

    async createClub(newClub: ClubInterface): Promise<string | undefined> {
        const id = this._database._addClub(newClub);
        return id;
    }

    async updateUser(updatedUser: UserInterface): Promise<string | undefined> {
        const user = this._database._updateUser(updatedUser);
        return user;
    }
}