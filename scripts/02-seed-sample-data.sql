-- Sample data for BasedCars platform

-- Insert sample users
INSERT INTO users (wallet_address, email, username, full_name, bio, verified) VALUES
('0x1234567890123456789012345678901234567890', 'collector1@example.com', 'classiccarking', 'James Morrison', 'Passionate collector of vintage European sports cars with 20+ years experience.', true),
('0x2345678901234567890123456789012345678901', 'dealer2@example.com', 'luxuryautohaus', 'Sarah Chen', 'Luxury car dealer specializing in rare and exotic vehicles.', true),
('0x3456789012345678901234567890123456789012', 'enthusiast3@example.com', 'speedster_mike', 'Michael Rodriguez', 'Racing enthusiast and Porsche specialist.', false),
('0x4567890123456789012345678901234567890123', 'investor4@example.com', 'carbaron', 'Alexandra Thompson', 'Investment-grade automotive assets advisor.', true);

-- Insert sample cars
INSERT INTO cars (owner_id, make, model, year, vin, mileage, condition, exterior_color, interior_color, engine_type, transmission, fuel_type, title, description, rarity_level, estimated_value, reserve_price, starting_bid, status, verified) VALUES
((SELECT id FROM users WHERE username = 'classiccarking'), 'Ferrari', '275 GTB/4', 1967, '1F1234567890123456', 45000, 'Excellent', 'Rosso Corsa Red', 'Black Leather', 'V12 3.3L', '5-Speed Manual', 'Gasoline', '1967 Ferrari 275 GTB/4 - Matching Numbers', 'Stunning example of the legendary 275 GTB/4 with matching numbers engine and gearbox. Recent comprehensive restoration by Ferrari Classiche. Complete with original toolkit and documentation.', 'Ultra Rare', 4800000.00, 2400000.00, 1200000.00, 'approved', true),

((SELECT id FROM users WHERE username = 'luxuryautohaus'), 'Mercedes-Benz', '300SL Gullwing', 1955, '2M1234567890123456', 38000, 'Very Good', 'Silver Metallic', 'Red Leather', 'Inline-6 3.0L', '4-Speed Manual', 'Gasoline', '1955 Mercedes-Benz 300SL Gullwing - Original Paint', 'Exceptional 300SL Gullwing retaining its original silver metallic paint. Documented history with service records. One of the most iconic sports cars ever made.', 'Legendary', 3600000.00, 1800000.00, 900000.00, 'approved', true),

((SELECT id FROM users WHERE username = 'speedster_mike'), 'Porsche', '917K', 1970, '3P1234567890123456', 12000, 'Excellent', 'Gulf Blue', 'Racing Interior', 'Flat-12 4.5L', '5-Speed Manual', 'Gasoline', '1970 Porsche 917K - Le Mans Legend', 'Authentic 917K race car with documented Le Mans history. Recently restored to concours condition. Includes original racing documentation and period photographs.', 'One of One', 6400000.00, 3200000.00, 1600000.00, 'approved', true),

((SELECT id FROM users WHERE username = 'carbaron'), 'Aston Martin', 'DB5', 1963, '4A1234567890123456', 52000, 'Very Good', 'Silver Birch', 'Black Connolly', 'Inline-6 4.0L', '5-Speed Manual', 'Gasoline', '1963 Aston Martin DB5 - Bond Car Specification', 'Iconic DB5 in the classic Silver Birch over black leather combination. Matching numbers with comprehensive service history. The quintessential gentleman\'s grand tourer.', 'Ultra Rare', 2400000.00, 1200000.00, 600000.00, 'approved', true),

((SELECT id FROM users WHERE username = 'classiccarking'), 'Dodge', 'Charger R/T', 1969, '5D1234567890123456', 68000, 'Good', 'Black', 'Black Vinyl', 'V8 440 Magnum', '4-Speed Manual', 'Gasoline', '1969 Dodge Charger R/T - Numbers Matching 440', 'Authentic R/T with numbers matching 440 Magnum V8. Solid body with recent mechanical refresh. Classic American muscle at its finest.', 'Rare', 160000.00, 80000.00, 40000.00, 'approved', true),

((SELECT id FROM users WHERE username = 'speedster_mike'), 'Porsche', 'Carrera RS', 1973, '6P1234567890123456', 35000, 'Excellent', 'Grand Prix White', 'Black Leatherette', 'Flat-6 2.7L', '5-Speed Manual', 'Gasoline', '1973 Porsche Carrera RS 2.7 - Lightweight', 'Exceptional RS 2.7 in the desirable lightweight specification. Matching numbers with impeccable provenance. One of the greatest 911s ever built.', 'Legendary', 4200000.00, 2100000.00, 1050000.00, 'approved', true);

-- Insert sample auctions
INSERT INTO auctions (car_id, seller_id, title, description, starting_price, reserve_price, current_bid, currency, start_time, end_time, status, total_bids, view_count, featured) VALUES
((SELECT id FROM cars WHERE vin = '1F1234567890123456'), (SELECT id FROM users WHERE username = 'classiccarking'), '1967 Ferrari 275 GTB/4 - Matching Numbers', 'Rare opportunity to acquire this stunning Ferrari 275 GTB/4 with matching numbers and Ferrari Classiche certification.', 1200000.00, 2400000.00, 2400000.00, 'SOL', NOW() - INTERVAL '2 days', NOW() + INTERVAL '2 days', 'live', 47, 1247, true),

((SELECT id FROM cars WHERE vin = '2M1234567890123456'), (SELECT id FROM users WHERE username = 'luxuryautohaus'), '1955 Mercedes-Benz 300SL Gullwing', 'Iconic Gullwing in exceptional condition with original paint and comprehensive documentation.', 900000.00, 1800000.00, 1800000.00, 'SOL', NOW() - INTERVAL '1 day', NOW() + INTERVAL '1 day', 'live', 32, 892, true),

((SELECT id FROM cars WHERE vin = '3P1234567890123456'), (SELECT id FROM users WHERE username = 'speedster_mike'), '1970 Porsche 917K - Le Mans Legend', 'Authentic Le Mans race car with documented history and recent concours restoration.', 1600000.00, 3200000.00, 3200000.00, 'SOL', NOW() - INTERVAL '1 hour', NOW() + INTERVAL '4 days', 'live', 78, 2156, true),

((SELECT id FROM cars WHERE vin = '4A1234567890123456'), (SELECT id FROM users WHERE username = 'carbaron'), '1963 Aston Martin DB5', 'The quintessential Bond car in classic Silver Birch with matching numbers and service history.', 600000.00, 1200000.00, 1200000.00, 'SOL', NOW() - INTERVAL '30 minutes', NOW() + INTERVAL '1 hour', 'live', 23, 567, false),

((SELECT id FROM cars WHERE vin = '5D1234567890123456'), (SELECT id FROM users WHERE username = 'classiccarking'), '1969 Dodge Charger R/T', 'Numbers matching 440 Magnum R/T in solid condition with recent mechanical refresh.', 40000.00, 80000.00, 80000.00, 'SOL', NOW() - INTERVAL '45 minutes', NOW() + INTERVAL '2 hours', 'live', 18, 423, false),

((SELECT id FROM cars WHERE vin = '6P1234567890123456'), (SELECT id FROM users WHERE username = 'speedster_mike'), '1973 Porsche Carrera RS 2.7', 'Exceptional lightweight RS 2.7 with matching numbers and impeccable provenance.', 1050000.00, 2100000.00, 2100000.00, 'SOL', NOW() - INTERVAL '20 minutes', NOW() + INTERVAL '30 minutes', 'live', 31, 789, false);

-- Insert sample bids
INSERT INTO bids (auction_id, bidder_id, amount, currency, status) VALUES
-- Ferrari 275 GTB/4 bids
((SELECT id FROM auctions WHERE title LIKE '%Ferrari 275 GTB/4%'), (SELECT id FROM users WHERE username = 'luxuryautohaus'), 1200000.00, 'SOL', 'confirmed'),
((SELECT id FROM auctions WHERE title LIKE '%Ferrari 275 GTB/4%'), (SELECT id FROM users WHERE username = 'carbaron'), 1500000.00, 'SOL', 'confirmed'),
((SELECT id FROM auctions WHERE title LIKE '%Ferrari 275 GTB/4%'), (SELECT id FROM users WHERE username = 'speedster_mike'), 1800000.00, 'SOL', 'confirmed'),
((SELECT id FROM auctions WHERE title LIKE '%Ferrari 275 GTB/4%'), (SELECT id FROM users WHERE username = 'luxuryautohaus'), 2100000.00, 'SOL', 'confirmed'),
((SELECT id FROM auctions WHERE title LIKE '%Ferrari 275 GTB/4%'), (SELECT id FROM users WHERE username = 'carbaron'), 2400000.00, 'SOL', 'confirmed'),

-- Mercedes 300SL bids
((SELECT id FROM auctions WHERE title LIKE '%Mercedes-Benz 300SL%'), (SELECT id FROM users WHERE username = 'classiccarking'), 900000.00, 'SOL', 'confirmed'),
((SELECT id FROM auctions WHERE title LIKE '%Mercedes-Benz 300SL%'), (SELECT id FROM users WHERE username = 'speedster_mike'), 1200000.00, 'SOL', 'confirmed'),
((SELECT id FROM auctions WHERE title LIKE '%Mercedes-Benz 300SL%'), (SELECT id FROM users WHERE username = 'carbaron'), 1500000.00, 'SOL', 'confirmed'),
((SELECT id FROM auctions WHERE title LIKE '%Mercedes-Benz 300SL%'), (SELECT id FROM users WHERE username = 'classiccarking'), 1800000.00, 'SOL', 'confirmed'),

-- Porsche 917K bids
((SELECT id FROM auctions WHERE title LIKE '%Porsche 917K%'), (SELECT id FROM users WHERE username = 'carbaron'), 1600000.00, 'SOL', 'confirmed'),
((SELECT id FROM auctions WHERE title LIKE '%Porsche 917K%'), (SELECT id FROM users WHERE username = 'luxuryautohaus'), 2000000.00, 'SOL', 'confirmed'),
((SELECT id FROM auctions WHERE title LIKE '%Porsche 917K%'), (SELECT id FROM users WHERE username = 'classiccarking'), 2400000.00, 'SOL', 'confirmed'),
((SELECT id FROM auctions WHERE title LIKE '%Porsche 917K%'), (SELECT id FROM users WHERE username = 'carbaron'), 2800000.00, 'SOL', 'confirmed'),
((SELECT id FROM auctions WHERE title LIKE '%Porsche 917K%'), (SELECT id FROM users WHERE username = 'luxuryautohaus'), 3200000.00, 'SOL', 'confirmed');

-- Insert sample watchlist entries
INSERT INTO watchlist (user_id, car_id) VALUES
((SELECT id FROM users WHERE username = 'luxuryautohaus'), (SELECT id FROM cars WHERE vin = '1F1234567890123456')),
((SELECT id FROM users WHERE username = 'carbaron'), (SELECT id FROM cars WHERE vin = '2M1234567890123456')),
((SELECT id FROM users WHERE username = 'classiccarking'), (SELECT id FROM cars WHERE vin = '3P1234567890123456')),
((SELECT id FROM users WHERE username = 'speedster_mike'), (SELECT id FROM cars WHERE vin = '4A1234567890123456'));
