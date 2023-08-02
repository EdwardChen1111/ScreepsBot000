var roleBuilder = {
    run: function(creep) {

        let needbuild = creep.room.find(FIND_CONSTRUCTION_SITES);
        let sources = creep.room.find(FIND_DROPPED_RESOURCES, {filter: (resources) => {return (resources.amount > 100)}});
        let resources = creep.room.find(FIND_SOURCES, {filter: (sources) => {return (sources.energy > 0)}});
        let spawn = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0}});
        let controller = creep.room.controller
        
        if(creep.room.name == creep.memory.troom){
            
            if(creep.room.name == 'E12S36'){
                creep.memory.troom = 'E11S36';
            }
            else if(creep.room.name == 'E11S36'){
                creep.memory.troom = 'E10S34';
            }
            else if(creep.room.name == 'E10S34'){
                creep.memory.troom = 'E10S23';
            }
            else if(creep.room.name == 'E10S23'){
                creep.memory.troom = 'E11S23';
            }
            else if(creep.room.name == 'E11S23'){
                creep.memory.troom = 'E11S22';
            }
            else if(creep.room.name == 'E11S22'){
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
            
        }
        else{
            const way = new RoomPosition(26, 1, creep.memory.troom);
            creep.moveTo(way);
        }
	}
};
module.exports = roleBuilder;
