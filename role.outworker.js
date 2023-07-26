let roleOutworker = {
    run: function (creep) {
        if (creep.room.name == creep.memory.troom){
            let sources = Game.getObjectById(creep.memory.sourceID);
            if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            const exitDir = creep.room.findExitTo(creep.memory.troom);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit);
        }
    }
};
module.exports = roleOutworker;