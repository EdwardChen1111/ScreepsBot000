var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleWorker = require('role.worker');
var roleCarrier = require('role.carrier');
var roleOutworker = require('role.outworker');
var roleOutbuilder = require('role.outbuilder');
var roleClaimer = require('role.claimer');
var roleArmy = require('role.army');
var roleLumberjack = require('role.lumberjack');
var roleHealer = require('role.healer');
var roleSoldier = require('role.soldier');
var roleMiner = require('role.miner');
var roleTransfer = require('role.transfer');

var roleOutB = require('out B');
var roleOutH = require('out H');
var roleOutG = require('out G');
var roleOutC = require('out C');
var roleOutAll = require('out All');

var roleDoWork = {
    tell: function(creep) {
    
        /*
        let Controller = creep.room.controller;
        let Link = Game.getObjectById(creep.memory.linkID);
        let SourceNum = creep.memory.sourceID;
        let Tombstone = creep.pos.findClosestByRange(creep.room.find(FIND_TOMBSTONES, {filter: (tombstone) => {return (tombstone.store[RESOURCE_ENERGY] > 0)}}));
        let Mineral = creep.pos.findClosestByRange(creep.room.find(FIND_MINERALS, {filter: (mineral) => {return (mineral.amount > 0)}}));
        let Sources = creep.room.find(FIND_SOURCES);
        let DropResources = creep.pos.findClosestByRange(creep.room.find(FIND_DROPPED_RESOURCES, {filter: (resources) => {return (resources.amount > creep.store.getFreeCapacity())}}));
        let RareResources = creep.pos.findClosestByRange(creep.room.find(FIND_DROPPED_RESOURCES, {filter: (resources) => {return (resources.resourceType != RESOURCE_ENERGY)}}));
        let EnergyFrom = creep.pos.findClosestByRange(creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_LINK) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > creep.store.getFreeCapacity()}})));
        let NeedBuild = creep.pos.findClosestByRange(creep.room.find(FIND_CONSTRUCTION_SITES));
        let NeedFix = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.hits < structure.hitsMax)}}));
        let Spawn = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 && creep.store.getUsedCapacity(RESOURCE_ENERGY) >= structure.store.getFreeCapacity(RESOURCE_ENERGY)}}));
        let Extension = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 && creep.store.getUsedCapacity(RESOURCE_ENERGY) >= structure.store.getFreeCapacity(RESOURCE_ENERGY)}}));
        let Tower = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_TOWER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 200 && creep.store.getUsedCapacity(RESOURCE_ENERGY) >= structure.store.getFreeCapacity(RESOURCE_ENERGY)}}));
        let Terminal = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_TERMINAL)}}));
        let Lab = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_LAB) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0}}));
        let Factory = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_FACTORY) && structure.store.getUsedCapacity(RESOURCE_ENERGY) < 20000}}));
        let Storage = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE)}}));
        let Container = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;}}));
        */
        let EnergyFrom = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_LINK) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > creep.store.getFreeCapacity()}}));
        let Controller = creep.room.controller;
        let NeedBuild = creep.pos.findClosestByRange(creep.room.find(FIND_CONSTRUCTION_SITES));
        let Mineral = creep.pos.findClosestByRange(creep.room.find(FIND_MINERALS, {filter: (mineral) => {return (mineral.mineralAmount > 0)}}));
        let Terminal = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_TERMINAL)}}));
        let Storage = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE)}}));
        let Link = Game.getObjectById(creep.memory.linkID);
        let SourcesNum = creep.memory.sourceID;
        let Sources = creep.room.find(FIND_SOURCES);
        let role = creep.memory.role;
        
        if(role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if(role == 'builder') {
            roleBuilder.run(creep,NeedBuild,Controller,EnergyFrom);
        }
        else if(role == 'worker') {
            roleWorker.run(creep,Sources,SourcesNum,Link);
        }
        else if(role == 'carrier') {
            roleCarrier.run(creep);
        }
        else if(role == 'outworker') {
            roleOutworker.run(creep,Sources,SourcesNum);
        }
        else if(role == 'outbuilder') {
            roleOutbuilder.run(creep);
        }
        else if(role == 'claimer') {
            roleClaimer.run(creep);
        }
        else if(role == 'army') {
            roleArmy.run(creep);
        }
        else if(role == 'lumberjack') {
            roleLumberjack.run(creep);
        }
        else if(role == 'healer') {
            roleHealer.run(creep);
        }
        else if(role == 'soldier') {
            roleSoldier.run(creep);
        }
        else if(role == 'miner') {
            roleMiner.run(creep,Mineral,Terminal,Storage);
        }
        else if(role == 'transfer') {
            roleTransfer.run(creep);
        }
        
        
        else if(role == 'outB') {
            roleOutB.run(creep);
        }
        else if(role == 'outH') {
            roleOutH.run(creep);
        }
        else if(role == 'outG') {
            roleOutG.run(creep);
        }
        else if(role == 'outC') {
            roleOutC.run(creep);
        }
        else if(role == 'outAll') {
            roleOutAll.run(creep);
        }
	}
};
module.exports = roleDoWork; 