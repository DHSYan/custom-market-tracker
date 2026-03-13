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

/* inserts */

insert into Assets (TickerSymbol, Name, LastPrice, CurrentPrice, Exchange, LastUpdate, IsActive, Currency, CreatedDate)
values ('AAPL', 'Apple Inc.', 180.50, 182.10, 'NASDAQ', '2026-03-10 10:00', 1, 'USD', DATE '2020-01-15');

insert into Assets (TickerSymbol, Name, LastPrice, CurrentPrice, Exchange, LastUpdate, IsActive, Currency, CreatedDate)
values ('MSFT', 'Microsoft Corp.', 410.20, 412.35, 'NASDAQ', '2026-03-10 10:00', 1, 'USD', DATE '2019-06-20');

insert into Assets (TickerSymbol, Name, LastPrice, CurrentPrice, Exchange, LastUpdate, IsActive, Currency, CreatedDate)
values ('TSLA', 'Tesla Inc.', 195.10, 190.75, 'NASDAQ', '2026-03-10 10:00', 1, 'USD', DATE '2021-03-08');

insert into Assets (TickerSymbol, Name, LastPrice, CurrentPrice, Exchange, LastUpdate, IsActive, Currency, CreatedDate)
values ('SHOP', 'Shopify Inc.', 78.40, 79.10, 'NYSE', '2026-03-10 10:00', 1, 'CAD', DATE '2020-09-01');

insert into Assets (TickerSymbol, Name, LastPrice, CurrentPrice, Exchange, LastUpdate, IsActive, Currency, CreatedDate)
values ('NVDA', 'NVIDIA Corp.', 870.00, 865.50, 'NASDAQ', '2026-03-10 10:00', 1, 'USD', DATE '2018-11-12');


insert into Stocks (TickerSymbol, Industry, Sector, SharesOutstanding, EarningsPerShare)
values ('AAPL', 'Electronics', 'Technology', 1000000000, 6.25);

insert into Stocks (TickerSymbol, Industry, Sector, SharesOutstanding, EarningsPerShare)
values ('MSFT', 'Software', 'Technology', 2000000000, 11.50);

insert into Stocks (TickerSymbol, Industry, Sector, SharesOutstanding, EarningsPerShare)
values ('TSLA', 'Automotive', 'Consumer', 3000000000, 3.10);

insert into Stocks (TickerSymbol, Industry, Sector, SharesOutstanding, EarningsPerShare)
values ('SHOP', 'E-Commerce', 'Technology', 4000000000, 0.90);

insert into Stocks (TickerSymbol, Industry, Sector, SharesOutstanding, EarningsPerShare)
values ('NVDA', 'Semiconductor', 'Technology', 5000000000, 14.75);


insert into Portfolio (CreatedDate, Name, Currency)
values (DATE '2026-01-01', 'Growth', 'USD');

insert into Portfolio (CreatedDate, Name, Currency)
values (DATE '2026-01-15', 'Value Picks', 'USD');

insert into Portfolio (CreatedDate, Name, Currency)
values (DATE '2026-02-01', 'Canadian', 'CAD');

insert into Portfolio (CreatedDate, Name, Currency)
values (DATE '2026-02-15', 'Volatile', 'USD');

insert into Portfolio (CreatedDate, Name, Currency)
values (DATE '2026-03-01', 'Dividends', 'USD');


insert into People (Email, Networth, Name, Cash)
values ('a@demo.com', 250000.00, 'Alice Test', 15000.00);

insert into People (Email, Networth, Name, Cash)
values ('b@demo.com', 120000.00, 'Bob Tester', 8000.00);

insert into People (Email, Networth, Name, Cash)
values ('c@demo.com', 500000.00, 'C Testerer', 25000.00);

insert into People (Email, Networth, Name, Cash)
values ('d@demo.com', 66666.00, 'D Testererer', 6000.00);

insert into People (Email, Networth, Name, Cash)
values ('e@demo.com', 300000.00, 'E Testerererer', 12000.00);


insert into Traders (Email, Performance, AverageTradeTime)
values ('a@demo.com', 8, 12);

insert into Traders (Email, Performance, AverageTradeTime)
values ('b@demo.com', 5, 25);

insert into Traders (Email, Performance, AverageTradeTime)
values ('c@demo.com', 9, 8);

insert into Traders (Email, Performance, AverageTradeTime)
values ('d@demo.com', 4, 30);

insert into Traders (Email, Performance, AverageTradeTime)
values ('e@demo.com', 7, 15);


insert into CEOs (Email, InCompanyTime, PublicConsensus, PreviousRoles)
values ('a@demo.com', 6, 72, 'CFO');

insert into CEOs (Email, InCompanyTime, PublicConsensus, PreviousRoles)
values ('b@demo.com', 3, 55, 'Founder');

insert into CEOs (Email, InCompanyTime, PublicConsensus, PreviousRoles)
values ('c@demo.com', 9, 81, 'CEO');

insert into CEOs (Email, InCompanyTime, PublicConsensus, PreviousRoles)
values ('d@demo.com', 2, 40, 'Finance Director');

insert into CEOs (Email, InCompanyTime, PublicConsensus, PreviousRoles)
values ('e@demo.com', 5, 68, 'Product Manager');


insert into Reporter (Email, PublicConsensus)
values ('a@demo.com', 70);

insert into Reporter (Email, PublicConsensus)
values ('b@demo.com', 52);

insert into Reporter (Email, PublicConsensus)
values ('c@demo.com', 85);

insert into Reporter (Email, PublicConsensus)
values ('d@demo.com', 45);

insert into Reporter (Email, PublicConsensus)
values ('e@demo.com', 66);


insert into Companies (CompanyID, FoundedDate, IsPublic, EmployeeCount)
values (101, DATE '1976-04-01', 1, 160000);

insert into Companies (CompanyID, FoundedDate, IsPublic, EmployeeCount)
values (102, DATE '1975-04-04', 1, 220000);

insert into Companies (CompanyID, FoundedDate, IsPublic, EmployeeCount)
values (103, DATE '2003-07-01', 1, 140000);

insert into Companies (CompanyID, FoundedDate, IsPublic, EmployeeCount)
values (104, DATE '2006-09-01', 1, 12000);

insert into Companies (CompanyID, FoundedDate, IsPublic, EmployeeCount)
values (105, DATE '1993-04-05', 1, 30000);


insert into TimeFrame (TimeFrameID, Volume, Time_to_time, AverageChange)
values (1, 5000000, '1D', 2);

insert into TimeFrame (TimeFrameID, Volume, Time_to_time, AverageChange)
values (2, 8000000, '1W', -1);

insert into TimeFrame (TimeFrameID, Volume, Time_to_time, AverageChange)
values (3, 12000000, '1M', 5);

insert into TimeFrame (TimeFrameID, Volume, Time_to_time, AverageChange)
values (4, 3000000, '3M', 7);

insert into TimeFrame (TimeFrameID, Volume, Time_to_time, AverageChange)
values (5, 15000000, '1Y', 12);


insert into Days (TimeFrameID, DayOfMonth, DayOfWeek, IsHoliday, Has_Months)
values (1, 10, 'Mon', 0, 3);

insert into Days (TimeFrameID, DayOfMonth, DayOfWeek, IsHoliday, Has_Months)
values (2, 11, 'Tue', 0, 3);

insert into Days (TimeFrameID, DayOfMonth, DayOfWeek, IsHoliday, Has_Months)
values (3, 12, 'Wed', 0, 3);

insert into Days (TimeFrameID, DayOfMonth, DayOfWeek, IsHoliday, Has_Months)
values (4, 13, 'Thu', 0, 3);

insert into Days (TimeFrameID, DayOfMonth, DayOfWeek, IsHoliday, Has_Months)
values (5, 14, 'Fri', 0, 3);


insert into Months (TimeFrameID, MonthOfYear, Has_Years)
values (1, 3, 2026);

insert into Months (TimeFrameID, MonthOfYear, Has_Years)
values (2, 3, 2026);

insert into Months (TimeFrameID, MonthOfYear, Has_Years)
values (3, 2, 2026);

insert into Months (TimeFrameID, MonthOfYear, Has_Years)
values (4, 1, 2026);

insert into Months (TimeFrameID, MonthOfYear, Has_Years)
values (5, 12, 2025);


insert into Years (TimeFrameID, YearNumber)
values (1, 2026);

insert into Years (TimeFrameID, YearNumber)
values (2, 2026);

insert into Years (TimeFrameID, YearNumber)
values (3, 2026);

insert into Years (TimeFrameID, YearNumber)
values (4, 2026);

insert into Years (TimeFrameID, YearNumber)
values (5, 2025);


insert into NewsEvents (EventID, Headline, SentimentScore, TimeFrameID, Happened)
values (201, 'Earnings Beat', 85, 1, 1);

insert into NewsEvents (EventID, Headline, SentimentScore, TimeFrameID, Happened)
values (202, 'Product Recall Rumor', 30, 2, 1);

insert into NewsEvents (EventID, Headline, SentimentScore, TimeFrameID, Happened)
values (203, 'Regulatory Approval', 78, 3, 1);

insert into NewsEvents (EventID, Headline, SentimentScore, TimeFrameID, Happened)
values (204, 'CEO Interview', 60, 4, 1);

insert into NewsEvents (EventID, Headline, SentimentScore, TimeFrameID, Happened)
values (205, 'Market Selloff', 20, 5, 1);


insert into People_Has_Portfolio (CreatedDate, Email)
values (DATE '2026-01-01', 'a@demo.com');

insert into People_Has_Portfolio (CreatedDate, Email)
values (DATE '2026-01-15', 'b@demo.com');

insert into People_Has_Portfolio (CreatedDate, Email)
values (DATE '2026-02-01', 'c@demo.com');

insert into People_Has_Portfolio (CreatedDate, Email)
values (DATE '2026-02-15', 'd@demo.com');

insert into People_Has_Portfolio (CreatedDate, Email)
values (DATE '2026-03-01', 'e@demo.com');


insert into Contains (Email, CreatedDate, TickerSymbol, Quantity, PurchasePrice)
values ('a@demo.com', DATE '2026-01-01', 'AAPL', 20, 175);

insert into Contains (Email, CreatedDate, TickerSymbol, Quantity, PurchasePrice)
values ('b@demo.com', DATE '2026-01-15', 'MSFT', 10, 395);

insert into Contains (Email, CreatedDate, TickerSymbol, Quantity, PurchasePrice)
values ('c@demo.com', DATE '2026-02-01', 'TSLA', 15, 205);

insert into Contains (Email, CreatedDate, TickerSymbol, Quantity, PurchasePrice)
values ('d@demo.com', DATE '2026-02-15', 'SHOP', 30, 75);

insert into Contains (Email, CreatedDate, TickerSymbol, Quantity, PurchasePrice)
values ('e@demo.com', DATE '2026-03-01', 'NVDA', 5, 820);


insert into Buys (Email, TickerSymbol, Quantity)
values ('a@demo.com', 'AAPL', 5);

insert into Buys (Email, TickerSymbol, Quantity)
values ('b@demo.com', 'MSFT', 2);

insert into Buys (Email, TickerSymbol, Quantity)
values ('c@demo.com', 'TSLA', 3);

insert into Buys (Email, TickerSymbol, Quantity)
values ('d@demo.com', 'SHOP', 10);

insert into Buys (Email, TickerSymbol, Quantity)
values ('e@demo.com', 'NVDA', 1);


insert into Sells (Email, TickerSymbol, Quantity)
values ('a@demo.com', 'AAPL', 1);

insert into Sells (Email, TickerSymbol, Quantity)
values ('b@demo.com', 'MSFT', 1);

insert into Sells (Email, TickerSymbol, Quantity)
values ('c@demo.com', 'TSLA', 1);

insert into Sells (Email, TickerSymbol, Quantity)
values ('d@demo.com', 'SHOP', 2);

insert into Sells (Email, TickerSymbol, Quantity)
values ('e@demo.com', 'NVDA', 1);


insert into Trades (TickerSymbol, CompanyID, PublicDate, PercentageOfCompany)
values ('AAPL', 101, DATE '2026-01-20', 10);

insert into Trades (TickerSymbol, CompanyID, PublicDate, PercentageOfCompany)
values ('MSFT', 102, DATE '2026-01-22', 12);

insert into Trades (TickerSymbol, CompanyID, PublicDate, PercentageOfCompany)
values ('TSLA', 103, DATE '2026-02-05', 15);

insert into Trades (TickerSymbol, CompanyID, PublicDate, PercentageOfCompany)
values ('SHOP', 104, DATE '2026-02-18', 8);

insert into Trades (TickerSymbol, CompanyID, PublicDate, PercentageOfCompany)
values ('NVDA', 105, DATE '2026-03-05', 20);


insert into Operates (Email, CompanyID, IsFounder, InOfficeTime)
values ('a@demo.com', 101, 0, 6);

insert into Operates (Email, CompanyID, IsFounder, InOfficeTime)
values ('b@demo.com', 102, 0, 3);

insert into Operates (Email, CompanyID, IsFounder, InOfficeTime)
values ('c@demo.com', 103, 1, 9);

insert into Operates (Email, CompanyID, IsFounder, InOfficeTime)
values ('d@demo.com', 104, 0, 2);

insert into Operates (Email, CompanyID, IsFounder, InOfficeTime)
values ('e@demo.com', 105, 0, 5);


insert into Owns (Email, CompanyID, Percentage)
values ('a@demo.com', 101, 1.50);

insert into Owns (Email, CompanyID, Percentage)
values ('b@demo.com', 102, 0.75);

insert into Owns (Email, CompanyID, Percentage)
values ('c@demo.com', 103, 2.25);

insert into Owns (Email, CompanyID, Percentage)
values ('d@demo.com', 104, 0.50);

insert into Owns (Email, CompanyID, Percentage)
values ('e@demo.com', 105, 1.10);


insert into Impacts (TickerSymbol, EventID, PreEventPrice, PostEventPrice)
values ('AAPL', 201, 180, 185);

insert into Impacts (TickerSymbol, EventID, PreEventPrice, PostEventPrice)
values ('MSFT', 202, 410, 405);

insert into Impacts (TickerSymbol, EventID, PreEventPrice, PostEventPrice)
values ('TSLA', 203, 195, 205);

insert into Impacts (TickerSymbol, EventID, PreEventPrice, PostEventPrice)
values ('SHOP', 204, 78, 80);

insert into Impacts (TickerSymbol, EventID, PreEventPrice, PostEventPrice)
values ('NVDA', 205, 870, 845);


insert into OnRelation (TickerSymbol, EventID)
values ('AAPL', 201);

insert into OnRelation (TickerSymbol, EventID)
values ('MSFT', 202);

insert into OnRelation (TickerSymbol, EventID)
values ('TSLA', 203);

insert into OnRelation (TickerSymbol, EventID)
values ('SHOP', 204);

insert into OnRelation (TickerSymbol, EventID)
values ('NVDA', 205);


insert into Reports (Email, EventID)
values ('a@demo.com', 201);

insert into Reports (Email, EventID)
values ('b@demo.com', 202);

insert into Reports (Email, EventID)
values ('c@demo.com', 203);

insert into Reports (Email, EventID)
values ('d@demo.com', 204);

insert into Reports (Email, EventID)
values ('e@demo.com', 205);

commit;