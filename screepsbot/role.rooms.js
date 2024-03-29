let roleRespawn = require('role.respawn');
let roleSpawningtxt = require('role.spawningtxt');
let roleDowork = require('role.dowork');
let roleTower = require('role.tower');

let roleRoom = {
    run: function (room, roomname, username) {
        let spawn = '', alltower = '', storage = '', terminal = '', bui = '', spawneng = '', towereng = '', targets = [], targetsinvtow = [];
        let controllertime = room.controller.ticksToDowngrade;
        let resources = room.find(FIND_DROPPED_RESOURCES);
        spawn = room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_SPAWN)}});
        let bigresources = resources.filter(function (object) {
            return object.amount > 500;
        });
        
        if (spawn != '') {
            if (spawn[0].memory.uptime == undefined || spawn[0].memory.uptime == 0) {
                spawn[0].memory.uptime = 20;
                storage = room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER)}});
                alltower = room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER});
                spawns = room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN)}});
                terminal = room.terminal;

                if (controllertime > 5000) {
                    bui = room.find(FIND_CONSTRUCTION_SITES);
                }
            
                spawn[0].memory.storage = storage.map(storage => storage.id);
                spawn[0].memory.alltower = alltower.map(alltower => alltower.id);
                spawn[0].memory.bui = bui.map(bui => bui.id);
                spawn[0].memory.spawnengid = spawns.map(spawns => spawns.id);
                if (terminal != undefined) {
                    spawn[0].memory.terminal = room.terminal.id;
                }
            } else if (spawn[0].memory.uptime > 0){
                spawn[0].memory.uptime--;
                
                if (spawn[0].memory.bui != '') {
                    bui = spawn[0].memory.bui;

                    if (Game.getObjectById(bui[0]) == '') {
                        bui.shift();
                        spawn[0].memory.bui = bui;
                    }
                    
                    if (bui != '') {
                        bui = spawn[0].memory.bui.map(id => Game.getObjectById(id));
                    }
                }
                if (spawn[0].memory.storage != '') {
                    storage = spawn[0].memory.storage.map(id => Game.getObjectById(id));
                }
                if (spawn[0].memory.alltower != '') {
                    alltower = spawn[0].memory.alltower.map(id => Game.getObjectById(id));
                }
                if (spawn[0].memory.terminal != '') {
                    terminal = Game.getObjectById(spawn[0].memory.terminal);
                }
                
                spawneng = spawn[0].memory.spawnengid.map(id => Game.getObjectById(id)).filter(function (structure) {
                    return structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                });
            }
        } else {
            spawns = room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN)}});
            bui = room.find(FIND_CONSTRUCTION_SITES);
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
        
        if (spawn != '') {
            for (let num in spawn[0].memory.appendrange) {
                let appendroom = Game.rooms[spawn[0].memory.appendrange[num]];
                if (appendroom != undefined && appendroom.controller != undefined && (appendroom.controller.reservation != undefined || appendroom.controller.owner != undefined)) {
                    targets.push(...appendroom.find(FIND_HOSTILE_CREEPS, {filter: (creep) => {return (creep.owner.username != 'Chenwu')}}));
                    targetsinvtow.push(...appendroom.find(FIND_HOSTILE_STRUCTURES, {filter: (object) => {return (object.owner.username == 'Invader')}}));
                }
            }
        }
        
        if (targets != '') {
            console.log(targets);
        }
        
        for (let name in Memory.creeps) {
            if (!Game.creeps[name] && Memory.creeps[name].roomname == roomname && Memory.creeps[name].spawn != '') {
                roleRespawn.check(name, targets, targetsinvtow);
            }
        }

        for (let spawnname in spawn) {
            roleSpawningtxt.show(spawn[spawnname].name);
        }
        
        for (let name in Game.creeps) {
            let creep = Game.creeps[name];
            if (creep.memory.roomname == roomname){
                roleDowork.tell(creep, resources, bigresources, controllertime, bui, spawneng, towereng, targets, storage, spawn, terminal);
            }
        }
        
        for (let num in alltower) {
            let tower = alltower[num];
            roleTower.work(tower);
        }
    }
}
module.exports = roleRoom;