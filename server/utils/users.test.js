const expect = require('expect');
const {Users} = require('./users');
describe('Users', () => {
  var users;
    beforeEach(()=> {
        users = new Users();
        users.users = [{
          id:'1',
          name:'Faizan',
          room:'CDA'
        },{
          id:'2',
          name:'Prashanth',
          room:'IFC'
        },{
          id:'3',
          name:'Suryakant',
          room:'CDA'
        },{
          id:'4',
          name:'Baba',
          room:'RTP'
        }];
    });

    it('Should add new User', () => {
        var users = new Users();
        var user = {
          id:'123',
          name:'Faizan',
          room:'The Office Fans'
        };
        var resUser = users.addUser(user.id,user.name,user.room);
        expect(users.users).toEqual([user]);
    });

    it("Should Remove a user ",() => {
      var user = users.remvoeUser('123');

    });

    it("Should not Remove a user ",() => {

    });

    it("Should find a user ",() => {
      var userId = '1';
      var user = users.getUser(userId);
      expect(user.id).toBe(userId);
    });

    it("Should not find a user ",() => {
      var userId = '10';
      var user = users.getUser(userId);
      expect(user).toBe(undefined);
    });

    it('Should return names for CDA',() => {
      var userList = users.getUserList('CDA');

      expect(userList).toEqual(['Faizan','Suryakant']);
    });
});
