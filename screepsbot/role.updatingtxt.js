let roleUpDatingtxt = {
    update: function (name) {
        Game.spawns[name].room.visual.text(
            `⭐ ${Game.spawns[name].room} Updating`,
            Game.spawns[name].pos.x + 1, 
            Game.spawns[name].pos.y - 2,
            {align: 'left', opacity: 0.8});
	}
};
module.exports = roleUpDatingtxt;