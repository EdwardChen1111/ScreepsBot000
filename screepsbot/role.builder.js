let roleBuilder = {
    run: function (creep, bui, controllertime, storage) {
        let target = '';
        controller = creep.room.controller;
        
        if (creep.store.getFreeCapacity() == creep.store.getCapacity() && storage != '' && creep.withdraw(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            target = storage[0];
        } else if (controllertime > 5000 && bui != '' && creep.build(bui[0]) == ERR_NOT_IN_RANGE) {
            target = bui[0];
        } else if ((controllertime < 5000 || bui == '') && creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
            target = controller;
        }
        
        if (target != '') {
            creep.moveTo(target, {reusePath: 20, visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
};
module.exports = roleBuilder;

Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'W7N3_Builder2',{memory:{role:'builder',sourceID:'ff7a07728e60965',troom:'W7N3', hroom:'W7N3', out:'', spawn:'Spawn1', roomname:'W7N4', body:['work','work','work','work','work','work','carry','carry','carry','carry','carry','carry','move','move','move','move','move','move'],standby:{x:26,y:26,roomName:'W7N4'}}});