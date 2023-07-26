let roleSpawningtxt = {
    show: function (name) {
        if (Game.spawns[name].spawning) { 
            Game.spawns[name].room.visual.text(
                '🛠️' + Game.spawns[name].spawning.name,
                Game.spawns[name].pos.x + 1, 
                Game.spawns[name].pos.y, 
                {align: 'left', opacity: 0.8});
        }
	}
};
module.exports = roleSpawningtxt; 