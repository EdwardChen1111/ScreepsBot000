var roleOutbuilder = {
    run: function(creep) {
        const exitDir = creep.room.findExitTo(creep.memory.troom);
        const exit = creep.pos.findClosestByRange(exitDir);
        creep.moveTo(exit);
        if (creep.room.name == creep.memory.troom){
            if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.building = false;
                creep.say('🔄 harvest');
            }
            if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
                creep.memory.building = true;
                creep.say('🚧 build');
            }
            if(creep.memory.building) {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else {
                    targets = creep.room.find(FIND_STRUCTURES, {filter: object => object.hits < object.hitsMax});
	                targets.sort((a,b) => a.hits - b.hits);
                    if(targets.length > 0) {
                        if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }
            } else {
                var resources = creep.room.find(FIND_DROPPED_RESOURCES);
                resources.sort((a,b) => a.amount - b.amount);
                if(resources.length>0) {
                    if(creep.pickup(resources[resources.length-1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(resources[resources.length-1]);
                    }
                }
            }
        }
	    
	}
};
module.exports = roleOutbuilder;