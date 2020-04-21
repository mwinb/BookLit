import { ClubInterface, UserInterface } from "../common/interfaces";
import { mockClubs, mockUsers, mockCredentials } from ".";

export class MockDataBase {
    private static _instance: MockDataBase;
    _mockClubs: ClubInterface[] = mockClubs;
    _mockUsers: UserInterface[] = mockUsers;
    _mockCredentials = mockCredentials;
    private constructor() {
    }

    static getInstance(): MockDataBase {
        if (!this._instance) {
            this._instance = new MockDataBase();
        }
        return this._instance;
    }
    // Will be using google auth or keycloak this is just for demo
    _login(email: string, password: string): string | undefined {
        let id = undefined;
        for (const credential of this._mockCredentials) {
            if (credential.email === email && credential.password === password)
                id = credential.id;
        }
        return id;
    }

    _findUser(id: string): UserInterface | undefined {
        return this._mockUsers.find(user => {
            return user.id === id;
        });
    }

    _findUsers(ids: string[]): UserInterface[] | undefined {
        const users: UserInterface[] = []
        return ids.reduce((users, id) => {
            const user = this._findUser(id);
            if (user !== undefined)
                return [...users, user];
            else return users;
        }, users);
    }

    _updateUser(user: UserInterface): string | undefined {
        let updatedUser = this._findUser(user.id);
        if (updatedUser) {
            updatedUser = { ...user, id: updatedUser.id }
            this._mockUsers = this._mockUsers.map((currentUser) => {
                if (updatedUser && currentUser.id === updatedUser.id)
                    return updatedUser
                else
                    return user;
            });
        }
        return updatedUser?.id;
    }

    _addClub(createdClub: ClubInterface): string | undefined {
        let newClub = { ...createdClub, id: `${this._mockClubs.length + 1}`, created: new Date().toJSON() };
        this._mockClubs.push(newClub);
        return newClub.id;
    }

    _findClub(id: string): ClubInterface | undefined {
        return this._mockClubs.find(club => {
            return club.id === id;
        })
    }

    _findClubs(ids: string[]): ClubInterface[] | undefined {
        const clubs: ClubInterface[] = [];
        return ids.reduce((clubs, id) => {
            const club = this._findClub(id);
            if (club)
                return [...clubs, club]
            else
                return clubs
        }, clubs);
    }
}