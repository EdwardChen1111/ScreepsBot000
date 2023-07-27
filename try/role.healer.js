let roleHealer = {
    run: function (creep) {
        if (creep.memory.hroom == creep.room.name){
            let targets = Game.rooms[creep.room.name].find(FIND_MY_CREEPS, {filter: (creep) => {return (creep.hits < creep.hitsMax)}});
            if (targets != '') {
                targets.sort((a,b) => a.hits > b.hits);
                if(creep.heal(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                let way = new RoomPosition(24, 24, creep.memory.hroom);
                creep.moveTo(way);
            }
        } else {
            const exitDir = creep.room.findExitTo(creep.memory.troom);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit);
        }
	}
};
module.exports = roleHealer;