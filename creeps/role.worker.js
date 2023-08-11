var roleWorker = {
    run: function(Creep,Sources,SourcesNum,Link) {

        if(Creep.memory.link == true){
            if (Creep.store.getUsedCapacity() > Creep.store.getCapacity()-12){
                if(Creep.transfer(Link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    Creep.moveTo(Link);
                }
            }
            else{
                if(Creep.harvest(Sources[SourcesNum]) == ERR_NOT_IN_RANGE) {
                    Creep.moveTo(Sources[SourcesNum]);
                }
            }
        }
        else{
            if (Creep.store.getUsedCapacity() != Creep.store.getCapacity()){
                if(Creep.harvest(Sources[SourcesNum]) == ERR_NOT_IN_RANGE) {
                    Creep.moveTo(Sources[SourcesNum]);
                }
            }
        }
    }
};
module.exports = roleWorker;
