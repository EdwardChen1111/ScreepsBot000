let roleTradingtxt = {
    answer: function (name,room,answer) {
        Game.spawns[name].room.visual.text(
            `💸 ${Game.spawns[name].room.roomName} Trading with ${room} and ${answer}`,
            Game.spawns[name].pos.x + 1, 
            Game.spawns[name].pos.y - 2,
            {align: 'right', opacity: 0.8});
	}
};
module.exports = roleTradingtxt;