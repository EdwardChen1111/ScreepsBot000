var roleMiner = {
    run: function(creep) {
        
        let hroom = creep.memory.hroom;
        let labL = Game.getObjectById('64b7ff057df01f2e2950d398')
        let sources = creep.room.find(FIND_MINERALS);
        let container = Game.rooms[hroom].find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER) && structure.store.getFreeCapacity(RESOURCE_LEMERGIUM) > 0}});
        let terminal = Game.rooms[hroom].find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_TERMINAL)}});
        let storage = Game.rooms[hroom].find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE)}});
        
        if (creep.memory.building && creep.store.getUsedCapacity() == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }
	    if (creep.memory.building) {
	        if(labL.store.getFreeCapacity(RESOURCE_LEMERGIUM) > 0){
	            if(creep.transfer(labL, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(labL, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else if(terminal.store.getUsedCapacity(RESOURCE_LEMERGIUM) < 10000){
                let clost = creep.pos.findClosestByRange(terminal);
                if(creep.transfer(clost, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(clost, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else if(container.length > 0){
                let clost = creep.pos.findClosestByRange(container);
                if(creep.transfer(clost, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(clost, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else{
                let clost = creep.pos.findClosestByRange(storage);
                if(creep.transfer(clost, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(clost, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
	    } else {
            let container = Game.rooms[hroom].find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER) && structure.store.getUsedCapacity(RESOURCE_LEMERGIUM) > 0;}});
            if(storage.store.getUsedCapacity(RESOURCE_LEMERGIUM) > 0){
                let clost = creep.pos.findClosestByRange(storage);
                if(creep.withdraw(clost, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(clost, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else if(container.length > 0){
                let clost = creep.pos.findClosestByRange(container);
                if(creep.withdraw(clost, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(clost, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else if(sources){
                let clost = creep.pos.findClosestByRange(sources);
                if(creep.harvest(clost) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(clost, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }
};
module.exports = roleMiner;