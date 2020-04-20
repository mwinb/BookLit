import MockUsers from './mockUsers.json'
import MockClubs from './mockClubs.json'
import MockCredentials from './mockLogin.json'
import { ClubInterface, UserInterface } from "../common/interfaces";

export class MockDataBase {
    private static _instance: MockDataBase;
    _mockClubs: ClubInterface[] = MockClubs;
    _mockUsers: UserInterface[] = MockUsers;
    _mockCredentials = MockCredentials;
    private constructor() {
    }

    static getInstance(): MockDataBase {
        if (!this._instance) {
            this._instance = new MockDataBase();
        }
        return this._instance;
    }
    // Will be using google auth or keycloak this is just for demo
    _login(email: string, password: string): number | undefined {
        let id = undefined;
        for (const credential of this._mockCredentials) {
            if (credential.email === email && credential.password === password)
                id = credential.id;
        }
        return id;
    }

    _findUser(id: number): UserInterface | undefined {
        return this._mockUsers.find(user => {
            return user.id === id;
        });
    }

    _findUsers(ids: number[]): UserInterface[] | undefined {
        const users: UserInterface[] = []
        return ids.reduce((users, id) => {
            const user = this._findUser(id);
            if (user !== undefined)
                return [...users, user];
            else return users;
        }, users);
    }

    _findClub(id: number): ClubInterface | undefined {
        return this._mockClubs.find(club => {
            return club.id === id;
        })
    }

    _findClubs(ids: number[]): ClubInterface[] | undefined {
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