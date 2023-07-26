let roleClaimer = {
    run: function (creep) {
        if (creep.room.name == creep.memory.troom){
            let controller = Game.getObjectById(creep.memory.sourceID);
            if (creep.reserveController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller);
            } else if (controller.reservation != undefined && controller.reservation.username != 'EdwardChen1111' && creep.attackController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller);
            }
        } else {
            const exitDir = creep.room.findExitTo(creep.memory.troom);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit);
        }
    }
};
module.exports = roleClaimer;