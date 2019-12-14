module.exports = {
    authData: `select Login, Password, Token from F_Users 
    join D_Password DP on F_Users.ID = DP.UserID 
    join D_TokenMap DT on F_Users.ID = DT.UserID;`,

    tokenMap: 'select * from D_TokenMap;',


    // Offer
    offers: 'select * from F_Offers;',

    getMyOffers: function (ownerID) {
        return `select * from F_Offers where OwnerID = ${ownerID};`;
    },

    getOffer: function (offerID) {
        return `select * from F_Offers where ID = ${offerID};`;
    },

    deleteOffer: function (offerID) {
        return `delete from F_Offers where ID = ${offerID};`;
    },

    postOffer: function (ownerID, params) {
        return `insert into F_Offers values (abs(random() % 10000), '${ownerID}', '${params.typeID}', 
        '${new Date(Date.now()).toLocaleString('pl', { hour12: false })}', '${params.LatitudePos}', 
        '${params.LongitudePos}', '${params.AddressID}', '${params.Price}', '${params.Description}', 
        '${params.ImageURL}');`;
    },

    
    // OfferType
    offerTypes: `select * from D_OfferType`,


    // Address
    getAddress: function (addressID) {
        return `select * from D_Address where ID = ${addressID};`;
    },

    getMyAddresses: function (ownerID) {
        return `select * from D_Address where OwnerID = ${ownerID};`;
    },

    postAddress: function (ownerID, params) {
        return `insert into D_Address values (abs(random() % 10000), '${ownerID}', '${params.Address}', 
        '${params.Label}', '${params.LatitudePos}', '${params.LongitudePos}');`;
    },
} 
