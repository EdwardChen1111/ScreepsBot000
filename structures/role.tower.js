let roleTower = {
    work: function(tower) {
        let fight = tower.room.find(FIND_HOSTILE_CREEPS, {filter: (creep) => {return (creep.owner.username != 'EdwardChen1111')}});
        let fix = tower.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType != STRUCTURE_WALL) && (structure.structureType != STRUCTURE_RAMPART) && (structure.hits < 250000) && (structure.hits < structure.hitsMax)}});
        let doct = tower.room.find(FIND_MY_CREEPS, {filter: object => object.hits < object.hitsMax});
        if (fight.length > 0) {                                                                                                                                       
            fight.sort((a,b) => a.hits - b.hits);
            tower.attack(fight[0]);
        } 
        else if(doct.length > 0) {
            doct.sort((a,b) => a.hits - b.hits);
            tower.heal(doct[0]);
        } 
        else if(fix.length > 0) {
            fix.sort((a,b) => a.hits - b.hits);
            tower.repair(fix[0]);
        }
	}
};
module.exports = roleTower;