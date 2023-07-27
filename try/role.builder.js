var roleBuilder = {
    run: function(creep) {

        let link = Game.getObjectById(creep.memory.linkID)
        let needbuild = creep.pos.findClosestByRange(creep.room.find(FIND_CONSTRUCTION_SITES));
        let resources = creep.pos.findClosestByRange(creep.room.find(FIND_DROPPED_RESOURCES));
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
	        if (controller.ticksToDowngrade > 30000 && (needbuild)) {
                if (creep.build(needbuild) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(needbuild, {visualizePathStyle: {stroke: '#ffffff'}});
                }
	        } else {
	            if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    console.log(controller.progressTotal - creep.room.controller.progress)
                }
	        }
	    } else {
            if(link != undefined){
                if(link.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
                    var storage = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE)}}));
                    if (storage) {
                        if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(storage);
                        }
                    }
                }
                else{
                    if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(link);
                    }
                }
            }else{
                if (creep.pickup(resources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(resources);
                }
            }
        }
	}
};
module.exports = roleBuilder;
