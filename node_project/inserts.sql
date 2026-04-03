-- Assets
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

-- Stocks
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

-- Portfolio
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

-- People
insert into People (Email, PhoneNumber, Networth, Name, Cash)
values ('a@demo.com', '777-777-7777', 250000.00, 'Alice Test', 15000.00);

insert into People (Email, PhoneNumber, Networth, Name, Cash)
values ('b@demo.com', '777-777-7778', 120000.00, 'Bob Tester', 8000.00);

insert into People (Email, PhoneNumber, Networth, Name, Cash)
values ('c@demo.com', '777-777-7779', 500000.00, 'C Testerer', 25000.00);

insert into People (Email, PhoneNumber, Networth, Name, Cash)
values ('d@demo.com', '777-777-7780', 66666.00, 'D Testererer', 6000.00);

insert into People (Email, PhoneNumber, Networth, Name, Cash)
values ('e@demo.com', '777-777-7781', 300000.00, 'E Testerererer', 12000.00);

-- People_Has_Portfolio (links People and Portfolio)
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

-- safe insert into Contains
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

-- Companies
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
insert into Companies (CompanyID, FoundedDate, IsPublic, EmployeeCount)
values (106, DATE '1993-05-05', 0, 30000);

-- Owns
insert into Owns (Email, CompanyID, Percentage)
values ('a@demo.com', 101, 20);
insert into Owns (Email, CompanyID, Percentage)
values ('b@demo.com', 102, 0.75);
insert into Owns (Email, CompanyID, Percentage)
values ('c@demo.com', 103, 2.25);
insert into Owns (Email, CompanyID, Percentage)
values ('d@demo.com', 104, 0.50);
insert into Owns (Email, CompanyID, Percentage)
values ('e@demo.com', 105, 1.10);
insert into Owns (Email, CompanyID, Percentage)
values ('a@demo.com', 102, 20);
insert into Owns (Email, CompanyID, Percentage)
values ('a@demo.com', 103, 20);
insert into Owns (Email, CompanyID, Percentage)
values ('a@demo.com', 104, 20);
insert into Owns (Email, CompanyID, Percentage)
values ('a@demo.com', 105, 20);