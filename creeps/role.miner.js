let roleMiner = {
    run: function (Creep,Mineral,Terminal,Storage) {
        
        if (Creep.store.getUsedCapacity() == Creep.store.getCapacity()) {
            for(const resourceType in Creep.store) {
                if (Creep.transfer(Terminal, resourceType) == ERR_NOT_IN_RANGE) {
                    Creep.moveTo(Terminal);
                }
            }
        } 
        else {
            if(Storage.store.getUsedCapacity() - Storage.store[RESOURCE_ENERGY] > 0 ){
                for(const resourceType in Storage.store) {
                    if(resourceType != RESOURCE_ENERGY){
                        if (Creep.withdraw(Storage, resourceType) == ERR_NOT_IN_RANGE) {
                            Creep.moveTo(Storage);
                        }
                    }
                }
            }
            else if(Creep.harvest(Mineral) == ERR_NOT_IN_RANGE){
                Creep.moveTo(Mineral);
            }
        }
    }
};
module.exports = roleMiner;