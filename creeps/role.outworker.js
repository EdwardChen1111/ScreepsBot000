var roleOutworker = {
    run: function(creep) {
        const exitDir = creep.room.findExitTo(creep.memory.troom);
        const exit = creep.pos.findClosestByRange(exitDir);
        creep.moveTo(exit);
        if (creep.room.name == creep.memory.troom){
            var sources = creep.room.find(FIND_SOURCES);
            var i = creep.memory.sourceID;
            if(creep.harvest(sources[i]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[i]);
            }
        }
    }
};
module.exports = roleOutworker;