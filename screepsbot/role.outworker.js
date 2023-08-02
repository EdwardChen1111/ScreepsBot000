let roleOutworker = {
    run: function (creep) {
        let freeC = creep.store.getFreeCapacity();
        if (creep.memory.moving == '') {
            creep.memory.moving = false;
            creep.memory.doing = '';
            creep.memory.target = '';
        }

        if (creep.room.name == creep.memory.troom && !creep.memory.moving){
            let body = '';
            body = creep.body.filter(function (object) {
                return object.type == 'carry';
            });

            if (body == '' || freeC > 0) {
                creep.memory.target = creep.memory.sourceID;
                creep.memory.doing = 'h';
                creep.memory.moving = true;
            } else {
                if (creep.memory.containerID == undefined || creep.memory.containerID == '') {
                    let container = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType == STRUCTURE_CONTAINER}});
                    if (container != '') {
                        creep.memory.containerID = container[0].id;
                    } else {
                        creep.memory.containerID = '';
                    }
                }

                creep.memory.target = creep.memory.containerID;
                creep.memory.doing = 't';
                creep.memory.moving = true;
            }
        } else if (!creep.memory.moving) {
            let standby = creep.memory.standby;
            let target = new RoomPosition(standby.x, standby.y, standby.roomName);
            creep.moveTo(target, {reusePath: 20});
        }

        if (creep.memory.moving) {
            let doing = creep.memory.doing;
            let target = Game.getObjectById(creep.memory.target);

            if (target != '' && ((doing == 'h' && creep.harvest(target) == ERR_NOT_IN_RANGE) || (doing == 't' && creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE))) {
                creep.moveTo(target, {reusePath: 20, visualizePathStyle: {stroke: '#ffffff'}});
            } else {
                creep.memory.moving = false;
            }
        }
    }
};
module.exports = roleOutworker;