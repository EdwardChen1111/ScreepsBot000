let roleSpawningtxt = {
    show: function (name,creepname,nextcreep) {
        Game.spawns[name].room.visual.text(
            `🛠️ It's spawning ${creepname} and next is ${nextcreep}`,
            Game.spawns[name].pos.x + 1, 
            Game.spawns[name].pos.y, 
            {align: 'left', opacity: 0.8});
	}
};
module.exports = roleSpawningtxt; 