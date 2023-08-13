let roleSigner = {
    run: function (creep) {
        room = creep.memory.sourceID
        text = creep.memory.text
        if (room != '') {
            targetroom = room[0];
            if (creep.room.name == targetroom) {
                controller = creep.room.controller;
                if (creep.signController(controller, text) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller);
                } else {
                    room.shift();
                    creep.memory.sourceID = room;
                }
            } else {
                creep.moveTo(new RoomPosition(24, 24, targetroom));
            }
        }
    }
};
module.exports = roleSigner;