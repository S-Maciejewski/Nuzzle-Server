module.exports = {
    authData: 'select Login, Password, Token from F_Users join D_Password DP on F_Users.ID = DP.UserID join D_TokenMap DT on F_Users.ID = DT.UserID',

    tokenMap: 'select * from D_TokenMap',

    postOffer: function (ownerID, params) {
        return `insert into F_Offers values (random() % 10000, ${ownerID}, ${params.typeID}, ${new Date(Date.now()).toLocaleString('en-GB')},
        ${params.LatitudePos}, ${params.LongitudePos}, ${params.AddressID}, ${params.Price}, '${params.Description}', '${params.ImageURL}');`;
    },
} 