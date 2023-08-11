var roleBuilder = {
    run: function(Creep,NeedBuild,Controller,EnergyFrom) {
        
        let target = '';
                
        if (Creep.store.getFreeCapacity() == Creep.store.getCapacity() && EnergyFrom != '' && Creep.withdraw(EnergyFrom, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            target = EnergyFrom;
        } 
        else if (Controller.ticksToDowngrade > 5000 && NeedBuild != null && Creep.build(NeedBuild) == ERR_NOT_IN_RANGE) {
            target = NeedBuild;
        } 
        else if ((Controller.ticksToDowngrade < 5000 || NeedBuild == null) && Creep.upgradeController(Controller) == ERR_NOT_IN_RANGE) {
            target = Controller;
        }
                
        if (target != '') {
            Creep.moveTo(target, {reusePath: 20, visualizePathStyle: {stroke: '#ffffff'}});
        }
	}
};
module.exports = roleBuilder;
