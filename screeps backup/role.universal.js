let roleRenew = require('role.renew');

let roleUniversal = {
    run: function (creep, storage, spawneng, towereng, spawn, bui) {
        if (creep.memory.hroom == creep.room.name){
            if (spawneng == '') {
                creep.memory.eng = false;
            }
            if (creep.store.getFreeCapacity() == creep.store.getCapacity()) {
                creep.memory.building = false;
            }
            if (creep.ticksToLive < 500 && creep.memory.eng == false && spawn != '') {
                creep.memory.renew = true;
            }
            if (!creep.memory.building && (!creep.memory.renew || creep.memory.eng)) {
                let sources = Game.getObjectById(creep.memory.sourceID);
                if (creep.harvest(sources) == ERR_NOT_IN_RANGE || creep.harvest(sources) == ERR_NOT_ENOUGH_ENERGY) {
                    creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                if (creep.store.getFreeCapacity() == 0) {
                    creep.memory.building = true;
                }
            } else if (creep.memory.renew && !creep.memory.eng) {
                if (creep.ticksToLive > 1200) {
                    creep.memory.renew = false;
                } else {
                    let clost = creep.pos.findClosestByRange(spawn);
                    if (roleRenew.renew(creep, clost) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(clost);
                        creep.memory.eng = false;
                    } else if (roleRenew.renew(creep, clost) == ERR_NOT_ENOUGH_ENERGY) {
                        creep.memory.renew = false;
                        creep.memory.eng = true;
                    }
                }
            } else {
                if (spawneng != '') {
                    let clost = creep.pos.findClosestByRange(spawneng);
                    if (creep.transfer(clost, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(clost, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else if (bui != '' && creep.room.controller.ticksToDowngrade > 5000) {
                    if (creep.build(bui[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(bui[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else if (creep.room.controller.level < 4) {
                    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else if (towereng != '') {
                    if (creep.transfer(towereng[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(towereng[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else if (storage != '') {
                    if (creep.transfer(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        } else {
            const exitDir = creep.room.findExitTo(creep.memory.hroom);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit);
        }
    }
};
module.exports = roleUniversal;