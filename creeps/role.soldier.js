let roleSoldier = {
    run: function (creep) {
        if (creep.memory.hroom == creep.room.name){
            let targets = [];
            targets.push(...Game.rooms[creep.memory.hroom].find(FIND_HOSTILE_CREEPS, {filter: (creep) => {return (creep.owner.username == 'Invader')}}));
            targets.push(...Game.rooms[creep.memory.hroom].find(FIND_HOSTILE_STRUCTURES, {filter: (creep) => {return (creep.owner.username == 'Invader')}}));
            if (targets != '') {
                let clost = creep.pos.findClosestByRange(targets);
                creep.moveTo(clost);
                if (creep.pos.getRangeTo(clost) <= 3) {
                    creep.rangedAttack(clost);
                    creep.attack(clost);
                }
            } 
            else {
                let way = new RoomPosition(19, 12, creep.memory.hroom);
                creep.moveTo(way);
            }
        } 
        else {
            const exitDir = creep.room.findExitTo(creep.memory.hroom);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit);
        }
	}
};
module.exports = roleSoldier;