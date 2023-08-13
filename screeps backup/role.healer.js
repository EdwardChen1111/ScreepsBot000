let roleHealer = {
    run: function (creep) {
        if (creep.memory.hroom == creep.room.name){
            let targets = Game.rooms[creep.room.name].find(FIND_MY_CREEPS, {filter: (creep) => {return (creep.hits < creep.hitsMax)}});
            if (targets != '') {
                let clost = creep.pos.findClosestByRange(targets);
                creep.moveTo(clost);
                creep.heal(clost);
            } else {
                let way = new RoomPosition(24, 24, creep.memory.hroom);
                creep.moveTo(way);
            }
        } else {
            const exitDir = creep.room.findExitTo(creep.memory.hroom);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit);
        }
	}
};
module.exports = roleHealer;