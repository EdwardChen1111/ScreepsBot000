let roleOutbuilder = {
    run: function (creep) {
        if (creep.room.name == creep.memory.troom){
            if (creep.store.getFreeCapacity() == creep.store.getCapacity()) {
                let resources = creep.room.find(FIND_DROPPED_RESOURCES);
                if (resources != '') {
                    resources.sort((a,b) => a.amount - b.amount);
                    if (creep.pickup(resources[resources.length-1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(resources[resources.length-1]);
                    }
                } else {
                    let way = new RoomPosition(24, 24, creep.memory.troom);
                    creep.moveTo(way);
                }
            } else {
                let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets != '') {
                    if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else {
                    targets = creep.room.find(FIND_STRUCTURES, {filter: object => object.hits < object.hitsMax});
                    if (targets != '') {
                        targets.sort((a,b) => a.hits - b.hits);
                        if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }
            }
        } else {
            const exitDir = creep.room.findExitTo(creep.memory.troom);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit);
        }
	}
};
module.exports = roleOutbuilder;