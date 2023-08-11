var roleBuilder = {
    run: function(creep) {

        let needbuild = creep.pos.findClosestByRange(creep.room.find(FIND_CONSTRUCTION_SITES));
        let controller = creep.room.controller
        let EnergyFrom = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_LINK) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > creep.store.getFreeCapacity()}}));

        let target = '';
                
        if (creep.store.getFreeCapacity() == creep.store.getCapacity() && EnergyFrom != '' && creep.withdraw(EnergyFrom, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            target = EnergyFrom;
        } 
        else if (controller.ticksToDowngrade > 5000 && needbuild != null && creep.build(needbuild) == ERR_NOT_IN_RANGE) {
            target = needbuild;
        } 
        else if ((controller.ticksToDowngrade < 5000 || needbuild == null) && creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
            target = controller;
        }
                
        if (target != '') {
            creep.moveTo(target, {reusePath: 20, visualizePathStyle: {stroke: '#ffffff'}});
        }
	}
};
module.exports = roleBuilder;
