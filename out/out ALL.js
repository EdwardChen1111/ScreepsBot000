var roleBuilder = {
    run: function(creep) {

        let needbuild = creep.room.find(FIND_CONSTRUCTION_SITES);
        let sources = creep.room.find(FIND_DROPPED_RESOURCES, {filter: (resources) => {return (resources.amount > 550)}});
        let resources = creep.room.find(FIND_SOURCES, {filter: (sources) => {return (sources.energy > 0)}});
        let tombstone = creep.room.find(FIND_TOMBSTONES, {filter: (tombstone) => {return (tombstone.store[RESOURCE_ENERGY] > 0)}});
        let extension = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0}});
        let spawn = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0}});
        let tower = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_TOWER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 200}});
        let storage = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > creep.store.getFreeCapacity()}});
        let controller = creep.room.controller
        let terminal = creep.room.terminal;
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
	        if (controller.ticksToDowngrade > 5000) {
                if(spawn != ''){
                    const clost = creep.pos.findClosestByRange(spawn);
                    if (creep.transfer(clost, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(clost);
                    }      
                }
                else if(extension != '' && creep.store.getUsedCapacity(RESOURCE_ENERGY) > 49){
                    const clost = creep.pos.findClosestByRange(extension);
                    if (creep.transfer(clost, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(clost);
                    }      
                }
                else if(tower != ''){
                    const clost = creep.pos.findClosestByRange(tower);
                    if (creep.transfer(clost, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(clost);
                    }      
                } 
                else if(needbuild != ''){
                    const clost = creep.pos.findClosestByRange(needbuild);
                    if (creep.build(clost) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(clost);
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
                    creep.moveTo(controller);
                }
            }
	    } 
	    else{
	        if(link.store.getUsedCapacity(RESOURCE_ENERGY) > 0 && creep.memory.link == false){
                if (creep.withdraw(link , RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(link);
                }
            } 
	        else if (tombstone != '') {
                const clost = creep.pos.findClosestByRange(tombstone);
                for(const resourceType in clost.store) {
                    if (creep.withdraw(clost, resourceType) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(clost);
                    }
                }
            }
	        if(storage != ''){
                const clost = creep.pos.findClosestByRange(storage);
                if (creep.withdraw(clost, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(clost);
                }
            }
            else if(sources != ''){
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
