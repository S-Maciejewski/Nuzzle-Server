-- we don't know how to generate root <with-no-name> (class Root) :(
create table F_Users
(
	ID int not null
		constraint F_Users_pk
			primary key,
	Login text not null,
	Name text not null,
	Surname text not null,
	Address text,
	PhoneNumber text,
	JoinDate text,
	PhotoURL text
);

create table D_Password
(
	UserID int not null
		constraint D_Password_pk
			primary key
		references F_Users,
	Password text not null
);

create unique index D_Password_UserID_uindex
	on D_Password (UserID);

create table D_TokenMap
(
	UserID integer
		references F_Users,
	Token text,
	constraint D_TokenMap_pk
		primary key (UserID, Token)
);

create table F_Offers
(
	ID int not null
		constraint F_Offers_pk
			primary key,
	OwnerID int not null
		references F_Users,
	TypeID int not null,
	PostDate text not null,
	LatitudePos real,
	LongitudePos real,
	AddressID int,
	Price real,
	Description text,
	ImageURL text
);

create table D_OfferType
(
	ID int not null
		constraint D_OfferType_pk
			primary key
		constraint D_OfferType_F_Offers_TypeID_fk
			references F_Offers (TypeID),
	Type text not null
);

create unique index D_OfferType_ID_uindex
	on D_OfferType (ID);

create unique index D_OfferType_Type_uindex
	on D_OfferType (Type);

create unique index F_Offers_ID_uindex
	on F_Offers (ID);

create unique index F_Users_ID_uindex
	on F_Users (ID);

create unique index F_Users_Login_uindex
	on F_Users (Login);

