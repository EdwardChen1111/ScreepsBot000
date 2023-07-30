var roleWorker = {
    run: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        var i = creep.memory.sourceID;
        if (creep.store.getUsedCapacity() != creep.store.getCapacity()){
            if(creep.harvest(sources[i]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[i], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};
module.exports = roleWorker;