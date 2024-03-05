let roleRespawn = require('role.respawn');
let roleSpawningtxt = require('role.spawningtxt');
let roleUpdatingtxt = require('role.updatingtxt');
let roleDowork = require('role.dowork');
let roleTower = require('role.tower');
let roleLink = require('role.link');
let roleAutoSellMarket = require('role.autosellmarket');

let roleRoom = {
    run: function (room, roomname, username) {
        let spawn = '', alltower = '', storage = '', terminal = '', bui = '', spawneng = '', towereng = '', targets = [], targetsinvtow = [], linkid = '', take_over_link = '', mineral = '', ruin = '', tombstone = '';
        let controllertime = room.controller.ticksToDowngrade;
        let resources = room.find(FIND_DROPPED_RESOURCES, {filter: (resources) => {return (resources.resourceType == RESOURCE_ENERGY)}});
        spawn = room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_SPAWN)}});
        let bigresources = resources.filter(function (object) {
            return object.amount > 500;
        });
        tombstone = room.find(FIND_TOMBSTONES, {filter: (t) => {return (t.store.getUsedCapacity() > 0)}});
        ruin = room.find(FIND_RUINS, {filter: (r) => {return (r.store.getUsedCapacity() > 0)}});
        let died_resource = ruin.concat(tombstone);
        if (spawn != '') {
            if (spawn[0].memory.uptime == undefined || spawn[0].memory.uptime == 0) {
                spawn[0].memory.uptime = 20;

                roleUpdatingtxt.update(spawn[0].name, spawn[0].memory.tradetime);

                storage = room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE)}});
                alltower = room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER});
                spawns = room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN)}});
                linkid = room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_LINK});
                mineral = room.find(FIND_MINERALS);
                terminal = room.terminal;

                if (controllertime > 5000) {
                    bui = room.find(FIND_CONSTRUCTION_SITES);
                    spawn[0].memory.bui = bui.map(bui => bui.id);
                } else {
                    spawn[0].memory.bui = '';
                }
            
                spawn[0].memory.storage = storage.map(storage => storage.id);
                spawn[0].memory.alltower = alltower.map(alltower => alltower.id);
                spawn[0].memory.spawnengid = spawns.map(spawns => spawns.id);
                spawn[0].memory.linkid = linkid.map(links => links.id);
                if (terminal != undefined && terminal.owner.username == username) {
                    spawn[0].memory.terminal = room.terminal.id;
                    spawn[0].memory.tradetime --;
                    if (spawn[0].memory.tradetime == undefined || spawn[0].memory.tradetime == 0) {
                        spawn[0].memory.tradetime = 10;
                        roleAutoSellMarket.deal(room,room.terminal,mineral,spawn[0].name);
                    }
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
                if (spawn[0].memory.linkid != '') {
                    linkid = spawn[0].memory.linkid.map(id => Game.getObjectById(id));
                }
                if (spawn[0].memory.take_over_link_id != '' && spawn[0].memory.take_over_link_id != undefined) {
                    take_over_link = Game.getObjectById(spawn[0].memory.take_over_link_id);
                }
                spawneng = spawn[0].memory.spawnengid.map(id => Game.getObjectById(id)).filter(function (structure) {
                    return structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                });
            }
        } else {
            spawns = room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN)}});
            bui = room.find(FIND_CONSTRUCTION_SITES);
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
            //console.log(targetsinvtow)
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
        
        if (linkid != '' && take_over_link != ''){
            for (let num in linkid) {
                let link = linkid[num];
                roleLink.work(link, take_over_link);
            }
        }
        
        for (let name in Game.creeps) {
            let creep = Game.creeps[name];
            if (creep.memory.roomname == roomname){
                roleDowork.tell(creep, resources, bigresources, controllertime, bui, spawneng, towereng, targets, storage, spawn, terminal, take_over_link, died_resource);
            }
        }
        
        for (let num in alltower) {
            let tower = alltower[num];
            roleTower.work(tower);
        }

    }
}
module.exports = roleRoom;