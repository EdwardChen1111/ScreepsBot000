let roleArmy = {
    run: function (creep, targets) {
        if (targets != '') {
            creep.moveTo(targets[targets.length-1], {reusePath: 0});
            if (creep.pos.getRangeTo(targets[targets.length-1]) <= 3) {
                creep.rangedAttack(targets[targets.length-1]);
                creep.rangedMassAttack();
                creep.attack(targets[targets.length-1]);
            }
        } else {
            let way = new RoomPosition(24, 24, creep.memory.hroom);
            creep.moveTo(way);
        }
	}
};
module.exports = roleArmy;