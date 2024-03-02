let AutoSellMarket = {
    deal: function (room,terminal,mineral) {
        let all_orders = '', trade_amount = '', history = '', need_price = '';
        
        if (terminal != '' ){
            if (terminal.cooldown == 0){
                let MineralType = mineral.mineralType;
                all_orders = Game.market.getAllOrders({type: ORDER_BUY, sourceType: MineralType});
                all_orders.sort((b,a) => a.price - b.price);

                trade_amount = (terminal.store.getUsedCapacity(RESOURCE_ENERGY))/(1-Math.exp(-(Game.map.getRoomLinearDistance(room, all_orders[0].roomName, true))/30));

                history = (Game.market.getHistory(MineralType))[0];
                need_price = history.avgPrice + history.stddevPrice;

                if (all_orders[0].price > need_price){
                    if (terminal.store.getUsedCapacity(MineralType) > trade_amount){
                        Game.market.deal(all_orders[0].id, trade_amount, room);
                    } else {
                        Game.market.deal(all_orders[0].id, terminal.store.getUsedCapacity(MineralType), room);
                    }
                    console.log(`💸 ${room} using "${MineralType}" is now trading with ${all_orders[0].roomName} and earn ${(all_orders[0].price)*(trade_amount)} Cr`);
                }
            }
        }
	}
};
module.exports = AutoSellMarket;