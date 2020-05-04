import { ClubInterface } from './../common/interfaces';
export const mockClubs: ClubInterface[] = [
  {
    id: '1',
    name: 'My Super Cool Book Club 1',
    book: 'Super Cool Book 1',
    members: ['1', '2'],
    topics: ['1', '4'],
    owner: '1',
    created: '2020-04-21T00:48:35.169Z',
    description: 'This is a description',
    public: true,
    generalChat: '1',
    joinRequests: []
  },
  {
    id: '2',
    name: 'My Super Cool Book Club 2',
    book: 'Super Cool Book 2',
    members: ['2', '3'],
    topics: ['2', '5'],
    owner: '2',
    created: '2020-04-21T00:48:35.169Z',
    description: 'This is a description',
    public: true,
    generalChat: '2',
    joinRequests: []

  },
  {
    id: '3',
    name: 'My Super Cool Book Club 3',
    book: 'Super Cool Book 3',
    members: ['1', '3'],
    topics: ['3', '6'],
    owner: '3',
    created: '2020-04-21T00:48:35.169Z',
    description: 'This is a description',
    public: true,
    generalChat: '3',
    joinRequests: []
  },
];
