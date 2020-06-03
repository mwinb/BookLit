import { TopicInterface } from '../interfaces/TopicInterface';
import { MockDataBase } from '../../__mocks__/mockDatabase';
import { UserInterface, ClubInterface, CommentInterface, RequestInterface } from '../interfaces';
import { ERRORS } from '../errors';
import { SUCCESS_REQUEST } from '.';

export async function login(email: string, password: string): Promise<UserInterface | undefined> {
  const id = MockDataBase.getInstance().login(email, password);
  if (id) return await getUserById(id);
}

export async function getUserById(id: string): Promise<UserInterface | undefined> {
  return MockDataBase.getInstance().findUser(id);
}

export async function getUsersByIds(ids: string[]): Promise<UserInterface[] | undefined> {
  return MockDataBase.getInstance().findUsers(ids);
}

export async function getUsersByClubId(clubId: string): Promise<UserInterface[] | undefined> {
  return MockDataBase.getInstance().getUsersByClubId(clubId);
}

export async function updateUser(updatedUser: UserInterface): Promise<string | undefined> {
  return MockDataBase.getInstance().updateUser(updatedUser);
}

export async function getClubById(id: string): Promise<ClubInterface | undefined> {
  return MockDataBase.getInstance().findClub(id);
}

export async function getClubsByIds(ids: string[]): Promise<ClubInterface[] | undefined> {
  return MockDataBase.getInstance().findClubs(ids);
}

export async function createClub(newClub: ClubInterface): Promise<string | undefined> {
  return MockDataBase.getInstance().addClub(newClub);
}

export async function deleteClub(clubId: string): Promise<string | undefined> {
  return MockDataBase.getInstance().deleteClub(clubId);
}

export async function removeUserFromClub(userId: string, clubId: string): Promise<string> {
  var message = ERRORS.REMOVE_USER;
  try {
    const response = MockDataBase.getInstance().removeClubFromUser(userId, clubId);
    if (!response.body.error) {
      message = SUCCESS_REQUEST;
    }
  } catch {}
  return message;
}

export async function getTopicById(topicId: string): Promise<TopicInterface | undefined> {
  return MockDataBase.getInstance().findTopic(topicId);
}

export async function getTopicsByClub(clubId: string): Promise<TopicInterface[] | undefined> {
  return MockDataBase.getInstance().findTopics(clubId);
}

export async function addTopic(topic: TopicInterface): Promise<string | undefined> {
  return MockDataBase.getInstance().addTopic(topic);
}

export async function deleteTopic(topicId: string): Promise<boolean> {
  const response = MockDataBase.getInstance().deleteTopic(topicId);
  return response ? true : false;
}

export async function updateTopic(topic: TopicInterface): Promise<string | undefined> {
  return MockDataBase.getInstance().updateTopic(topic);
}

export async function getCommentsByTopic(topicId: string): Promise<CommentInterface[] | undefined> {
  return MockDataBase.getInstance().findComments(topicId);
}

export async function addComment(comment: CommentInterface): Promise<string | undefined> {
  return MockDataBase.getInstance().addComment(comment);
}

export async function updateComment(comment: CommentInterface): Promise<string | undefined> {
  return MockDataBase.getInstance().updateComment(comment);
}

export async function getRequestsByClubId(clubId: string): Promise<RequestInterface[] | []> {
  return MockDataBase.getInstance().findRequestsByClubId(clubId);
}

export async function approveRequest(requestId: string): Promise<string | undefined> {
  return MockDataBase.getInstance().approveRequest(requestId);
}

export async function rejectRequest(requestId: string): Promise<string | undefined> {
  return MockDataBase.getInstance().rejectRequest(requestId);
}
