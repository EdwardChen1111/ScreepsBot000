let roleBuilder = {
    run: function (creep, storage, bui, storage) {
        controller = creep.room.controller;
        if (creep.store.getFreeCapacity() == creep.store.getCapacity() && storage != '') {
            if (creep.withdraw(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage[0]);
            }
        } else if (bui != '' && creep.build(bui[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(bui[0], {visualizePathStyle: {stroke: '#ffffff'}});
        } else if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(controller, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
};
module.exports = roleBuilder;