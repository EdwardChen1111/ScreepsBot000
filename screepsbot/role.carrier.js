let roleCarrier = {
    run: function (creep, storage) {
        let freeC = creep.store.getFreeCapacity();
        if (creep.memory.moving == '') {
            creep.memory.moving = false;
            creep.memory.doing = '';
            creep.memory.target = '';
        }

        if (creep.memory.moving) {
            let doing = creep.memory.doing;
            let target = '';

            if (doing == 's') {
                let standby = creep.memory.standby;
                target = new RoomPosition(standby.x, standby.y, standby.roomName);
            } else {
                target = Game.getObjectById(creep.memory.target);
            }
            
            if (target != '' && ((doing == 'p' && creep.pickup(target) == ERR_NOT_IN_RANGE) || (doing == 't' && creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) || (doing == 'w' && creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) || (doing == 's' && !creep.pos.inRangeTo(target, 10)))) {
                creep.moveTo(target, {reusePath: 20, visualizePathStyle: {stroke: '#ffffff'}});
            } else {
                creep.memory.moving = false;
            }
        } else {
            if (freeC > 0) {
                let dropresources = '';
                let container = '';
                if (creep.room.name == creep.memory.troom) {
                    dropresources = creep.room.find(FIND_DROPPED_RESOURCES);
                    container = creep.room.find(FIND_STRUCTURES, {filter: (s) => (s.structureType == STRUCTURE_CONTAINER) && (s.store.getUsedCapacity() >= creep.store.getFreeCapacity())});
                }

                if (dropresources != '') {
                    creep.memory.target = dropresources.sort((a,b) => b.amount - a.amount)[0].id;
                    creep.memory.doing = 'p';
                } else if (container != '') {
                    creep.memory.target = creep.pos.findClosestByRange(container).id;
                    creep.memory.doing = 'w';
                } else {
                    creep.memory.doing = 's';
                }

                creep.memory.moving = true;
            } else if (storage != '') {
                creep.memory.target = storage[0].id;
                creep.memory.doing = 't';
                creep.memory.moving = true;
            }
        }
	}
};
module.exports = roleCarrier;