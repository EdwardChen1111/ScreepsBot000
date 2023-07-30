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

var roleOutB = require('out B');
var roleOutH = require('out H');
var roleOutG = require('out G');
var roleOutC = require('out C');
var roleOutAll = require('out All');


var roleDoWork = {
    tell: function(creep) {
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'worker') {
            roleWorker.run(creep);
        }
        if(creep.memory.role == 'carrier') {
            roleCarrier.run(creep);
        }
        if(creep.memory.role == 'outworker') {
            roleOutworker.run(creep);
        }
        if(creep.memory.role == 'outbuilder') {
            roleOutbuilder.run(creep);
        }
        if(creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        if(creep.memory.role == 'army') {
            roleArmy.run(creep);
        }
        if(creep.memory.role == 'lumberjack') {
            roleLumberjack.run(creep);
        }
        if(creep.memory.role == 'healer') {
            roleHealer.run(creep);
        }
        if(creep.memory.role == 'soldier') {
            roleSoldier.run(creep);
        }
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        
        
        if(creep.memory.role == 'outB') {
            roleOutB.run(creep);
        }
        if(creep.memory.role == 'outH') {
            roleOutH.run(creep);
        }
        if(creep.memory.role == 'outG') {
            roleOutG.run(creep);
        }
        if(creep.memory.role == 'outC') {
            roleOutC.run(creep);
        }
        if(creep.memory.role == 'outAll') {
            roleOutAll.run(creep);
        }
	}
};
module.exports = roleDoWork; 