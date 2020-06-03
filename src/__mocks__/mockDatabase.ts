import {
  ClubInterface,
  UserInterface,
  TopicInterface,
  CommentInterface,
  DEFAULT_TOPIC,
  RequestInterface,
} from '../common/interfaces';
import { mockClubs, mockUsers, mockTopics, mockComments, mockCredentials, mockRequests } from '.';
import {} from '../common/interfaces/RequestInterface';
import { mockErrorResponse, mockSuccessResponse, MockResponse } from './mockResponses';

export class MockDataBase {
  private static _instance: MockDataBase;
  _mockClubs: ClubInterface[] = mockClubs;
  _mockUsers: UserInterface[] = mockUsers;
  _mockTopics: TopicInterface[] = mockTopics;
  _mockComments: CommentInterface[] = mockComments;
  _mockRequests: RequestInterface[] = mockRequests;
  _mockCredentials = mockCredentials;

  private constructor() {}

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
      if (credential.email === email && credential.password === password) id = credential.id;
    }
    return id;
  }

  findUser(id: string): UserInterface | undefined {
    return this._mockUsers.find((user) => {
      return user.id === id;
    });
  }

  findUsers(ids: string[]): UserInterface[] | undefined {
    const users: UserInterface[] = [];
    return ids.reduce((users, id) => {
      const user = this.findUser(id);
      if (user !== undefined) return [...users, user];
      else return users;
    }, users);
  }

  getUsersByClubId(clubId: string): UserInterface[] | [] {
    const club = this.findClub(clubId);
    let users: UserInterface[] = [];
    if (club) {
      users = this.findUsers(club.members) || [];
    }
    return users;
  }

  updateUser(user: UserInterface): string | undefined {
    let index = this._mockClubs.findIndex((e) => e.id === user.id);
    if (index !== undefined) {
      this._mockUsers[index] = { ...user };
      return user.id;
    }
  }

  addClubToUser(userId: string, clubId: string): void {
    const user = this.findUser(userId);
    if (user) this.updateUser({ ...user, clubs: [...user.clubs, clubId] });
  }

  removeClubFromUser(userId: string, clubId: string): MockResponse {
    const user = this.findUser(userId);
    const club = this.findClub(clubId);
    let response = mockErrorResponse;
    if (user && club) {
      const clubs = user.clubs.filter((club) => club !== clubId);
      this.updateUser({
        ...user,
        clubs: clubs,
      });
      this.updateClub({
        ...club,
        members: club.members.filter((member) => member !== userId),
      });
      response = mockSuccessResponse({ message: 'Success' });
    }
    return response;
  }

  updateClub(club: ClubInterface): string | undefined {
    let index = this._mockClubs.findIndex((e) => e.id === club.id);
    if (index !== undefined) {
      this._mockClubs[index] = { ...club };
      return club.id;
    }
  }

  addClub(createdClub: ClubInterface): string | undefined {
    const owner = this.findUser(createdClub.owner);
    if (!owner) return;
    const generalChatId = this.addTopic({
      ...DEFAULT_TOPIC,
      name: 'General Chat',
      description: 'Club Chat',
      public: true,
    });
    let generalChat: TopicInterface | undefined = undefined;
    if (generalChatId) {
      generalChat = this.findTopic(generalChatId);
      const newClub = {
        ...createdClub,
        id: `${new Date().getTime().toString(36)}`,
        created: new Date().toJSON(),
        generalChat: generalChatId,
        topics: [generalChatId],
        members: [createdClub.owner],
      };
      if (generalChat) this.updateTopic({ ...generalChat, club: newClub.id });
      this._mockClubs.push(newClub);
      return newClub.id;
    }
  }

  addUserToClub(clubId: string, userId: string): void {
    const club = this.findClub(clubId);
    if (club) this.updateClub({ ...club, members: [...club.members, userId] });
  }

  deleteClub(clubId: string): string | undefined {
    const club = this.findClub(clubId);
    if (club) {
      const clubTopics = this.findTopics(clubId);
      clubTopics.forEach((topic) => this.deleteTopic(topic.id));
      club.members.forEach((user) => this.removeClubFromUser(user, clubId));
      this._mockClubs = this._mockClubs.filter((club) => club.id !== clubId);
      return clubId;
    }
  }

  removeRequestFromClub(clubId: string, requestId: string): void {
    const club = this.findClub(clubId);
    if (club) {
      this.updateClub({
        ...club,
        requests: club.requests.filter((request) => request !== requestId),
      });
    }
  }

  findClub(id: string): ClubInterface | undefined {
    return this._mockClubs.find((club) => club.id === id);
  }

  findClubs(ids: string[]): ClubInterface[] | undefined {
    const clubs: ClubInterface[] = [];
    return ids.reduce((clubs, id) => {
      const club = this.findClub(id);
      if (club) return [...clubs, club];
      else return clubs;
    }, clubs);
  }

  updateTopic(topic: TopicInterface): string | undefined {
    const index = this._mockTopics.findIndex((e) => e.id === topic.id);
    if (index !== undefined) {
      this._mockTopics[index] = { ...topic };
      return topic.id;
    }
  }

  addTopic(createdTopic: TopicInterface): string | undefined {
    let newTopic = { ...createdTopic, id: `${new Date().getTime().toString(36)}`, created: new Date().toJSON() };
    this._mockTopics.push(newTopic);
    return newTopic.id;
  }

  deleteTopic(topicId: string): string {
    this._mockTopics = this._mockTopics.filter((topic) => topic.id !== topicId);
    this._mockComments = this._mockComments.filter((comment) => comment.topic !== topicId);
    return 'No Content';
  }

  findTopics(clubId: string): TopicInterface[] {
    return this._mockTopics.filter((topic) => topic.club === clubId);
  }

  findTopic(topicId: string): TopicInterface | undefined {
    return this._mockTopics.find((topic) => topic.id === topicId);
  }

  addComment(comment: CommentInterface): string | undefined {
    const newComment = { ...comment, id: `${new Date().getTime().toString(36)}`, created: new Date().toJSON() };
    this._mockComments.push(newComment);
    return newComment.id;
  }

  findComments(topicId: string): CommentInterface[] {
    return this._mockComments.filter((comment) => comment.topic === topicId);
  }

  findComment(commentId: string): CommentInterface | undefined {
    return this._mockComments.find((comment) => comment.id === commentId);
  }

  updateComment(comment: CommentInterface): string | undefined {
    const index = this._mockComments.findIndex((e) => e.id === comment.id);
    if (index !== undefined) {
      this._mockComments[index] = { ...comment };
      return comment.id;
    }
  }

  findRequestsByClubId(clubId: string): RequestInterface[] | [] {
    return this._mockRequests.filter((request) => request.clubId === clubId);
  }

  getRequestById(id: string): RequestInterface | undefined {
    return this._mockRequests.find((request) => request.id === id);
  }

  deleteRequest(requestId: string): void {
    this._mockRequests = this._mockRequests.filter((request) => request.id !== requestId);
  }

  approveRequest(requestId: string): string | undefined {
    const request = this.getRequestById(requestId);
    if (request) {
      this.addUserToClub(request.clubId, request.userId);
      this.addClubToUser(request.userId, request.clubId);
      this.deleteRequest(requestId);
      return requestId;
    }
  }

  rejectRequest(requestId: string): string | undefined {
    const request = this.getRequestById(requestId);
    if (request) {
      this.removeRequestFromClub(request.clubId, requestId);
      this.deleteRequest(requestId);
      return requestId;
    }
  }
}
