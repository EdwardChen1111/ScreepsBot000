let roleWorker = {
    run: function (creep) {
        let link = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_LINK}));
        let sources = Game.getObjectById(creep.memory.sourceID);
        if (creep.store.getCapacity() != 0 && creep.store.getFreeCapacity() == 0){
            if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(link, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources, {reusePath: 20, visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
};
module.exports = roleWorker;