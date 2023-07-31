let roleOutworker = {
    run: function (creep) {
        if (creep.room.name == creep.memory.troom){
            let sources = Game.getObjectById(creep.memory.sourceID);
            if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            let standby = new RoomPosition(standby.x, standby.y, standby.roomName);
            creep.moveTo(standby);
        }
    }
};
module.exports = roleOutworker;