var roleDowork = require('role.dowork');
var roleRespawn = require('role.respawn');
var roleTower = require('role.tower');
var roleLink = require('role.link');


module.exports.loop = function () {
    
    for(var name in Memory.creeps) {
        roleRespawn.check(name);
    }

    for (let name in Game.rooms) {
        for (let num in Game.rooms[name].find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER})) {
            let tower = Game.rooms[name].find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER})[num];
            roleTower.work(tower);
        }
        for (let num in Game.rooms[name].find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_LINK})) {
            let link = Game.rooms[name].find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_LINK})[num];
            roleLink.work(link);
        }
    }
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        roleDowork.tell(creep);
    }
};