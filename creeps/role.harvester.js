let roleHarvester = {
    run: function (creep) {
        
        let hroom = creep.memory.hroom;
        let resources = Game.rooms[hroom].find(FIND_DROPPED_RESOURCES, {filter: (resources) => {return (resources.resourceType == RESOURCE_ENERGY)}});
        let bigresources = resources.filter(function (resources) {return resources.amount > creep.store.getFreeCapacity()});
        let tombstone = creep.room.find(FIND_TOMBSTONES, {filter: (tombstone) => {return (tombstone.store > 0)}});
        let extension = Game.rooms[hroom].find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0}});
        let spawn = Game.rooms[hroom].find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0}});
        let tower = Game.rooms[hroom].find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_TOWER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 200}});
        let storage = Game.rooms[hroom].find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE)}});
        let terminal = Game.rooms[hroom].find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_TERMINAL)}});
        let link = Game.getObjectById(creep.memory.linkID);
        
        if(creep.memory.moving == ''){
            creep.memory.moving = false;
            creep.memory.doing = '';
            creep.memory.target = '';
        }
        if(!creep.memory.moving){
            if(creep.store.getCapacity() == creep.store.getFreeCapacity()){

                if(creep.memory.link == false && link.store.getUsedCapacity(RESOURCE_ENERGY) > 0 && (creep.store.getFreeCapacity(RESOURCE_ENERGY) < link.store.getUsedCapacity(RESOURCE_ENERGY) || link.store.getUsedCapacity(RESOURCE_ENERGY) > 600)){
                    creep.memory.doing = 'w';
                    creep.memory.target = link.id;
                    creep.memory.moving = true;
                }
                else if (bigresources != '') {
                    creep.memory.doing = 'p';
                    creep.memory.target = creep.pos.findClosestByRange(bigresources).id;
                    creep.memory.moving = true;
                }
                else if (storage != '' && (spawn != '' || extension != '' || tower != '')) {
                    creep.memory.doing = 'w';
                    creep.memory.target = creep.pos.findClosestByRange(storage).id;
                    creep.memory.moving = true;
                }
                else if (tombstone != '') {
                    creep.memory.doing = 'w';
                    creep.memory.target = creep.pos.findClosestByRange(tombstone).id;
                    creep.memory.moving = true;
                } 
                else if (resources != '') {
                    creep.memory.doing = 'p';
                    creep.memory.target = creep.pos.findClosestByRange(resources).id;
                    creep.memory.moving = true;
                } 
            }
            else{
                if (spawn != '' && (creep.store.getUsedCapacity(RESOURCE_ENERGY) >= creep.pos.findClosestByRange(spawn).store.getFreeCapacity(RESOURCE_ENERGY))) {
                    creep.memory.doing = 't';
                    creep.memory.target = creep.pos.findClosestByRange(spawn).id;
                    creep.memory.moving = true;
                } 
                else if (extension != '' && (creep.store.getUsedCapacity(RESOURCE_ENERGY) >= creep.pos.findClosestByRange(extension).store.getFreeCapacity(RESOURCE_ENERGY))) {
                    creep.memory.doing = 't';
                    creep.memory.target = creep.pos.findClosestByRange(extension).id;
                    creep.memory.moving = true;
                }
                else if (creep.memory.link == true && link.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                    creep.memory.doing = 't';
                    creep.memory.target = link.id;
                    creep.memory.moving = true;
                }
                else if (tower != '' && creep.store.getUsedCapacity(RESOURCE_ENERGY) > 200) {
                    creep.memory.doing = 't';
                    creep.memory.target = creep.pos.findClosestByRange(tower).id;
                    creep.memory.moving = true;
                } /*
                else if (terminal != '' && Memory.creeps[`${creep.room.name}_Transfer000`] == undefined && (creep.pos.findClosestByRange(terminal).store[RESOURCE_ENERGY] < 20000)) {
                    creep.memory.doing = 't';
                    creep.memory.target = terminal.id;
                    creep.memory.moving = true;
                }*/
                else if (storage != '') {
                    creep.memory.doing = 't';
                    creep.memory.target = creep.pos.findClosestByRange(storage).id;
                    creep.memory.moving = true;
                } 
            }
        }
        else if(creep.memory.moving){
            let doing = creep.memory.doing;
            let target = Game.getObjectById(creep.memory.target);

            if (target != '' && ((doing == 'p' && creep.pickup(target) == ERR_NOT_IN_RANGE) || (doing == 'w' && creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) || (doing == 't' && creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE))) {
                creep.moveTo(target, {reusePath: 10, visualizePathStyle: {stroke: '#ffffff'}});
            } 
            else{
                creep.memory.moving = false;
            }
        }
    }
};
module.exports = roleHarvester;