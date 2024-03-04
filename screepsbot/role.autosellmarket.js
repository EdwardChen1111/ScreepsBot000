let AutoSellMarket = {
    deal: function (room,terminal,mineral) {
        let all_orders = '', distance = '', trade_amount = '', history = '', need_price = '';
        
        let formula = {
            L: RESOURCE_LEMERGIUM,
            H: RESOURCE_HYDROGEN,
            U: RESOURCE_UTRIUM,
            O: RESOURCE_OXYGEN,
            K: RESOURCE_KEANIUM,
            Z: RESOURCE_ZYNTHIUM,
            X: RESOURCE_CATALYST,
            G: RESOURCE_GHODIUM,
        };

        if (terminal != '' ){
            let MineralType = mineral[0].mineralType;
            if (terminal.cooldown == 0 && terminal.store.getUsedCapacity(MineralType) > 10000){
                all_orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: formula[MineralType]});
                all_orders.sort((b,a) => a.price - b.price);
                
                distance = Game.map.getRoomLinearDistance(room.name, all_orders[0].roomName, true);
                trade_amount = (terminal.store.getUsedCapacity(RESOURCE_ENERGY))/(1-Math.exp(-(distance)/30));

                history = (Game.market.getHistory(MineralType))[0];
                need_price = history.avgPrice + (history.stddevPrice)*0.5;

                if (all_orders[0].price > need_price){
                    if (terminal.store.getUsedCapacity(MineralType) > trade_amount){
                        Game.market.deal(all_orders[0].id, trade_amount, room);
                    } else {
                        Game.market.deal(all_orders[0].id, terminal.store.getUsedCapacity(MineralType), room);
                    }
                    console.log(`💸 ${room} using [ ${MineralType} ] is now trading with ${all_orders[0].roomName} and earn ${(all_orders[0].price)*(trade_amount)} Cr`);
                }
            }
        }
	}
};
module.exports = AutoSellMarket;