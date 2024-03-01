let roleMiner = {
    run: function (creep, terminal) {
        let sources = Game.getObjectById(creep.memory.sourceID);
        if (creep.store.getFreeCapacity() > 0) {
            if (creep.harvest(sources) == ERR_NOT_IN_RANGE){
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else if (terminal.store.getFreeCapacity() > 150000) {
            if (creep.transfer(terminal, sources.mineralType) == ERR_NOT_IN_RANGE){
                creep.moveTo(terminal, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};
module.exports = roleMiner;