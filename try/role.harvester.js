let roleHarvester = {
    run: function (creep) {
        
        let hroom = creep.memory.hroom;
        let resources = Game.rooms[hroom].find(FIND_DROPPED_RESOURCES, {filter: (resources) => {return (resources.amount > 500) || resources.resourceType != RESOURCE_ENERGY }});
        let extension = Game.rooms[hroom].find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0}});
        let spawn = Game.rooms[hroom].find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0}});
        let tower = Game.rooms[hroom].find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_TOWER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 200}});
        let storage = Game.rooms[hroom].find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE)}});
        let lab = Game.rooms[hroom].find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_LAB) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0}});
        let link = Game.getObjectById(creep.memory.linkID)
        let terminal = Game.rooms[hroom].find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_TERMINAL)}});
        let container = Game.rooms[hroom].find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;}});

        if(creep.store.getUsedCapacity(RESOURCE_LEMERGIUM) > 0){
            const clost = creep.pos.findClosestByRange(terminal);
            if(creep.transfer(clost, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                creep.moveTo(clost, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else if (creep.store.getFreeCapacity() == creep.store.getCapacity() || (extension == '' && spawn == '' && tower == '' && resources != '' && creep.store.getFreeCapacity() > 0)) {
            if(link.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
                if (creep.withdraw(link , RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(link);
                }
            }
            else if (container != '') {
                const clost = creep.pos.findClosestByRange(container);
                if (creep.withdraw(clost, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(clost);
                }
            }
            else if (resources != '') {
                const clost = creep.pos.findClosestByRange(resources);
                if (creep.pickup(clost) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(clost);
                }
            } 
            else if (storage != '') {
                if (creep.withdraw(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage[0]);
                }
            }
        }
        else {
            let terminalelse = creep.pos.findClosestByRange(terminal);
            if (extension != '' && creep.store.getUsedCapacity(RESOURCE_ENERGY) > 50) {
                const clost = creep.pos.findClosestByRange(extension);
                if (creep.transfer(clost, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(clost, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else if (spawn != '' && creep.store.getUsedCapacity(RESOURCE_ENERGY) > 300) {
                const clost = creep.pos.findClosestByRange(spawn);
                if (creep.transfer(clost, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(clost, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } 
            else if (tower != '' && creep.store.getUsedCapacity(RESOURCE_ENERGY) > 300) {
                const clost = creep.pos.findClosestByRange(tower);
                if (creep.transfer(clost, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(clost, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else if (terminal != '' && terminalelse.store.getUsedCapacity(RESOURCE_ENERGY) < 10000) {
                const clost = creep.pos.findClosestByRange(terminal);
                if (creep.transfer(clost, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(clost, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } 
            else if (lab != '' && creep.store.getUsedCapacity(RESOURCE_ENERGY) > 100) {
                const clost = creep.pos.findClosestByRange(lab);
                if (creep.transfer(clost, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(clost, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } 
            else {
                if (storage.length > 0) {
                    const clost = creep.pos.findClosestByRange(storage);
                    for(const resourceType in creep.carry) {
                        if (creep.transfer(clost, resourceType) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(clost, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                    
                }
            }
        }
    }
};
module.exports = roleHarvester;