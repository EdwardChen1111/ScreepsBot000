let roleOutworker = {
    run: function (creep, storage) {
        if (creep.room.name == creep.memory.troom){
            if (creep.store.getUsedCapacity() == creep.store.getCapacity()){
                let sources = Game.getObjectById(creep.memory.sourceID);
                if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                if (creep.transfer(creep.pos.findClosestByRange(storage)) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.pos.findClosestByRange(storage), {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        } else {
            let standby = creep.memory.standby;
            let target = new RoomPosition(standby.x, standby.y, standby.roomName);
            creep.moveTo(target, {reusePath: 20});
        }
    }
};
module.exports = roleOutworker;