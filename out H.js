let roleHarvester = {
    run: function (creep) {
        
        let sources = creep.room.find(FIND_DROPPED_RESOURCES);
        var resources = creep.room.find(FIND_SOURCES);
        let tower = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_TOWER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 200}});
        let spawn = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0}});
        let storage = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE)}});
                                                                                                                                                                                                                              
        if (creep.store.getFreeCapacity() == creep.store.getCapacity() || (spawn == '' && tower == '' && creep.store.getFreeCapacity() > 0)) {
            if(sources != ''){
                const clost = creep.pos.findClosestByRange(sources);
                if (creep.pickup(clost, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(clost);
                }
            }
            else if(storage != ''){
                const clost = creep.pos.findClosestByRange(storage);
                if (creep.withdraw(clost, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(clost);
                }
            }
            else{
                const clost = creep.pos.findClosestByRange(resources);
                if (creep.harvest(clost, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(clost);
                }
            }
        }                                   
        else{
            if(spawn != ''){
                const clost = creep.pos.findClosestByRange(spawn);
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
            else if(storage != ''){
                const clost = creep.pos.findClosestByRange(storage);
                for(const resourceType in creep.carry) {
                    if (creep.transfer(clost, resourceType) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(clost, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
    }
};
module.exports = roleHarvester;