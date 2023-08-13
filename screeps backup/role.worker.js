let roleWorker = {
    run: function (creep) {
        let sources = Game.getObjectById(creep.memory.sourceID);
        if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources, {reusePath: 20, visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
};
module.exports = roleWorker;