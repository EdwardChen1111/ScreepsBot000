let roleSpawningtxt = require('role.spawningtxt');

let roleRespawn = {
    check: function (name, targets, targetsinvtow) {
        let memory = Memory.creeps[name];
        let spawn = memory.spawn;
        if (Game.spawns[spawn].spawning == null){
            let type = memory.role;
            let body = memory.body;
            let sourceId = memory.sourceID;
            let hroom = memory.hroom;
            let room = memory.roomname;
            let standby = new RoomPosition(24, 24, memory.standby.roomName);
            let dospawn = false;
            let waring = ['worker', 'harvester'];
            let normal = ['builder', 'outworker', 'carrier', 'outbuilder', 'claimer', 'miner', 'transfer' , 'universal'];
                
            if (waring.indexOf(type) != -1) {
                dospawn = true;
            } else if (targets == '' && normal.indexOf(type) != -1) {
                if (type != 'claimer' && type != 'miner') {
                    dospawn = true;
                } else if (type == 'claimer' && (Game.getObjectById(sourceId) == null || Game.getObjectById(sourceId).reservation == undefined || Game.getObjectById(sourceId).reservation.ticksToEnd < 4000)) {
                    dospawn = true;
                } else if (type == 'miner' && Game.getObjectById(sourceId).ticksToRegeneration == undefined) {
                    dospawn = true;
                }
            } else if (targets != '' && type == 'army'){
                dospawn = true;
            }
                
            if (targetsinvtow != '') {
                if (type == 'soldier') {
                    dospawn = true;
                    hroom = targetsinvtow[0].room.name;
                    standby.roomName = targetsinvtow[0].room.name;
                }
            } /*
            if (){
                dospawn = false;
            }*/
                
            if (dospawn) {
                if (Game.spawns[spawn].spawnCreep( body, name, { memory: { role: type, sourceID: sourceId, hroom: hroom, spawn: spawn, roomname: room, standby: standby, body: body}}) == 0){
                    console.log('Respawning non-existing creep memory:', name);
                }
            }
        }else{
            roleSpawningtxt.show(spawn,Game.spawns[spawn].spawning.name,name)
        }
    }
};

module.exports = roleRespawn; 