let roleCarrier = {
    run: function (creep, storage) {
        if (creep.room.name == creep.memory.troom && creep.store.getFreeCapacity() > 0) {
            let dropresources = creep.room.find(FIND_DROPPED_RESOURCES);
            if (dropresources != '') {
                dropresources.sort((a,b) => b.amount - a.amount);
                if (creep.pickup(dropresources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropresources[0]);
                }
            } else {
                let way = new RoomPosition(24, 24, creep.memory.troom);
                creep.moveTo(way);
            }
        } else if (storage != '' && creep.store.getFreeCapacity() == 0){
            if (creep.transfer(storage[storage.length - 1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage[storage.length - 1], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            const exitDir = creep.room.findExitTo(creep.memory.troom);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit);
        }
	}
};
module.exports = roleCarrier;