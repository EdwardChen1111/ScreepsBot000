let roleLumberjack = {
    run: function (creep) {
        var flag = Game.flags['Attack'];
        if (flag){
            const look = flag.room.lookAt(flag.pos.x, flag.pos.y);
            look.forEach(function(lookObject) {
                if(lookObject.type == LOOK_STRUCTURES) {
                    if(creep.attack(lookObject.structure) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(lookObject.structure);
                    }
                }
            });
        }
        /*
        if (flag){
            let target = flag.room.find(FIND_HOSTILE_STRUCTURES);
            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        */
        else{
            let way = new RoomPosition(24, 27, creep.memory.hroom);
            creep.moveTo(way);
        } 
	}
};
module.exports = roleLumberjack;