var roleLink = {
    work: function(link) {

        let linkFrom = '';
        let linkTo = '';

        if(link.room.name == 'E12S36'){
            linkFrom = Game.rooms['E12S36'].lookForAt('structure', link.pos.x, link.pos.y)[0];
            linkTo = Game.rooms['E12S36'].lookForAt('structure', 22, 14)[0];
        }
        if(link.room.name == 'E11S35'){
            linkFrom = Game.rooms['E11S35'].lookForAt('structure', link.pos.x, link.pos.y)[0];
            linkTo = Game.rooms['E11S35'].lookForAt('structure', 22, 14)[0];
            
        }
        linkFrom.transferEnergy(linkTo);
    }
};
module.exports = roleLink;