let roleBuilder = {
    run: function (creep, bui, controllertime, storage) {
        let target = '';
        controller = creep.room.controller;
        
        if (creep.store.getFreeCapacity() == creep.store.getCapacity() && storage != '' && creep.withdraw(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            target = storage[0];
        } else if (bui != '' && creep.build(bui[0]) == ERR_NOT_IN_RANGE) {
            target = bui[0];
        } else if (bui == '' && creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
            target = controller;
        }
        
        if (target != '') {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
};
module.exports = roleBuilder;