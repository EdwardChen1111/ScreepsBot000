let BuyMarket = {
    deal: function () {
        const amountToSell = 2000;
        const maxTransferEnergyCost = 500;
        const targetprice = 500;
        const resourceType = 'RESOURCE_GHODIUM';

        const orders = Game.market.getAllOrders({type: ORDER_SELL, resourceType});

        for(let i=0; i<orders.length; i++) {

            const transferEnergyCost = Game.market.calcTransactionCost(amountToSell, 'E12S36', orders[i].roomName);
            const price = orders[i].price


            if(transferEnergyCost < maxTransferEnergyCost && targetprice < price) {
                Game.market.deal(orders[i].id, amountToSell, 'E12S36');
                break;
            }
        }


	}
};
module.exports = BuyMarket;