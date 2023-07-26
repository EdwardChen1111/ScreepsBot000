let roleRenew = {
    renew: function (creep, spawn) {
        if (spawn.renewCreep(creep) == ERR_NOT_IN_RANGE){
            return ERR_NOT_IN_RANGE;
        } else if (spawn.renewCreep(creep) == ERR_NOT_ENOUGH_ENERGY){
            return ERR_NOT_ENOUGH_ENERGY;
        } else {
            return OK;
        }
    }
};
module.exports = roleRenew;