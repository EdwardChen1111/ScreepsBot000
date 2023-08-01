let roleFactory = {
    run: function (factory, barformula, sourcetype) {
        let barformula = {
            RESOURCE_LEMERGIUM: RESOURCE_LEMERGIUM_BAR,
            RESOURCE_HYDROGEN: RESOURCE_REDUCTANT,
            RESOURCE_UTRIUM: RESOURCE_UTRIUM_BAR,
            RESOURCE_OXYGEN: RESOURCE_OXIDANT,
            RESOURCE_KEANIUM: RESOURCE_KEANIUM_BAR,
            RESOURCE_ZYNTHIUM: RESOURCE_ZYNTHIUM_BAR,
            RESOURCE_CATALYST: RESOURCE_PURIFIER,
            RESOURCE_GHODIUM: RESOURCE_GHODIUM_MELT,
        };

        factory.produce(barformula[sourcetype]);
    }
};
module.exports = roleFactory;