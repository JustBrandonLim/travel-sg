CREATE TABLE IF NOT EXISTS bus_stop (
  code VARCHAR(5) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  road VARCHAR(255) NOT NULL,
  latitude NUMERIC(17, 14) NOT NULL,
  longitude NUMERIC(17, 14) NOT NULL
);

CREATE TABLE IF NOT EXISTS bus_service (
  number VARCHAR(4) PRIMARY KEY,
  origin_code VARCHAR(5) REFERENCES bus_stop(code),
  destination_code VARCHAR(5) REFERENCES bus_stop(code),
  operator VARCHAR(4) NOT NULL,
  direction NUMERIC(1) NOT NULL
);

CREATE TABLE IF NOT EXISTS bus_route (
  code VARCHAR(5) REFERENCES bus_stop(code),
  number VARCHAR(4) REFERENCES bus_service(number),
  sequence NUMERIC(3) NOT NULL,
  PRIMARY KEY(code, number)
);