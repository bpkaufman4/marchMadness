
const { User } = require('../../models');

const getUnusedUserPerma = function(seed) {
    var newSeed;

    User.findOne({
        where: {
            perma: seed
        }
    }).then(userData => {
        if(userData) {
            newSeed = getUnusedUserPerma(seed+'1');
        } else {
            newSeed = seed;
        }
        console.log(newSeed);
        return newSeed;
    });
}

module.exports = { getUnusedUserPerma };