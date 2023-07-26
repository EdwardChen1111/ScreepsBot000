let roleSoldier = {
    run: function (creep) {
        if (creep.memory.hroom == creep.room.name){
            let targets = [];
            targets = targets.concat(Game.rooms[creep.memory.hroom].find(FIND_HOSTILE_CREEPS, {filter: (creep) => {return (creep.owner.username != 'Chenwu')}}));
            targets = targets.concat(Game.rooms[creep.memory.hroom].find(FIND_HOSTILE_STRUCTURES, {filter: (creep) => {return (creep.owner.username != 'Chenwu')}}));
            if (targets != '') {
                let clost = creep.pos.findClosestByRange(targets);
                creep.moveTo(clost);
                if (creep.pos.getRangeTo(clost) <= 3) {
                    creep.rangedAttack(clost);
                    creep.rangedMassAttack();
                    creep.attack(clost);
                }
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
module.exports = roleSoldier;