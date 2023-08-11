var roleLink = {
    work: function(link) {
        name = link.room.name;
        let linkFrom = '';
        let linkTo = '';
        if(name == 'E12S36'){
            linkFrom = Game.rooms[name].lookForAt('structure', link.pos.x, link.pos.y)[0];
            linkTo = Game.rooms[name].lookForAt('structure', 22, 14)[0];
        }
        else if(name == 'E11S35'){
            linkFrom = Game.rooms[name].lookForAt('structure', link.pos.x, link.pos.y)[0];
            linkTo = Game.rooms[name].lookForAt('structure', 25, 36)[0];
        }
        else if(name == 'E11S22'){
            linkFrom = Game.rooms[name].lookForAt('structure', link.pos.x, link.pos.y)[0];
            linkTo = Game.rooms[name].lookForAt('structure', 27, 19)[0];
        }
        if(linkFrom != '' && linkTo != '' && (linkFrom.store.getUsedCapacity(RESOURCE_ENERGY) > 400)){
            linkFrom.transferEnergy(linkTo);
        }
    }
};
module.exports = roleLink;