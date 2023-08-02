var roleCarrier = {
    run: function(creep) {
	    const way = new RoomPosition(26, 1, creep.memory.troom);
        creep.moveTo(way);
        if(creep.pos.roomName == creep.memory.troom){
            if(creep.name == 'E11S35_Builder1' || creep.name == 'E11S35_Builder2'){
                creep.memory.role = 'outB';
            }
            else if(creep.name == 'E11S35_Worker'){
                creep.memory.role = 'worker';
            }
            else if(creep.name == 'E11S35_Harvester1'){
                creep.memory.role = 'outH';
            }
            else if(creep.name == 'E11S22_outC1'){
                if(creep.room.name == 'E11S26'){
                    creep.memory.troom = 'E10S25';
                }
                if(creep.room.name == 'E10S25'){
                    creep.memory.troom = 'E10S23';
                }
                if(creep.room.name == 'E10S23'){
                    creep.memory.troom = 'E11S23';
                }
                if(creep.room.name == 'E11S23'){
                    creep.memory.troom = 'E11S22';
                }
                if(creep.room.name == 'E11S22'){
                    creep.memory.role = 'outC';
                }
            }
        }
	}
};
module.exports = roleCarrier;