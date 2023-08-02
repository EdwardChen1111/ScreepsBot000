var roleLink = {
    work: function(link) {
        name = link.room.name;
        let linkFrom = '';
        let linkTo = '';
        if(name == 'E12S36'){
            linkFrom = Game.rooms['E12S36'].lookForAt('structure', link.pos.x, link.pos.y)[0];
            linkTo = Game.rooms['E12S36'].lookForAt('structure', 22, 14)[0];
        }
        else if(name == 'E11S35'){
            linkFrom = Game.rooms['E11S35'].lookForAt('structure', link.pos.x, link.pos.y)[0];
            linkTo = Game.rooms['E11S35'].lookForAt('structure', 25, 36)[0];
        }
        if(linkFrom != '' && linkTo != ''){
            linkFrom.transferEnergy(linkTo);
        }
    }
};
module.exports = roleLink;