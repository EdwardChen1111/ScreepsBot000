let roleRespawn = {
    check: function (name, targets, targetsinvtow, spawnname) {
        let type = Memory.creeps[name].role;
        let body = Memory.creeps[name].body;
        let sourceId = Memory.creeps[name].sourceID;
        let troom = Memory.creeps[name].troom;
        let hroom = Memory.creeps[name].hroom;
        let out = Memory.creeps[name].out;
        let spawn = Memory.creeps[name].spawn;
        let room = Memory.creeps[name].spawn;
        let dospawn = false;
        let waring = ['worker', 'harvester'];
        let normal = ['builder', 'outworker', 'carrier', 'outbuilder', 'claimer'];
            
        if (waring.indexOf(type) != -1) {
            dospawn = true;
        } else if (targets == '' && normal.indexOf(type) != -1) {
            if (type != 'claimer') {
                dospawn = true;
            } else if (Game.getObjectById(sourceId) == null || Game.getObjectById(sourceId).reservation == undefined || Game.getObjectById(sourceId).reservation.ticksToEnd < 4000) {
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
            if (Game.spawns[spawnname].spawnCreep( body, name, { memory: { role: type, sourceID: sourceId, troom: troom, hroom: hroom, out: out, spawn: spawn, roomname: room, body: body}}) == 0){
                console.log('Respawning non-existing creep memory:', name);
            }
        }
    }
};

module.exports = roleRespawn; 