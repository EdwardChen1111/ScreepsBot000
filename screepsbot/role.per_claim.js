let rolePerClaimer = {
    run: function (creep) {
        if (creep.room.name == creep.memory.standby.roomName){
            if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        } else {
            let standby = creep.memory.standby;
            let target = new RoomPosition(standby.x, standby.y, standby.roomName);
            creep.moveTo(target, {reusePath: 20});
        }
    }
};
module.exports = rolePerClaimer;