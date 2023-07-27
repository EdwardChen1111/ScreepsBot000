var roleLink = {
    work: function(link) {
        const linkFrom = Game.rooms['E12S36'].lookForAt('structure', link.pos.x, link.pos.y)[0];
        const linkTo = Game.rooms['E12S36'].lookForAt('structure', 22, 14)[0];
        linkFrom.transferEnergy(linkTo);
    }
};
module.exports = roleLink;