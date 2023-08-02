let roleRespawn = {
    check: function (name, targets, targetsinvtow) {
        let memory = Memory.creeps[name];
        let type = memory.role;
        let body = memory.body;
        let sourceId = memory.sourceID;
        let troom = memory.troom;
        let hroom = memory.hroom;
        let out = memory.out;
        let spawn = memory.spawn;
        let room = memory.roomname;
        let checkname = name;
        let standby = new RoomPosition(24, 24, memory.troom);
        let dospawn = false;
        let waring = ['worker', 'harvester'];
        let normal = ['builder', 'outworker', 'carrier', 'outbuilder', 'claimer', 'miner', 'transfer'];
            
        if (waring.indexOf(type) != -1) {
            dospawn = true;
        } else if (targets == '' && normal.indexOf(type) != -1) {
            if (type != 'claimer' && type != 'miner' && checkname == name) {
                dospawn = true;
            } else if (type == 'claimer' && (Game.getObjectById(sourceId) == null || Game.getObjectById(sourceId).reservation == undefined || Game.getObjectById(sourceId).reservation.ticksToEnd < 4000)) {
                dospawn = true;
            } else if (type == 'miner' && Game.getObjectById(sourceId).ticksToRegeneration == undefined) {
                dospawn = true;
            } else if (checkname != name && (!Game.creeps[checkname] || Game.creeps[checkname].ticksToLive < 100)) {
                dospawn = true;
            }
        } else if (targets != '' && type == 'army'){
            dospawn = true;
        }
            
        if (targetsinvtow != '') {
            if (type == 'soldier') {
                dospawn = true;
                hroom = targetsinvtow[0].room.name;
                troom = targetsinvtow[0].room.name;
            }
        } 
            
        if (dospawn) {
            if (Game.spawns[spawn].spawnCreep( body, name, { memory: { role: type, sourceID: sourceId, troom: troom, hroom: hroom, out: out, spawn: spawn, roomname: room, standby: standby, body: body, checkname: checkname}}) == 0){
                console.log('Respawning non-existing creep memory:', name);
            }
        }
    }
};

module.exports = roleRespawn; 