-- Update all currency references from SOL to SOL
UPDATE auctions SET currency = 'SOL' WHERE currency = 'SOL';
UPDATE bids SET currency = 'SOL' WHERE currency = 'SOL';
UPDATE transactions SET currency = 'SOL' WHERE currency = 'SOL';

-- Update default currency in schema
ALTER TABLE auctions ALTER COLUMN currency SET DEFAULT 'SOL';
ALTER TABLE bids ALTER COLUMN currency SET DEFAULT 'SOL';
ALTER TABLE transactions ALTER COLUMN currency SET DEFAULT 'SOL';
