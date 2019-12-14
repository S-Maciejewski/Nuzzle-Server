module.exports = {
    authData: 'select Login, Password, Token from F_Users join D_Password DP on F_Users.ID = DP.UserID join D_TokenMap DT on F_Users.ID = DT.UserID',
} 