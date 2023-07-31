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
            
            if (doing == s) {
                let standby = creep.memory.standby;
                target = new RoomPosition(standby.x, standby.y, standby.roomName);
            } else {
                target = Game.getObjectById(creep.memory.target);
            }
            
            if ((doing == 'p' && creep.pickup(target) == OK) || (doing == 't' && creep.transfer(target) == OK) || (doing == 's' && creep.pos.inRangeTo(target, 10))) {
                creep.memory.moving = false;
            } else {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
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
                creep.memory.target = storage[storage.length - 1];
                creep.memory.doing = 't';
                creep.memory.moving = true;
            }
        }
	}
};
module.exports = roleCarrier;