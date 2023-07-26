let roleWorker = {
    run: function (creep) {
        sources = Game.getObjectById(creep.memory.sourceID);
        if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
};
module.exports = roleWorker;