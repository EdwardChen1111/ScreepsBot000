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
            
            if (target != '' && ((doing == 'p' && creep.pickup(target) == ERR_NOT_IN_RANGE) || (doing == 't' && creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) || (doing == 's' && !creep.pos.inRangeTo(target, 10)))) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            } else {
                creep.memory.moving = false;
            }
        } else {
            if (freeC > 0) {
                let dropresources = '';
                if (creep.room.name == creep.memory.troom) {
                    dropresources = creep.room.find(FIND_DROPPED_RESOURCES);
                }

                if (dropresources != '') {
                    creep.memory.target = dropresources.sort((a,b) => b.amount - a.amount)[0].id;
                    creep.memory.doing = 'p';
                } else {
                    creep.memory.doing = 's';
                }

                creep.memory.moving = true;
            } else if (storage != '') {
                creep.memory.target = storage[storage.length - 1].id;
                creep.memory.doing = 't';
                creep.memory.moving = true;
            }
        }
	}
};
module.exports = roleCarrier;