var roleMiner = {
    run: function(creep) {
        
        let hroom = creep.memory.hroom;
        let labL = Game.getObjectById('64b7ff057df01f2e2950d398')
        let sources = creep.room.find(FIND_MINERALS);
        let container = Game.rooms[hroom].find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER) && structure.store.getFreeCapacity(RESOURCE_LEMERGIUM) > 0}});
        let terminal = creep.room.terminal;
        let storage = creep.room.storage;
        
        if (creep.memory.building && creep.store.getUsedCapacity() == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }
	    if (creep.memory.building) {
	        if(terminal.store.getUsedCapacity(RESOURCE_LEMERGIUM) < 10000){
                if(creep.transfer(terminal, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(terminal);
                }
            }
	        else if(labL.store.getFreeCapacity(RESOURCE_LEMERGIUM) > 0 ){
	            if(creep.transfer(labL, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(labL);
                }
            }
            else if(container.length > 0){
                let clost = creep.pos.findClosestByRange(container);
                if(creep.transfer(clost, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(clost);
                }
            }
            else{
                if(creep.transfer(storage, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
            }
	    } else {
            let container = Game.rooms[hroom].find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER) && structure.store.getUsedCapacity(RESOURCE_LEMERGIUM) > 0;}});
            if(labL.store.getUsedCapacity(RESOURCE_LEMERGIUM) > 0 && terminal.store.getUsedCapacity(RESOURCE_LEMERGIUM) < 10000){
                if(creep.withdraw(labL, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(labL);
                }
            }
            else if(storage.store.getUsedCapacity(RESOURCE_LEMERGIUM) > 0 && terminal.store.getUsedCapacity(RESOURCE_LEMERGIUM) < 10000){
                if(creep.withdraw(storage, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
            }
            else if(container.length > 0 && terminal.store.getUsedCapacity(RESOURCE_LEMERGIUM) < 10000){
                let clost = creep.pos.findClosestByRange(container);
                if(creep.withdraw(clost, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(clost);
                }
            }
            else if(sources){
                let clost = creep.pos.findClosestByRange(sources);
                if(creep.harvest(clost) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(clost);
                }
            }
        }
    }
};
module.exports = roleMiner;