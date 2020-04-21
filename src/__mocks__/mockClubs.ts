import { ClubInterface } from './../common/interfaces';
export const mockClubs: ClubInterface[] = [
  {
    id: '1',
    name: 'My Super Cool Book Club 1',
    book: 'Super Cool Book 1',
    members: ['1', '2'],
    topics: ['1', '2', '3'],
    owner: '1',
    created: '',
  },
  {
    id: '2',
    name: 'My Super Cool Book Club 2',
    book: 'Super Cool Book 2',
    members: ['2', '3'],
    topics: ['1', '2'],
    owner: '2',
    created: '',

  },
  {
    id: '3',
    name: 'My Super Cool Book Club 3',
    book: 'Super Cool Book 3',
    members: ['1', '3'],
    topics: ['1'],
    owner: '3',
    created: '',
  },
];
