let roleTransfer = {
    run: function (creep, storage, terminal) {
        let barformula = {
            L: RESOURCE_LEMERGIUM_BAR,
            H: RESOURCE_REDUCTANT,
            U: RESOURCE_UTRIUM_BAR,
            O: RESOURCE_OXIDANT,
            K: RESOURCE_KEANIUM_BAR,
            Z: RESOURCE_ZYNTHIUM_BAR,
            X: RESOURCE_PURIFIER,
            G: RESOURCE_GHODIUM_MELT,
        };
        let freeC = creep.store.getFreeCapacity();
        let sourcetype = Game.getObjectById(creep.memory.sourceID[0]).mineralType;
        let factory = Game.getObjectById(creep.memory.sourceID[1]);
        let bar = barformula[sourcetype];
        if (creep.memory.moving == '') {
            creep.memory.moving = false;
            creep.memory.doing = '';
            creep.memory.target = '';
            creep.memory.nt = '';
        }

        if (!creep.memory.moving) {
            if (freeC == creep.store.getCapacity()) {
                creep.memory.doing = 'w';

                if (terminal != '' && terminal.store[sourcetype] > 500) {
                    creep.memory.target = terminal.id;
                    creep.memory.nt = sourcetype;
                    creep.memory.moving = true;
                } else if (storage != '' && (factory.store[RESOURCE_ENERGY] < 3000 || terminal.store[RESOURCE_ENERGY] < 10000)) {
                    creep.memory.target = storage[0].id;
                    creep.memory.nt = RESOURCE_ENERGY;
                    creep.memory.moving = true;
                } else if (factory != '' && factory.store[bar] > 0) {
                    creep.memory.target = factory.id;
                    creep.memory.nt = RESOURCE_ENERGY;
                    creep.memory.moving = true;
                }
            } else {
                creep.memory.doing = 't';

                if (creep.store[sourcetype] > 0) {
                    creep.memory.target = factory.id;
                    creep.memory.nt = sourcetype;
                    creep.memory.moving = true;
                } else if (creep.store[RESOURCE_ENERGY] > 0) {
                    creep.memory.nt = RESOURCE_ENERGY;
                    if (factory.store[RESOURCE_ENERGY] < 3000) {
                        creep.memory.target = factory.id;
                        creep.memory.moving = true;
                    } else if (terminal.store[RESOURCE_ENERGY] < 10000) {
                        creep.memory.target = terminal.id;
                        creep.memory.moving = true;
                    }
                } else if (creep.store[bar] > 0) {
                    creep.memory.target = terminal.id;
                    creep.memory.nt = bar;
                    creep.memory.moving = true;
                }
            }
        }

        if (creep.memory.moving) {
            let doing = creep.memory.doing;
            let target = Game.getObjectById(creep.memory.target);
            let nt = creep.memory.nt;

            if (target != '' && ((doing == 'w' && creep.withdraw(target, nt) == ERR_NOT_IN_RANGE) || (doing == 't' && creep.transfer(target, nt) == ERR_NOT_IN_RANGE))) {
                creep.moveTo(target, {reusePath: 20, visualizePathStyle: {stroke: '#ffffff'}});
            } else {
                creep.memory.moving = false;
            }
        }

        if (factory.cooldown == 0 && factory.store[RESOURCE_ENERGY] >= 100 && factory.store[sourcetype] >= 500) {
            factory.produce(bar);
        }
	}
};
module.exports = roleTransfer;