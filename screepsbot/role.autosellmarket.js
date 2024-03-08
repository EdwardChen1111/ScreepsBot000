let roleTradingtxt = require('role.tradingtxt');

let AutoSellMarket = {
    deal: function (room,terminal,mineral,name) {
        let all_orders = '', distance = '', trade_amount = '', history = '', need_price = '', answer = '';
        
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
            all_orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: formula[MineralType]});
            if (terminal.cooldown == 0 && terminal.store.getUsedCapacity(MineralType) > 10000 && all_orders != ''){
                all_orders.sort((b,a) => a.price - b.price);
                
                distance = Game.map.getRoomLinearDistance(room.name, all_orders[0].roomName, true);
                trade_amount = (terminal.store.getUsedCapacity(RESOURCE_ENERGY))/(1-Math.exp(-(distance)/30));

                history = (Game.market.getHistory(MineralType))[0];
                need_price = history.avgPrice + (history.stddevPrice)*0.5;

                if (all_orders[0].price > need_price){
                    if (all_orders[0].amount < trade_amount){
                        trade_amount = all_orders[0].amount;
                    } 
                    
                    let so = Game.market.deal(all_orders[0].id, trade_amount, room.name);
                    if (so == 0 ){
                        answer = `successfully and earn ${(all_orders[0].price)*(trade_amount)}`;
                    }else if (so == -6) {
                        answer = 'Error not enough resources'
                    }else if (so == -8) {
                        answer = 'Error more than 10 terminals trading in this tick'
                    }else if (so == -10) {
                        answer = 'Error arguments have problems'
                    }else{
                        answer = 'unexpect error'
                    }
                }else{
                    answer = 'Bad price';
                }
                
                console.log(`💸 ${room.name} using [${formula[MineralType]}] is now trading with ${all_orders[0].roomName} ${answer}`);
                roleTradingtxt.answer(name,all_orders[0].roomName,answer)
            }
        }
	}
};
module.exports = AutoSellMarket;