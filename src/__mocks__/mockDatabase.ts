
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
    login(email: string, password: string): string | undefined {
        let id = undefined;
        for (const credential of this._mockCredentials) {
            if (credential.email === email && credential.password === password)
                id = credential.id;
        }
        return id;
    }

    findUser(id: string): UserInterface | undefined {
        return this._mockUsers.find(user => {
            return user.id === id;
        });
    }

    findUsers(ids: string[]): UserInterface[] | undefined {
        const users: UserInterface[] = []
        return ids.reduce((users, id) => {
            const user = this.findUser(id);
            if (user !== undefined)
                return [...users, user];
            else return users;
        }, users);
    }

    updateUser(user: UserInterface): string | undefined {
        let index = this._mockClubs.findIndex(e => e.id === user.id);
        if (index) {
            this._mockUsers[index] = { ...user };
            return user.id;
        }
    }

    updateClub(club: ClubInterface): string | undefined {
        let index = this._mockClubs.findIndex(e => e.id === club.id);
        if (index) {
            this._mockClubs[index] = { ...club };
            return club.id;
        }
    }

    addClub(createdClub: ClubInterface): string | undefined {
        const owner = this.findUser(createdClub.owner);
        if (!owner) return
        const generalChatId = this.addTopic({ ...DEFAULT_TOPIC, name: 'General Chat', description: 'Club Chat', public: true });
        let generalChat: TopicInterface | undefined = undefined;
        if (generalChatId) {
            generalChat = this.findTopic(generalChatId)
            const newClub = {
                ...createdClub, id: `${new Date().getTime().toString(36)}`,
                created: new Date().toJSON(),
                generalChat: generalChatId,
                topics: [generalChatId],
                members: [createdClub.owner]
            };
            if (generalChat) this.updateTopic({ ...generalChat, club: newClub.id })
            this._mockClubs.push(newClub);
            return newClub.id;
        }
    }

    deleteClub(clubId: string): string | undefined {
        const club = this.findClub(clubId);
        if (club) {
            const clubTopics = this.findTopics(clubId);
            clubTopics.forEach(topic => this.deleteTopic(topic.id));
            club.members.forEach(user => this.removeClubFromUser(user, clubId));
            this._mockClubs = this._mockClubs.filter(club => club.id !== clubId);
            return clubId;
        }
    }

    removeClubFromUser(userId: string, clubId: string) {
        const user = this.findUser(userId);
        if (user) {
            const clubs = user.clubs.filter(club => club !== clubId);
            this.updateUser({
                ...user,
                clubs: clubs,
            })
        }
    }

    findClub(id: string): ClubInterface | undefined {
        return this._mockClubs.find(club =>
            club.id === id
        )
    }

    findClubs(ids: string[]): ClubInterface[] | undefined {
        const clubs: ClubInterface[] = [];
        return ids.reduce((clubs, id) => {
            const club = this.findClub(id);
            if (club)
                return [...clubs, club]
            else
                return clubs
        }, clubs);
    }

    updateTopic(topic: TopicInterface): string | undefined {
        const index = this._mockTopics.findIndex(e => e.id === topic.id);
        if (index) {
            this._mockTopics[index] = { ...topic };
            return topic.id;
        }
    }

    addTopic(createdTopic: TopicInterface): string | undefined {
        let newTopic = { ...createdTopic, id: `${new Date().getTime().toString(36)}`, created: new Date().toJSON() }
        this._mockTopics.push(newTopic);
        return newTopic.id;
    }

    deleteTopic(topicId: string): string {
        this._mockTopics = this._mockTopics.filter(topic => topic.id !== topicId);
        this._mockComments = this._mockComments.filter(comment => comment.topic !== topicId)
        return "No Content"
    }

    findTopics(clubId: string): TopicInterface[] {
        return this._mockTopics.filter(topic =>
            topic.club === clubId
        );
    }

    findTopic(topicId: string): TopicInterface | undefined {
        return this._mockTopics.find(topic =>
            topic.id === topicId
        )
    }

    addComment(comment: CommentInterface): string | undefined {
        const newComment = { ...comment, id: `${new Date().getTime().toString(36)}`, created: new Date().toJSON() };
        this._mockComments.push(newComment);
        return newComment.id;
    }

    findComments(topicId: string): CommentInterface[] {
        return this._mockComments.filter(comment =>
            comment.topic === topicId
        );
    }

    findComment(commentId: string): CommentInterface | undefined {
        return this._mockComments.find(comment => comment.id === commentId);
    }

    updateComment(comment: CommentInterface): string | undefined {
        const index = this._mockComments.findIndex(e => e.id === comment.id);
        if (index) {
            this._mockComments[index] = { ...comment };
            return comment.id;
        }
    }

}