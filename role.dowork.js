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

let roleDoWork = {
    tell: function (creep, resources, bigresources, controllertime, bui, spawneng, towereng, targets, storage, spawn) {
        if (creep.memory.role == 'worker') {
            roleWorker.run(creep);
        } else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep, bui, controllertime, storage);
        } else if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep, resources, bigresources, spawneng, towereng, storage);
        } else if (creep.memory.role == 'carrier') {
            roleCarrier.run(creep, storage);
        } else if (creep.memory.role == 'outworker') {
            roleOutworker.run(creep);
        } else if (creep.memory.role == 'outbuilder') {
            roleOutbuilder.run(creep);
        } else if (creep.memory.role == 'outclaimer') {
            roleOutclaimer.run(creep);
        } else if (creep.memory.role == 'army') {
            roleArmy.run(creep, targets);
        } else if (creep.memory.role == 'universal') {
            roleUniversal.run(creep, storage, spawneng, towereng, spawn, bui);
        } else if (creep.memory.role == 'claimer') {
            roleClaimer.run(creep, storage, spawneng, towereng);
        } else if (creep.memory.role == 'soldier') {
            roleSoldier.run(creep);
        } else if (creep.memory.role == 'healer') {
            roleHealer.run(creep);
        }
	}
};
module.exports = roleDoWork; 