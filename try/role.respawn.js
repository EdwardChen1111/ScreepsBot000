var roleRespawn = {
    check: function(name) {

        var flagA = Game.flags['Farm'];
        var flagB = Game.flags['Attack'];
        let type = Memory.creeps[name].role;
        let body = Memory.creeps[name].body;
        let sourceID = Memory.creeps[name].sourceID;
        let troom = Memory.creeps[name].troom;
        let hroom = Memory.creeps[name].hroom;
        let spawn = Memory.creeps[name].spawn;
        let link = Memory.creeps[name].link;
        let linkID = Memory.creeps[name].linkID;
        let dospawn = false;
        let targets = '';

        for (let name in Game.rooms) {
            targets = Game.rooms[name].find(FIND_HOSTILE_CREEPS, {filter: (creep) => {return (creep.owner.username != 'EdwardChen1111')}});
            if (targets != '') {
                Game.notify(Game.rooms[name].name , 0)
                break;    
            }
        }
        if (!Game.creeps[name]) {
            if (type == 'harvester') {
                dospawn = true;
            } else if (type == 'worker') {
                dospawn = true;
                if(name == 'E11S35_Worker'){
                    type = 'outG';
                }
            }
            if (targets == '') { 
                if(flagA != undefined){
                    if (type == 'lumberjack') {
                        dospawn = true;
                    } 
                }
                if(flagB != undefined){
                    if (type == 'soldier') {
                        dospawn = true;
                    } 
                }
                if (type == 'builder') {
                    dospawn = true;
                } 
                else if (type == 'outworker') {
                    dospawn = true;
                } 
                else if (type == 'carrier') {
                    dospawn = true;
                } 
                else if (type == 'outbuilder') {
                    dospawn = true;
                } 
                else if (type == 'claimer') {
                    dospawn = true;
                }
                else if (type == 'miner') {
                    dospawn = true;
                }
                else if (type == 'outH') {
                    dospawn = true;
                }
                else if (type == 'outB') {
                    dospawn = true;
                }
            } 
            else {
                if (type == 'army') {
                    dospawn = true;
                } 
            }
            if(dospawn){
                if (Game.spawns[spawn].spawnCreep( body, name, { memory: { role: type ,body :body ,sourceID: sourceID ,troom: troom ,hroom: hroom, spawn: spawn,link: link,linkID: linkID} } ) == 0){
                    console.log('Respawning non-existing creep memory:', name);
                }
            }
        }
	}
};
module.exports = roleRespawn; 