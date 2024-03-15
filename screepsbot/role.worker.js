let roleWorker = {
    run: function (creep) {

        if (creep.memory.moving == 0 || creep.memory.moving == '' || creep.memory.moving == undefined){

            if (creep.store.getCapacity() != 0 && creep.store.getFreeCapacity() == 0){
                creep.memory.moving = 1;
                creep.memory.target = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_LINK})).id;
                creep.memory.doing = 't';
            }else{
                creep.memory.moving = 5;
                creep.memory.target = creep.memory.sourceID;
                creep.memory.doing = 'h';
            }
        }
        if (creep.memory.moving > 0){
            let doing = creep.memory.doing;
            let target = Game.getObjectById(creep.memory.target);

            if (target != '' && ((doing == 't' && creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) || (doing == 'h' && creep.harvest(target) == ERR_NOT_IN_RANGE))) {
                creep.moveTo(target, {reusePath: 20, visualizePathStyle: {stroke: '#ffffff'}});
            } else {
                creep.memory.moving--;
            }
        }
    }
};
module.exports = roleWorker;