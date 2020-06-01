import { mockClubs } from './mockClubs';
import { RequestInterface } from "../common/interfaces/RequestInterface";
import { mockUsers } from ".";

export const mockRequests: RequestInterface[] = [
    {
        id: '1',
        clubId: mockClubs[0].id,
        userId: mockUsers[2].id,
        userName: mockUsers[2].username,
        message: `I would like to join your club.`,
        requestDate: `${new Date().toISOString()}`
    },
    {
        id: '2',
        clubId: mockClubs[1].id,
        userId: mockUsers[0].id,
        userName: mockUsers[0].username,
        message: `I would like to join your club.`,
        requestDate: `${new Date().toISOString()}`
    },
    {
        id: '3',
        clubId: mockClubs[2].id,
        userId: mockUsers[1].id,
        userName: mockUsers[1].username,
        message: `I would like to join your club.`,
        requestDate: `${new Date().toISOString()}`
    },
]