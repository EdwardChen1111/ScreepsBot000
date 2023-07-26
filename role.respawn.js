let roleRespawn = {
    check: function (name, targets, targetsinvtow, spawnname) {
        if (!Game.creeps[name]) {
            let type = Memory.creeps[name].role;
            let body = Memory.creeps[name].body;
            let sourceId = Memory.creeps[name].sourceID;
            let troom = Memory.creeps[name].troom;
            let hroom = Memory.creeps[name].hroom;
            let out = Memory.creeps[name].out;
            let spawn = Memory.creeps[name].spawn;
            let storageId = Memory.creeps[name].storageID;
            let dospawn = false;
            
            if (type == 'worker') {
                dospawn = true;
            } else if (type == 'harvester') {
                dospawn = true;
            } else if (targets == '') {
                if (type == 'builder') {
                    dospawn = true;
                } else if (type == 'outworker') {
                    dospawn = true;
                } else if (type == 'carrier') {
                    dospawn = true;
                } else if (type == 'outbuilder') {
                    dospawn = true;
                } else if (type == 'claimer' && (Game.getObjectById(sourceId).reservation == undefined || Game.getObjectById(sourceId).reservation.ticksToEnd < 4600)) {
                    dospawn = true;
                }
            } else {
                if (type == 'army') {
                    dospawn = true;
                }
            }
            
            if (targetsinvtow != '') {
                if (type == 'soldier') {
                    dospawn = true;
                    hroom = targetsinvtow[0].room.name;
                    troom = targetsinvtow[0].room.name;
                }
            } 
            
            if (dospawn) {
                if (Game.spawns[spawnname].spawnCreep( body, name, { memory: { role: type, sourceID: sourceId, troom: troom, hroom: hroom, out: out, spawn: spawn, storageID: storageId, body: body}}) == 0){
                    console.log('Respawning non-existing creep memory:', name);
                }
            }
        }
	}
};
module.exports = roleRespawn; 