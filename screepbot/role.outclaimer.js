let roleOutclaimer = {
    run: function (creep) {
        if (creep.room.name == creep.memory.hroom){
            let controller = Game.getObjectById(creep.memory.sourceID);
            if(creep.claimController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller);
            }
        } else {
            const exitDir = creep.room.findExitTo(creep.memory.hroom);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit);
        }
    }
};
module.exports = roleOutclaimer;