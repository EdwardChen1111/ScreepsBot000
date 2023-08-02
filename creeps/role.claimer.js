let roleClaimer = {
    run: function (creep) {
        if (creep.room.name == creep.memory.troom){
            let controller = creep.room.controller;
            if (creep.reserveController(controller) == ERR_NOT_IN_RANGE || (controller.reservation != undefined && controller.reservation.username != 'Chenwu' && creep.attackController(controller) == ERR_NOT_IN_RANGE)) {
                creep.moveTo(controller);
            }
        } 
        else {
            const exitDir = creep.room.findExitTo(creep.memory.troom);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit);
        }
    }
};
module.exports = roleClaimer;