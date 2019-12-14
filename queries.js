module.exports = {
    authData: 'select Login, Password, Token from F_Users join D_Password DP on F_Users.ID = DP.UserID join D_TokenMap DT on F_Users.ID = DT.UserID;',

    tokenMap: 'select * from D_TokenMap;',

    offers: 'select * from F_Offers;',

    getOffer: function (offerID) {
        return `select * from F_Offers where ID = ${offerID};`;
    },

    deleteOffer: function (offerID) {
        return `delete from F_Offers where ID = ${offerID};`;
    },

    postOffer: function (ownerID, params) {
        return `insert into F_Offers values (abs(random() % 10000), '${ownerID}', '${params.typeID}', '${new Date(Date.now()).toLocaleString('pl', { hour12: false })}',
        '${params.LatitudePos}', '${params.LongitudePos}', '${params.AddressID}', '${params.Price}', '${params.Description}', '${params.ImageURL}');`;
    },
} 