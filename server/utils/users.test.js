const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'David',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Joe',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Jason',
            room: 'Node Course'
        }]
    });
    
    it('should add new user', () => {
        const users = new Users();
        const user = {
            id: '123',
            name: 'David',
            room: 'Node Room'
        };

        users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        const user = users.removeUser('2');

        expect(user.id).toBe('2');
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        const user = users.removeUser('5');

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        const user = users.getUser('2');

        expect(user.id).toBe('2');
    });

    it('should not find user', () => {
        const user = users.getUser('6');

        expect(user).toBeFalsy();
    });

    it('should return names for node course', () => {
        const userList = users.getUserList('Node Course');

        expect(userList).toEqual(['David', 'Jason']);
    });

    it('should return names for react course', () => {
        const userList = users.getUserList('React Course');

        expect(userList).toEqual(['Joe']);
    });
});