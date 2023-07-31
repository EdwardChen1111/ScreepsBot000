let roleHarvester = {
    run: function (creep, resources, bigresources, spawneng, towereng, storage, terminal) {
        let freeC = creep.store.getFreeCapacity();
        if (creep.memory.moving == '') {
            creep.memory.moving = false;
            creep.memory.doing = '';
            creep.memory.target = '';
        }

        if (creep.memory.moving) {
            let doing = creep.memory.doing;
            let target = Game.getgetObjectById(creep.memory.target);

            if ((doing == 'p' && creep.pickup(target) == OK) || (doing == 'w' && creep.withdraw(target) == OK) || (doing == 't' && creep.transfer(target) == OK)) {
                creep.memory.moving = false;
            } else {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            if (freeC == creep.store.getCapacity()) {
                if (bigresources != '') {
                    creep.memory.target = creep.pos.findClosestByRange(bigresources).id;
                    creep.memory.doing = 'p';
                    creep.memory.moving = true;
                } else if (storage != '' && (spawneng != '' || towereng != '')) {
                    creep.memory.target = storage[0].id;
                    creep.memory.doing = 'w';
                    creep.memory.moving = true;
                } else if (resources != '') {
                    creep.memory.target = creep.pos.findClosestByRange(resources).id;
                    creep.memory.doing = 'p';
                    creep.memory.moving = true;
                }
            } else {
                if (spawneng != '') {
                    creep.memory.target = creep.pos.findClosestByRange(spawneng).id;
                    creep.memory.doing = 't';
                    creep.memory.moving = true;
                } else if (towereng != '') {
                    creep.memory.target = creep.pos.findClosestByRange(towereng).id;
                    creep.memory.doing = 't';
                    creep.memory.moving = true;
                } else if (storage != '' && resources != '') {
                    creep.memory.target = storage[storage.length - 1].id;
                    creep.memory.doing = 't';
                    creep.memory.moving = true;
                } else if (terminal != undefined && terminal.store[RESOURCE_ENERGY] < 120000) {
                    creep.memory.target = terminal.id;
                    creep.memory.doing = 't';
                    creep.memory.moving = true;
                }
            }
        }
	}
};
module.exports = roleHarvester;