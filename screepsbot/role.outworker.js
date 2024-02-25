let roleOutworker = {
    run: function (creep) {
        if (creep.room.name == creep.memory.troom){
            if (creep.store.getUsedCapacity() == creep.store.getCapacity()){
                let container = creep.room.find(FIND_STRUCTURES, {filter: (s) => (s.structureType == STRUCTURE_CONTAINER)});
                if (creep.transfer(creep.pos.findClosestByRange(container), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.pos.findClosestByRange(container), {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                let sources = Game.getObjectById(creep.memory.sourceID);
                if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
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