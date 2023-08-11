var roleOutworker = {
    run: function(Creep,Sources,SourcesNum) {
        const exitDir = Creep.room.findExitTo(Creep.memory.troom);
        const exit = Creep.pos.findClosestByRange(exitDir);
        Creep.moveTo(exit);
        if (Creep.room.name == Creep.memory.troom){
            if(Creep.harvest(Sources[SourcesNum]) == ERR_NOT_IN_RANGE) {
                Creep.moveTo(Sources[SourcesNum]);
            }
        }
    }
};
module.exports = roleOutworker;