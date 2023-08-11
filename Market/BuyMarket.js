let BuyMarket = {
    deal: function () {
        const amountToBuy = 2000;
        const maxTransferEnergyCost = 500;
        const targetprice = 500;
        const resourceType = 'RESOURCE_GHODIUM';
        
        const SellOut = Game.market.getAllOrders({type: ORDER_SELL, resourceType})[0];
        const orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType});
        

        for(let i=0; i<orders.length; i++) {

            const transferEnergyCost = Game.market.calcTransactionCost(amountToBuy, 'E12S36', orders[i].roomName);
            const price = orders[i].price


            if(transferEnergyCost < maxTransferEnergyCost && price < targetprice) {
                Game.market.deal(orders[i].id, amountToBuy, 'E12S36');
                break;
            }
        }


	}
};
module.exports = BuyMarket;