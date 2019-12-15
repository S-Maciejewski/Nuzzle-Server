module.exports = {
    authData: `select Login, Password, Token from F_Users 
    join D_Password DP on F_Users.ID = DP.UserID 
    join D_TokenMap DT on F_Users.ID = DT.UserID;`,

    tokenMap: 'select * from D_TokenMap;',

    getUser(userID) {
        return `select * from F_Users where ID = ${userID};`;
    },

    // Offer
    offers: 'select * from F_Offers;',

    offerList: `
    select FO.ID as OfferID, TypeID, Type, PostDate, FO.Label, Description, FO.OwnerID, LatitudePos, LongitudePos, DA.Address, Name, Surname, ImageURL
    from F_Offers FO
         left join D_Address DA on FO.AddressID = DA.ID
         join D_OfferType DOT on FO.TypeID = DOT.ID
        join F_Users FU on FO.OwnerID = FU.ID;
    `,

    getMyOffers: function (ownerID) {
        return `select * from F_Offers where OwnerID = ${ownerID};`;
    },

    getMyOfferList: function (ownerID) {
        return `
        select FO.ID as OfferID, TypeID, Type, PostDate, FO.Label, Description, FO.OwnerID, LatitudePos, LongitudePos, DA.Address, Name, Surname, ImageURL
        from F_Offers FO
             left join D_Address DA on FO.AddressID = DA.ID
             join D_OfferType DOT on FO.TypeID = DOT.ID
            join F_Users FU on FO.OwnerID = FU.ID where FO.OwnerID = ${ownerID};`;
    },

    getOffer: function (offerID) {
        return `select * from F_Offers where ID = ${offerID};`;
    },

    deleteOffer: function (offerID) {
        return `delete from F_Offers where ID = ${offerID};`;
    },

    postOffer: function (ownerID, params) {
        return `insert into F_Offers values (abs(random() % 10000), '${ownerID}', '${params.TypeID}', 
        '${new Date(Date.now()).toLocaleString('en-GB', { hour12: false })}', '${params.AddressID}', 
        '${params.Price}', '${params.Description}', '${params.ImageURL}', '${params.Label}');`;
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
