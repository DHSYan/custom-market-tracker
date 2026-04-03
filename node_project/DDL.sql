/*  tables  */

CREATE TABLE Assets (
    TickerSymbol VARCHAR2(10) PRIMARY KEY,
    Name VARCHAR2(100),
    LastPrice NUMBER(10,2),
    CurrentPrice NUMBER(10,2),
    Exchange VARCHAR2(20),
    LastUpdate VARCHAR2(20),
    IsActive NUMBER(1) CHECK (IsActive IN (0,1)),
    Currency CHAR(3),
    CreatedDate DATE
);

CREATE TABLE Stocks (
    TickerSymbol VARCHAR2(10) PRIMARY KEY,
    Industry VARCHAR2(100),
    Sector VARCHAR2(100),
    SharesOutstanding NUMBER CHECK (SharesOutstanding > 0),
    EarningsPerShare NUMBER(10,2),
    FOREIGN KEY (TickerSymbol) REFERENCES Assets(TickerSymbol)
);

CREATE TABLE Portfolio (
    CreatedDate DATE PRIMARY KEY,
    Name VARCHAR2(100),
    Currency CHAR(3)
);

CREATE TABLE People (
    Email VARCHAR2(100) PRIMARY KEY,
    PhoneNumber VARCHAR2(15) UNIQUE, 
    Networth NUMBER(12,2),
    Name VARCHAR2(100),
    Cash NUMBER(12,2)
);

CREATE TABLE Traders (
    Email VARCHAR2(100) PRIMARY KEY,
    Performance NUMBER CHECK (Performance BETWEEN 1 AND 10),
    AverageTradeTime NUMBER,
    FOREIGN KEY (Email) REFERENCES People(Email)
);

CREATE TABLE CEOs (
    Email VARCHAR2(100) PRIMARY KEY,
    InCompanyTime NUMBER,
    PublicConsensus NUMBER CHECK (PublicConsensus BETWEEN 0 AND 100),
    PreviousRoles VARCHAR2(100),
    FOREIGN KEY (Email) REFERENCES People(Email)
);

CREATE TABLE Reporter (
    Email VARCHAR2(100) PRIMARY KEY,
    PublicConsensus NUMBER CHECK (PublicConsensus BETWEEN 0 AND 100),
    FOREIGN KEY (Email) REFERENCES People(Email)
);

CREATE TABLE Companies (
    CompanyID NUMBER PRIMARY KEY,
    FoundedDate DATE,
    IsPublic NUMBER(1) CHECK (IsPublic IN (0,1)),
    EmployeeCount NUMBER CHECK (EmployeeCount > 0)
);

CREATE TABLE TimeFrame (
    TimeFrameID NUMBER PRIMARY KEY,
    Volume NUMBER,
    Time_to_time VARCHAR2(50),
    AverageChange NUMBER
);

CREATE TABLE Days (
    TimeFrameID NUMBER PRIMARY KEY,
    DayOfMonth NUMBER CHECK (DayOfMonth BETWEEN 1 AND 31),
    DayOfWeek VARCHAR2(10),
    IsHoliday NUMBER(1) CHECK (IsHoliday IN (0,1)),
    Has_Months NUMBER CHECK (Has_Months BETWEEN 1 AND 12),
    FOREIGN KEY (TimeFrameID) REFERENCES TimeFrame(TimeFrameID)
);

CREATE TABLE Months (
    TimeFrameID NUMBER PRIMARY KEY,
    MonthOfYear NUMBER CHECK (MonthOfYear BETWEEN 1 AND 12),
    Has_Years NUMBER,
    FOREIGN KEY (TimeFrameID) REFERENCES TimeFrame(TimeFrameID)
);

CREATE TABLE Years (
    TimeFrameID NUMBER PRIMARY KEY,
    YearNumber NUMBER,
    FOREIGN KEY (TimeFrameID) REFERENCES TimeFrame(TimeFrameID)
);

CREATE TABLE NewsEvents (
    EventID NUMBER PRIMARY KEY,
    Headline VARCHAR2(100),
    SentimentScore NUMBER CHECK (SentimentScore BETWEEN 0 AND 100),
    TimeFrameID NUMBER,
    Happened NUMBER(1) CHECK (Happened IN (0,1)),
    FOREIGN KEY (TimeFrameID) REFERENCES TimeFrame(TimeFrameID)
);

CREATE TABLE Contains (
    Email VARCHAR2(100),
    CreatedDate DATE,
    TickerSymbol VARCHAR2(10),
    Quantity NUMBER,
    PurchasePrice NUMBER,
    PRIMARY KEY (Email, CreatedDate, TickerSymbol),
    FOREIGN KEY (Email) REFERENCES People(Email),
    FOREIGN KEY (CreatedDate) REFERENCES Portfolio(CreatedDate),
    FOREIGN KEY (TickerSymbol) REFERENCES Assets(TickerSymbol)
);

CREATE TABLE Buys (
    Email VARCHAR2(100),
    TickerSymbol VARCHAR2(10),
    Quantity NUMBER,
    PRIMARY KEY (Email, TickerSymbol),
    FOREIGN KEY (Email) REFERENCES People(Email)
        ON DELETE CASCADE,
    FOREIGN KEY (TickerSymbol) REFERENCES Assets(TickerSymbol)
        ON DELETE CASCADE
);

CREATE TABLE Sells (
    Email VARCHAR2(100),
    TickerSymbol VARCHAR2(10),
    Quantity NUMBER,
    PRIMARY KEY (Email, TickerSymbol),
    FOREIGN KEY (Email) REFERENCES People(Email)
        ON DELETE CASCADE,
    FOREIGN KEY (TickerSymbol) REFERENCES Assets(TickerSymbol)
        ON DELETE CASCADE
);

CREATE TABLE Trades (
    TickerSymbol VARCHAR2(10),
    CompanyID NUMBER,
    PublicDate DATE,
    PercentageOfCompany NUMBER CHECK (PercentageOfCompany BETWEEN 0 AND 100),
    PRIMARY KEY (TickerSymbol, CompanyID, PublicDate),
    FOREIGN KEY (TickerSymbol) REFERENCES Assets(TickerSymbol),
    FOREIGN KEY (CompanyID) REFERENCES Companies(CompanyID)
);

CREATE TABLE People_Has_Portfolio (
    CreatedDate DATE,
    Email VARCHAR2(100),
    PRIMARY KEY (CreatedDate, Email),
    FOREIGN KEY (CreatedDate) REFERENCES Portfolio(CreatedDate)
        ON DELETE CASCADE,
    FOREIGN KEY (Email) REFERENCES People(Email)
        ON DELETE CASCADE
);

CREATE TABLE Operates (
    Email VARCHAR2(100),
    CompanyID NUMBER,
    IsFounder NUMBER(1) CHECK (IsFounder IN (0,1)),
    InOfficeTime NUMBER,
    PRIMARY KEY (Email, CompanyID),
    FOREIGN KEY (Email) REFERENCES CEOs(Email)
        ON DELETE CASCADE,
    FOREIGN KEY (CompanyID) REFERENCES Companies(CompanyID)
        ON DELETE CASCADE
);

CREATE TABLE Owns (
    Email VARCHAR2(100),
    CompanyID NUMBER,
    Percentage NUMBER(5,2),
    PRIMARY KEY (Email, CompanyID),
    FOREIGN KEY (Email) REFERENCES People(Email),
    FOREIGN KEY (CompanyID) REFERENCES Companies(CompanyID)
);

CREATE TABLE Impacts (
    TickerSymbol VARCHAR2(10),
    EventID NUMBER,
    PreEventPrice NUMBER,
    PostEventPrice NUMBER,
    PRIMARY KEY (TickerSymbol, EventID),
    FOREIGN KEY (TickerSymbol) REFERENCES Assets(TickerSymbol),
    FOREIGN KEY (EventID) REFERENCES NewsEvents(EventID)
);

CREATE TABLE OnRelation (
    TickerSymbol VARCHAR2(10),
    EventID NUMBER,
    PRIMARY KEY (TickerSymbol, EventID),
    FOREIGN KEY (TickerSymbol) REFERENCES Assets(TickerSymbol),
    FOREIGN KEY (EventID) REFERENCES NewsEvents(EventID)
);

CREATE TABLE Reports (
    Email VARCHAR2(100),
    EventID NUMBER,
    PRIMARY KEY (Email, EventID),
    FOREIGN KEY (Email) REFERENCES Reporter(Email),
    FOREIGN KEY (EventID) REFERENCES NewsEvents(EventID)
);
