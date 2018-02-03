const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const res = generateMessage('David', 'Hello There');


        expect(res).toMatchObject({
           from: 'David',
           text: 'Hello There'
        });
        expect(typeof res.createdAt).toBe('number');
    });
});