# Front End for Book Lit

- A fun functional prototype project to work on in my spare time. 

## Installation and Running

```npm install``` to install.  
```npm run start``` to start in browser.  
```npm run test:unit``` to run unit test suite.  
Login with. 
```"email": "test@test.com"```
```"password": "test"```

## Tasks

- [x] Create Nav Bar
- [x] Create Routes
- [x] Create Footer (maybe)
- [x] Create Home Page
- [x] Create Login Page
- [ ] Create User Settings Page
  - [ ] View/Change User name.
  - [ ] View/update Email
- [x] Create My Clubs Page
  - [x] Delete Club
  - [x] Enter Club
  - [x] Displays club Information
- [ ] Manage Club Page
  - [x] Create Manage Club page
    - [x] Sticky Nav Bar for options.
    - [x] Use Dropdown to select.
  - [ ] View Requests (for club).
    - [x] Create Mock Requests
    - [x] Create Mock api request to get by club id
    - [x] Create mock database logic to get requests by club id
    - [x] Create Request Card
      - [ ] Create ApproveButton.
      - [ ] Create RejectButton.
  - [x] Approve Requests.
  - [x] Remove Users
- [x] New Club Page
  - [x] Creating New Club adds General Topic (handled in mock database as this will be done in back end)
- [ ] Club Page
  - [x] Create Logic for Comments and Topics
  - [ ] Topics
    - [x] Add Create New Topic Modal
      - [x] Can choose ANON or public
    - [x] Delete Topic
    - [x] Cannot Delete General Chat
    - [ ] Prevent non-owners from creating/deleting topics.
  - [x] Add Topic Switcher
  - [x] Display Comments from current topic
  - [x] Allow user to add new comment. (User name with General Chat, Anonymous (based on topic settings))
- [ ] Join Club Page or Search clubs (requires input/no public browse yet).

  - [ ] Requires Club Passphrase
  - [ ] Requires Club Name
  - [ ] If correct club is added to user.

- [ ] Explore Auth options.
- [ ] Start on Back end.

## Refactor

- [x] Create Redirect component that wraps react router redirect in order to mock redirects.

# Future

- [ ] View all users for club as non-owner.
- [ ] Create search for clubs by club name
- [ ] Request entrance to club through search
- [ ] Approve requests page for club owner
