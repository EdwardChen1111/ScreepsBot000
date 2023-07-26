let roleTower = {
    work: function (tower) {
        let fight = tower.room.find(FIND_HOSTILE_CREEPS, {filter: (creep) => {return (creep.owner.username != 'Chenwu')}});
        let fix = tower.room.find(FIND_STRUCTURES, {filter: object => object.hits < 30000 && object.hits < object.hitsMax});
        let doct = tower.room.find(FIND_MY_CREEPS, {filter: object => object.hits < object.hitsMax});
        
        if (fight != '') {
            fight.sort((a,b) => a.hits - b.hits);
            tower.attack(fight[0]);
        } else if(doct != '') {
            doct.sort((a,b) => a.hits - b.hits);
            tower.heal(doct[0]);
        } else if(fix != '') {
            fix.sort((a,b) => a.hits - b.hits);
            tower.repair(fix[0]);
        }
	}
};
module.exports = roleTower;