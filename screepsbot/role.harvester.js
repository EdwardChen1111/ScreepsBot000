let roleHarvester = {
    run: function (creep, resources, bigresources, spawneng, towereng, storage, terminal, take_over_link, died_resource) {
        let freeC = creep.store.getFreeCapacity();
        died_resource = died_resource.filter(function (object) {
            return object.store.getUsedCapacity(RESOURCE_ENERGY) > 500;
        });


        if (creep.memory.link == undefined || creep.memory.link == true) {
            creep.memory.link = false;
        }
        
        if (creep.memory.moving == '' || creep.memory.moving == undefined) {
            creep.memory.moving = false;
            creep.memory.doing = '';
            creep.memory.target = '';
        }
        
        if (take_over_link != '' && take_over_link != undefined){
            creep.memory.link = true;
        }
        if (!creep.memory.moving) {
            if (freeC == creep.store.getCapacity()) {
                if (creep.memory.link){
                    if (take_over_link.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
                        creep.memory.target = take_over_link.id;
                        creep.memory.doing = 'w';
                        creep.memory.moving = true;
                    } else if (died_resource != '') {
                        creep.memory.target = creep.pos.findClosestByRange(died_resource).id;
                        creep.memory.doing = 'w';
                        creep.memory.moving = true;
                    } else if (bigresources != '') {
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
                    if (died_resource != '') {
                        creep.memory.target = creep.pos.findClosestByRange(died_resource).id;
                        creep.memory.doing = 'w';
                        creep.memory.moving = true;
                    } else if (bigresources != '') {
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
                } else if (terminal != undefined && Memory.creeps[`${creep.room.name}_Transfer000`] == undefined && terminal.store[RESOURCE_ENERGY] < 10000) {
                    creep.memory.target = terminal.id;
                    creep.memory.doing = 't';
                    creep.memory.moving = true;
                } else if (storage != '' && resources != '') {
                    creep.memory.target = storage[0].id;
                    creep.memory.doing = 't';
                    creep.memory.moving = true;
                }
            }
        }

        if (creep.memory.moving) {
            let doing = creep.memory.doing;
            let target = Game.getObjectById(creep.memory.target);

            if (target != '' && ((doing == 'p' && creep.pickup(target) == ERR_NOT_IN_RANGE) || (doing == 'w' && creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) || (doing == 't' && creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE))) {
                creep.moveTo(target, {reusePath: 20, visualizePathStyle: {stroke: '#ffffff'}});
            } else {
                creep.memory.moving = false;
            }
        }
	}
};
module.exports = roleHarvester;