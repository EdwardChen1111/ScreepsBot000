var roleCarrier = {
    run: function(creep) {
	    const way = new RoomPosition(31, 24, creep.memory.troom);
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
            else if(creep.name == 'E12S36_outAll1' || creep.name == 'E11S22_outC'){
                if(creep.room.name == 'E10S35'){
                    creep.memory.troom = 'E10S23';
                }
                if(creep.room.name == 'E10S23'){
                    creep.memory.troom = 'E11S22';
                }
                if(creep.room.name == 'E11S22'){
                    if(creep.name == 'E12S36_outAll1'){
                        creep.memory.role = 'outAll';
                    }
                    else if(creep.name == 'E11S22_outC1'){
                        creep.memory.role = 'outC';
                    }
                }
            }
        }
	}
};
module.exports = roleCarrier;