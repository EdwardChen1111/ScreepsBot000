let roleRenew = require('role.renew');

let roleUniversal = {
    run: function (creep, storage, spawneng, towereng, spawn, bui) {
        let freeC = creep.store.getFreeCapacity();
        let Cap = creep.store.getCapacity();
        if (creep.memory.moving == '') {
            creep.memory.moving = false;
            creep.memory.renew = false;
            creep.memory.doing = '';
            creep.memory.target = '';
        }

        if (creep.memory.hroom == creep.room.name) {
            if (creep.ticksToLive < 500 && !creep.memory.renew) {
                creep.memory.renew = true;
            }
            if (freeC == Cap) {
                creep.memory.moving = true;
                creep.memory.doing = 'h';
                creep.memory.target = creep.memory.sourceID;
            } else if (creep.memory.renew && spawn[0].store.getCapacity(RESOURCE_ENERGY) > 0) {
                if (creep.ticksToLive > 1200) {
                    creep.memory.renew = false;
                } else {
                    let clost = creep.pos.findClosestByRange(spawn).id;
                    creep.memory.moving = true;
                    creep.memory.doing = 'r';
                    creep.memory.target = clost;
                }
            } else {
                if (spawneng != '') {
                    let clost = creep.pos.findClosestByRange(spawneng).id;
                    creep.memory.moving = true;
                    creep.memory.doing = 't';
                    creep.memory.target = clost;
                } else if (bui != '' && creep.room.controller.ticksToDowngrade > 5000) {
                    creep.memory.moving = true;
                    creep.memory.doing = 'b';
                    creep.memory.target = bui[0].id;
                } else if (towereng != '') {
                    creep.memory.moving = true;
                    creep.memory.doing = 't';
                    creep.memory.target = towereng[0].id;
                } else if (creep.room.controller.level < 4) {
                    creep.memory.moving = true;
                    creep.memory.doing = 'u';
                    creep.memory.target = creep.room.controller.id;
                } else if (storage != '') {
                    creep.memory.moving = true;
                    creep.memory.doing = 't';
                    creep.memory.target = storage[0].id;
                }
            }
        } else {
            const exitDir = creep.room.findExitTo(creep.memory.hroom);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit);
        }

        if (creep.memory.moving) {
            let doing = creep.memory.doing;
            let target = Game.getObjectById(creep.memory.target);

            if (doing == 'r') {
                renew = roleRenew.renew(creep, target);
                if (renew == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                } else if (renew == ERR_NOT_ENOUGH_ENERGY) {
                    if (freeC < Cap) {
                        let clost = creep.pos.findClosestByRange(spawneng).id;
                        creep.memory.doing = 't';
                        creep.memory.target = clost;
                    } else {
                        creep.memory.doing = 'h';
                        creep.memory.target = creep.memory.sourceID;
                    }
                }
            }

            if (doing == 'h') {
                if (freeC > 0 && creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {reusePath: 20, visualizePathStyle: {stroke: '#ffffff'}});
                } else if (freeC == 0) {
                    creep.memory.moving = false;
                }
            }

            doing = creep.memory.doing;
            target = Game.getObjectById(creep.memory.target);

            if (target != '' && ((doing == 'b' && creep.build(target) == ERR_NOT_IN_RANGE) || (doing == 't' && creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) || (doing == 'u' && creep.upgradeController(target) == ERR_NOT_IN_RANGE))) {
                creep.moveTo(target, {reusePath: 20, visualizePathStyle: {stroke: '#ffffff'}});
            } else if (target == '' || (doing != 'h' && doing != 'r')){
                creep.memory.moving = false;
            }
        }
    }
};
module.exports = roleUniversal;