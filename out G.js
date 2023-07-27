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
        }
	}
};
module.exports = roleCarrier;