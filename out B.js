var roleBuilder = {
    run: function(creep) {

        let needbuild = creep.pos.findClosestByRange(creep.room.find(FIND_CONSTRUCTION_SITES));
        let storage = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE)}});
        
	    if (creep.memory.building && creep.store.getUsedCapacity() == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }
	    if (creep.memory.building) {
	        if (creep.room.controller.ticksToDowngrade > 10000 && (needbuild)) {
                if (creep.build(needbuild) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(needbuild, {visualizePathStyle: {stroke: '#ffffff'}});
                }
	        } 
	        else {
	            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
	        }
	    } 
	    else{
	        if(storage != '') {
                if (creep.withdraw(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage[0]);
                }
            }
        }
	}
};
module.exports = roleBuilder;
