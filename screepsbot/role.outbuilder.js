let roleOutbuilder = {
    run: function (creep) {
        let freeC = creep.store.getFreeCapacity();
        let Cap = creep.store.getCapacity();
        if (creep.memory.moving == '') {
            creep.memory.moving = false;
            creep.memory.doing = '';
            creep.memory.target = '';
        }

        if (creep.room.name == creep.memory.troom && !creep.memory.moving){
            if (freeC == Cap) {
                if (creep.memory.containerID == '') {
                    let container = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType == STRUCTURE_CONTAINER}});
                    if (container != '') {
                        creep.memory.containerID = container[0].id;
                    }
                }

                if (creep.memory.containerID == '') {
                    let resources = creep.room.find(FIND_DROPPED_RESOURCES);
                    if (resources != '') {
                        resources.sort((a,b) => a.amount - b.amount);
                        creep.memory.target = resources[resources.length-1].id;
                        creep.memory.doing = 'p';
                        creep.memory.moving = true;
                    }
                } else {
                    creep.memory.target = creep.memory.containerID;
                    creep.memory.doing = 'w';
                    creep.memory.moving = true;
                }
            } else {
                let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets != '') {
                    creep.memory.target = targets[0].id;
                    creep.memory.doing = 'b';
                    creep.memory.moving = true;
                } else {
                    targets = creep.room.find(FIND_STRUCTURES, {filter: object => object.hits < object.hitsMax});
                    if (targets != '') {
                        targets.sort((a,b) => (a.hits/a.hitsMax) - (b.hits/b.hitsMax));
                        creep.memory.target = targets[0].id;
                        creep.memory.doing = 'r';
                        creep.memory.moving = true;
                    }
                }
            }
        } else if (!creep.memory.moving) {
            const exitDir = creep.room.findExitTo(creep.memory.troom);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit);
        }

        if (creep.memory.moving) {
            let doing = creep.memory.doing;
            let target = Game.getObjectById(creep.memory.target);

            if (target != '' && ((doing == 'p' && creep.pickup(target) == ERR_NOT_IN_RANGE) || (doing == 'w' && creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) || (doing == 'b' && creep.build(target) == ERR_NOT_IN_RANGE) || (doing == 'r' && creep.repair(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE))) {
                creep.moveTo(target, {reusePath: 20, visualizePathStyle: {stroke: '#ffffff'}});
            } else {
                creep.memory.moving = false;
            }
        }
	}
};
module.exports = roleOutbuilder;