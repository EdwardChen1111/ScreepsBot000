let roleRooms = require('role.rooms');
let username = 'Chenwu';

module.exports.loop = function () {
    for (let name in Game.rooms) {
        let controller = Game.rooms[name].controller;
        let room = Game.rooms[name];
        if (controller != undefined && controller.owner != undefined && controller.owner.username == username){
            roleRooms.run(room, name, username);
        }
    }

    if(Game.cpu.bucket == 10000) {
        if(Game.cpu.generatePixel() == 0){
            Game.notify('Pixel!', 0)
            console.log('Pixel!')
        }
    }

    if (Game.cpu.getUsed() > 16) {
        console.log(`🚨This tick use ${parseInt(Math.round(Game.cpu.getUsed()))} CPU`);
    }
    
    if (Game.cpu.getUsed() > 20) {
        Game.notify(`This tick use ${parseInt(Math.round(Game.cpu.getUsed()))} CPU, CPU Bucket remain ${Game.cpu.bucket}`);
    }
}