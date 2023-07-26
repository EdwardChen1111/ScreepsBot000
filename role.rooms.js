let roleRespawn = require('role.respawn');
let roleSpawningtxt = require('role.spawningtxt');
let roleDowork = require('role.dowork');
let roleTower = require('role.tower');

let roleRoom = {
    run: function (roomname, username) {
        let spawn = '', alltower = '', storage = '', bui = '', spawneng = '', towereng = '', targets = '', targetsinvtow = '';
        let controllertime = Game.rooms[roomname].controller.ticksToDowngrade;
        let resources = Game.rooms[roomname].find(FIND_DROPPED_RESOURCES);
        let bigresources = resources.filter(function (object) {
            return object.amount > 500;
        });
        spawn = Game.rooms[roomname].find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_SPAWN)}});
        
        if (spawn != '') {
            if (spawn[0].memory.uptime == undefined || spawn[0].memory.uptime == 0) {
                spawn[0].memory.uptime = 20;
                storage = Game.rooms[roomname].find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER)}});
                alltower = Game.rooms[roomname].find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER});
                spawns = Game.rooms[roomname].find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN)}});
            
                if (controllertime > 5000) {
                    bui = Game.rooms[roomname].find(FIND_CONSTRUCTION_SITES);
                }
            
                spawn[0].memory.storage = storage.map(storage => storage.id);
                spawn[0].memory.alltower = alltower.map(alltower => alltower.id);
                spawn[0].memory.bui = bui.map(bui => bui.id);
                spawn[0].memory.spawnengid = spawns.map(spawns => spawns.id);
            } else if (spawn[0].memory.uptime > 0){
                spawn[0].memory.uptime--;
                if (spawn[0].memory.bui != '') {
                    bui = spawn[0].memory.bui.map(id => Game.getObjectById(id));
                }
                if (spawn[0].memory.storage != '') {
                    storage = spawn[0].memory.storage.map(id => Game.getObjectById(id));
                }
                if (spawn[0].memory.alltower != '') {
                    alltower = spawn[0].memory.alltower.map(id => Game.getObjectById(id));
                }
                
                spawneng = spawn[0].memory.spawnengid.map(id => Game.getObjectById(id)).filter(function (structure) {
                    return structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                });
            }
        } else {
            spawns = Game.rooms[roomname].find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN)}});
            bui = Game.rooms[roomname].find(FIND_CONSTRUCTION_SITES);
        }
        
        if (storage != '' && storage.length > 1) {
            storage.sort((a,b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]);
        }
        
        if (bigresources != '') {
            bigresources.sort((a,b) => b.amount - a.amount);
        }
        
        if (spawneng == '' && alltower != '') {
            towereng = alltower.filter(function (structure) {
                return structure.store.getFreeCapacity(RESOURCE_ENERGY) > 500;
            });
        }
        
        for (let spawnname in spawn) {
            roleSpawningtxt.show(spawn[spawnname].name);
        }
        
        if (spawn != '') {
            for (let name in spawn[0].memory.appendrange) {
                if (spawn[0].memory.appendrange[name].reservation != undefined || spawn[0].memory.appendrange[name].owner != undefined) {
                    let room = spawn[0].memory.appendrange[name];
                    targets = targets.concat(Game.rooms[room].find(FIND_HOSTILE_CREEPS, {filter: (creep) => {return (creep.owner.username != 'Chenwu')}}));
                    targetsinvtow = targetsinvtow.concat(Game.rooms[room].find(FIND_HOSTILE_STRUCTURES, {filter: (object) => {return (object.owner.username == 'Invader')}}));
                }
            }
        }
        
        if (targets != '') {
            console.log(targets);
        }
        
        for (let name in Memory.creeps) {
            if (Memory.creeps[name].spawn == roomname && spawn != '') {
                roleRespawn.check(name, targets, targetsinvtow, spawn[0].name);
            }
        }
        
        for (let name in Game.creeps) {
            let creep = Game.creeps[name];
            if (creep.memory.spawn == roomname){
                roleDowork.tell(creep, resources, bigresources, controllertime, bui, spawneng, towereng, targets, storage, spawn);
            }
        }
        
        for (let num in alltower) {
            let tower = alltower[num];
            roleTower.work(tower);
        }
    }
}
module.exports = roleRoom;