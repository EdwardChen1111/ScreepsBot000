var roleBuilder = {
    run: function(creep) {

        let needbuild = creep.room.find(FIND_CONSTRUCTION_SITES);
        let sources = creep.room.find(FIND_DROPPED_RESOURCES);
        let resources = creep.room.find(FIND_SOURCES);
        let spawn = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0}});
        let controller = creep.room.controller

	    if (creep.memory.building && creep.store.getUsedCapacity() == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }
	    if (creep.memory.building) {
	        if (controller.ticksToDowngrade > 10000) {
                if(spawn != ''){
                    const clost = creep.pos.findClosestByRange(spawn);
                    if (creep.transfer(clost, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(clost);
                    }      
                }
                else if(needbuild != ''){
                    const clost = creep.pos.findClosestByRange(needbuild);
                    if (creep.build(clost) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(clost, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else{
                    if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
	        } 
	        else {
	            if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
	        }
	    } 
	    else{
            if(sources != ''){
                const clost = creep.pos.findClosestByRange(sources);
                if (creep.pickup(clost, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(clost);
                }
            }
            else if(resources != ''){
                const clost = creep.pos.findClosestByRange(resources);
                if (creep.harvest(clost, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(clost);
                }
            }
        }
	}
};
module.exports = roleBuilder;
