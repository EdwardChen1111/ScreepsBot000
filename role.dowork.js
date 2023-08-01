let roleHarvester = require('role.harvester');
let roleBuilder = require('role.builder');
let roleWorker = require('role.worker');
let roleOutworker = require('role.outworker');
let roleOutbuilder = require('role.outbuilder');
let roleOutclaimer = require('role.outclaimer');
let roleCarrier = require('role.carrier');
let roleArmy = require('role.army');
let roleUniversal = require('role.universal');
let roleClaimer = require('role.claimer');
let roleSoldier = require('role.soldier');
let roleHealer = require('role.healer');
let roleMiner = require('role.miner');
let roleTransfer = require('role.transfer');

let roleDoWork = {
    tell: function (creep, resources, bigresources, controllertime, bui, spawneng, towereng, targets, storage, spawn, terminal) {
        role = creep.memory.role;
        if (role == 'worker') {
            roleWorker.run(creep);
        } else if (role == 'builder') {
            roleBuilder.run(creep, bui, controllertime, storage);
        } else if (role == 'harvester') {
            roleHarvester.run(creep, resources, bigresources, spawneng, towereng, storage);
        } else if (role == 'carrier') {
            roleCarrier.run(creep, storage);
        } else if (role == 'outworker') {
            roleOutworker.run(creep);
        } else if (role == 'outbuilder') {
            roleOutbuilder.run(creep);
        } else if (role == 'outclaimer') {
            roleOutclaimer.run(creep);
        } else if (role == 'army') {
            roleArmy.run(creep, targets);
        } else if (role == 'universal') {
            roleUniversal.run(creep, storage, spawneng, towereng, spawn, bui);
        } else if (role == 'claimer') {
            roleClaimer.run(creep, storage, spawneng, towereng);
        } else if (role == 'soldier') {
            roleSoldier.run(creep);
        } else if (role == 'healer') {
            roleHealer.run(creep);
        } else if (role == 'miner') {
            roleMiner.run(creep, terminal);
        } else if (role == 'transfer') {
            roleTransfer.run(creep, storage, terminal);
        }
	}
};
module.exports = roleDoWork; 