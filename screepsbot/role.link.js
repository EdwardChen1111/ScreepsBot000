let roleLink = {
    work: function (link, take_over_link) {
        if(link != '' && take_over_link != '' && link.store.getUsedCapacity() > 0){
            link.transferEnergy(take_over_link);
        }

	}
};
module.exports = roleLink;