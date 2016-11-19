
-- Note, you need to get the path right here. This should be scripted somehow.
\COPY plant(symbol,synonym,sci_name,common_name,family) FROM '/Users/hills120/dev/plantapp/data/plants.csv' DELIMITER ',' CSV HEADER

