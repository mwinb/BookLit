
import { ClubInterface, UserInterface, TopicInterface, CommentInterface, DEFAULT_TOPIC } from "../common/interfaces";
import { mockClubs, mockUsers, mockTopics, mockComments, mockCredentials } from ".";

export class MockDataBase {
    private static _instance: MockDataBase;
    _mockClubs: ClubInterface[] = mockClubs;
    _mockUsers: UserInterface[] = mockUsers;
    _mockTopics: TopicInterface[] = mockTopics;
    _mockComments: CommentInterface[] = mockComments;
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
        let index = this._mockClubs.findIndex(e => e.id === user.id);
        if (index) {
            this._mockUsers[index] = { ...user };
            return user.id;
        }
    }

    _updateClub(club: ClubInterface): string | undefined {
        let index = this._mockClubs.findIndex(e => e.id === club.id);
        if (index) {
            this._mockClubs[index] = { ...club };
            return club.id;
        }
    }

    _addClub(createdClub: ClubInterface): string | undefined {
        const generalChatId = this._addTopic({ ...DEFAULT_TOPIC, name: 'General Chat', description: 'Club Chat', public: true });
        let generalChat: TopicInterface | undefined = undefined;
        if (generalChatId) {
            generalChat = this._findTopic(generalChatId)
            const newClub = {
                ...createdClub, id: `${this._mockClubs.length + 1}`,
                created: new Date().toJSON(),
                generalChat: generalChatId,
                topics: [generalChatId]
            };
            if (generalChat) this._updateTopic({ ...generalChat, club: newClub.id })
            this._mockClubs.push(newClub);
            return newClub.id;
        }
    }

    _findClub(id: string): ClubInterface | undefined {
        console.log(this._mockClubs);
        return this._mockClubs.find(club =>
            club.id === id
        )
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

    _updateTopic(topic: TopicInterface): string | undefined {
        const index = this._mockTopics.findIndex(e => e.id === topic.id);
        if (index) {
            this._mockTopics[index] = { ...topic };
            return topic.id;
        }
    }

    _addTopic(createdTopic: TopicInterface): string | undefined {
        let newTopic = { ...createdTopic, id: `${this._mockTopics.length + 1}`, created: new Date().toJSON() }
        this._mockTopics.push(newTopic);
        const club = this._findClub(newTopic.club);
        if (club) {
            club.topics.push(newTopic.id);
            this._updateClub(club);
        }
        return newTopic.id;
    }

    _deleteTopic(topicId: string): string {
        this._mockTopics = this._mockTopics.filter(topic => topic.id !== topicId);
        return "No Content"
    }

    _findTopics(clubId: string): TopicInterface[] {
        return this._mockTopics.filter(topic =>
            topic.club === clubId
        );
    }

    _findTopic(topicId: string): TopicInterface | undefined {
        return this._mockTopics.find(topic =>
            topic.id === topicId
        )
    }

    _addComment(comment: CommentInterface): string | undefined {
        const newComment = { ...comment, id: `${this._mockComments.length + 1}`, created: new Date().toJSON() };
        this._mockComments.push(newComment);
        return newComment.id;
    }

    _findComments(topicId: string): CommentInterface[] {
        return this._mockComments.filter(comment =>
            comment.topic === topicId
        );
    }

    _findComment(commentId: string): CommentInterface | undefined {
        return this._mockComments.find(comment => comment.id === commentId);
    }

    _updateComment(comment: CommentInterface): string | undefined {
        const index = this._mockComments.findIndex(e => e.id === comment.id);
        if (index) {
            this._mockComments[index] = { ...comment };
            return comment.id;
        }
    }

}