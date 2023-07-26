let roleRooms = require('role.rooms');
let username = 'EdwardChen1111';

module.exports.loop = function () {
    for (let name in Game.rooms) {
        if (Game.rooms[name].controller != undefined){
            owner = Game.rooms[name].controller.owner;
            if (owner != undefined) {
                if (owner.username == username) {
                    roleRooms.run(name, username);
                }    
            }
        }
    }
}