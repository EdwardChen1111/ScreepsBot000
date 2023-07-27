let roleHarvester = {
    run: function (creep, resources, bigresources, spawneng, towereng, storage) {
        if (creep.memory.hroom != creep.room.name) {
            const exitDir = creep.room.findExitTo(creep.memory.hroom);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit);
        }
        if (creep.store.getFreeCapacity() == creep.store.getCapacity() || (spawneng == '' && towereng == '' && resources != '' && creep.store.getFreeCapacity() > 0)) {
            if (bigresources != '') {
                let clost = creep.pos.findClosestByRange(bigresources);
                if (creep.pickup(clost) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(clost);
                }
            } else if (storage != '' && (spawneng != '' || towereng != '')) {
                if (creep.withdraw(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage[0]);
                }
            } else if (resources != '') {
                let clost = creep.pos.findClosestByRange(resources);
                if (creep.pickup(clost) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(clost);
                }
            }
        } else {
            if (spawneng != '') {
                let clost = creep.pos.findClosestByRange(spawneng);
                if (creep.transfer(clost, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(clost, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else if (towereng != '') {
                if (creep.transfer(towereng[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(towereng[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else if (storage != '' && resources != '') {
                if (creep.transfer(storage[storage.length - 1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage[storage.length - 1], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};
module.exports = roleHarvester;