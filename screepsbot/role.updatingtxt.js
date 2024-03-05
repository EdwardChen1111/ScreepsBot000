let roleUpDatingtxt = {
    update: function (name, tradetime) {
        Game.spawns[name].room.visual.text(
            `⭐ ${Game.spawns[name].room} Updating and trade after ${tradetime*10} ticks`,
            Game.spawns[name].pos.x + 1, 
            Game.spawns[name].pos.y - 2,
            {align: 'left', opacity: 0.8});
	}
};
module.exports = roleUpDatingtxt;