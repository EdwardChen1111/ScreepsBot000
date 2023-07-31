let roleClaimer = {
    run: function (creep) {
        if (creep.room.name == creep.memory.troom){
            let controller = Game.getObjectById(creep.memory.sourceID);
            if (creep.reserveController(controller) == ERR_NOT_IN_RANGE || (controller.reservation != undefined && controller.reservation.username != 'EdwardChen1111' && creep.attackController(controller) == ERR_NOT_IN_RANGE)) {
                creep.moveTo(controller);
            }
        } else {
            let standby = creep.memory.standby;
            target = new RoomPosition(standby.x, standby.y, standby.roomName);
            creep.moveTo(standby);
        }
    }
};
module.exports = roleClaimer;