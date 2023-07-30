let roleArmy = {
    run: function (creep) {
        let spawn = Game.rooms[creep.memory.hroom].find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_SPAWN)}});

        for (let name in spawn[0].memory.appendrange) {
            let room = spawn[0].memory.appendrange[name];
            targets = Game.rooms[room].find(FIND_HOSTILE_CREEPS, {filter: (creep) => {return (creep.owner.username != 'EdwardChen1111')}});
            if (targets != '') {
                console.log(targets);
                break;    
            }
        }
        
        if (targets != '') {
            creep.moveTo(targets[0]);
            if (creep.pos.getRangeTo(targets[0]) <= 3) {
                creep.rangedAttack(targets[0]);
                creep.attack(targets[0]);
            }
        } else {
            let way = new RoomPosition(24, 24, creep.memory.hroom);
            creep.moveTo(way);
        }
	}
};
module.exports = roleArmy;