let roleHarvester = {
    run: function (creep, resources, bigresources, spawneng, towereng, storage, terminal) {
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
            let target = '';

            if (spawneng != '') {
                target = creep.pos.findClosestByRange(spawneng);
            } else if (towereng != '') {
                target = creep.pos.findClosestByRange(towereng);
            } else if (storage != '' && resources != '') {
                target = storage[storage.length - 1];
            } else if (terminal != '' && terminal.store[RESOURCE_ENERGY] < 120000) {
                target = terminal;
            }
            
            if (target != underfined && creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
	}
};
module.exports = roleHarvester;