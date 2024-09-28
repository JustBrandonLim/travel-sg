CREATE TABLE IF NOT EXISTS bus_stop (
  code VARCHAR(5) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  road VARCHAR(255) NOT NULL,
  latitude NUMERIC(17, 14) NOT NULL,
  longitude NUMERIC(17, 14) NOT NULL
);

CREATE TABLE IF NOT EXISTS bus_service (
  number VARCHAR(4) PRIMARY KEY,
  origin_code VARCHAR(5) REFERENCES bus_stop(code) ON DELETE CASCADE,
  destination_code VARCHAR(5) REFERENCES bus_stop(code) ON DELETE CASCADE,
  operator VARCHAR(4) NOT NULL,
  direction NUMERIC(1) NOT NULL,
  loop NUMERIC(1) NOT NULL
);

CREATE TABLE IF NOT EXISTS bus_route (
  code VARCHAR(5) REFERENCES bus_stop(code) ON DELETE CASCADE,
  number VARCHAR(4) REFERENCES bus_service(number) ON DELETE CASCADE,
  sequence NUMERIC(3) NOT NULL,
  PRIMARY KEY(code, number)
);

CREATE TABLE IF NOT EXISTS bus_arrival_feedback(
  id SERIAL,
  code VARCHAR(5) REFERENCES bus_stop(code) ON DELETE CASCADE,
  number VARCHAR(4) REFERENCES bus_service(number) ON DELETE CASCADE,
  date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  content VARCHAR(255),
  PRIMARY KEY(id, code, number)
);

CREATE TABLE IF NOT EXISTS bus_arrival_analysis(
  code VARCHAR(5) REFERENCES bus_stop(code) ON DELETE CASCADE,
  number VARCHAR(4) REFERENCES bus_service(number) ON DELETE CASCADE,
  positive_sentiment numeric,
  negative_sentiment numeric,
  sentiment VARCHAR(255),
  PRIMARY KEY(code, number)
);