let roleMiner = {
    run: function (creep, terminal) {
        let sources = Game.getObjectById(creep.memory.sourceID);
        if (creep.store.getFreeCapacity() > 0) {
            if (creep.harvest(sources) == ERR_NOT_IN_RANGE){
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else if (terminal.store.getFreeCapacity() > 150000) {
            if (creep.transfer(terminal, sources.mineralType) == ERR_NOT_IN_RANGE){
                creep.moveTo(terminal, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }

        if (creep.memory.moving == 0 || creep.memory.moving == '' || creep.memory.moving == undefined){

            if (creep.store.getCapacity() != 0 && creep.store.getFreeCapacity() == 0){
                creep.memory.moving = 1;
                creep.memory.target = terminal.id;
                creep.memory.doing = 't';
            }else{
                creep.memory.moving = 25;
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
module.exports = roleMiner;