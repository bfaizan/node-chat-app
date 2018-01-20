var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage',()=>{
    it('should generate correct message object ' , () => {
        var from = "Jen";
        var text = "Hi Jen";
        var message = generateMessage(from ,text);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toBe({from,text});
    });
});
