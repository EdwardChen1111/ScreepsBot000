var roleBuilder = {
    run: function(creep) {

        let needbuild = creep.pos.findClosestByRange(creep.room.find(FIND_CONSTRUCTION_SITES));
        let storage = creep.room.storage;
        let link = Game.getObjectById(creep.memory.linkID);
        
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
                    creep.moveTo(needbuild);
                }
	        } 
	        else {
	            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
	        }
	    } 
	    else{
	        if(needbuild && storage != ''){
                if (creep.withdraw(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage[0]);
                }
	        }
	        else{
	            if(link.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
                    if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(link);
                    }
	            }
	        }
        }
	}
};
module.exports = roleBuilder;
