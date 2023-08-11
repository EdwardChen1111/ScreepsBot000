var roleCarrier = {
    run: function(creep) {
	    if(creep.store.getUsedCapacity() == creep.store.getCapacity()) {
            const exitDir = creep.room.findExitTo(creep.memory.hroom);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit);
            if (creep.room.name == creep.memory.hroom) {
                if(creep.memory.link){
                    var target = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_LINK) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0}});
                }
                else{
                    var target = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE)}});
                }
                if (target) {
                    const point = creep.pos.findClosestByRange(target);
                    if (creep.transfer(point, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(point);
                    }
                }
                else{
                    const way = new RoomPosition(29, 20, creep.memory.hroom);
                    if(creep.pos.x == 29 && creep.pos.y == 20 && creep.room.name == creep.memory.hroom){
                        creep.drop(RESOURCE_ENERGY);
                    }
                    else{
                        creep.moveTo(way);
                    }
                }
            }
        }
        else {
            const exitDir = creep.room.findExitTo(creep.memory.troom);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit);
            if (creep.room.name == creep.memory.troom){
                var sources = creep.room.find(FIND_DROPPED_RESOURCES, {filter: (resources) => {return (resources.amount > creep.store.getFreeCapacity())}});
                var target = creep.pos.findClosestByRange(sources);
                if(sources.length > 0){
                    if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            } 
        }
	}
};
module.exports = roleCarrier;