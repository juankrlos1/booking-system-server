--Table roles
INSERT INTO roles (name, description, created_at, created_by)
VALUES ('ADMIN', 'Administrator role with full access to the system', now(), USER);

INSERT INTO roles (name, description, created_at, created_by)
VALUES ('USER', 'User role with restricted access to the system', now(), USER);

-- Insert IT department
INSERT INTO departments (name, description, created_by, created_at)
VALUES ('IT', 'Departamento encargado de la gestión de tecnologías de información', 'admin', NOW());

-- Insert IT areas
INSERT INTO areas (name, description, department_id, created_by, created_at)
VALUES ('Desarrollo de software', 'Encargados de desarrollar y mantener el software de la empresa', 1, 'admin', NOW()),
       ('Soporte técnico', 'Encargados de solucionar problemas técnicos y mantener la infraestructura tecnológica', 1, 'admin', NOW()),
       ('Seguridad informática', 'Encargados de garantizar la seguridad de la información y sistemas de la empresa', 1, 'admin', NOW());

-- Insert Recursos Humanos department
INSERT INTO departments (name, description, created_by, created_at)
VALUES ('Recursos Humanos', 'Departamento encargado de la gestión de recursos humanos', 'admin', NOW());

-- Insert Recursos Humanos areas
INSERT INTO areas (name, description, department_id, created_by, created_at)
VALUES ('Selección de personal', 'Encargados de la selección y contratación de personal', 2, 'admin', NOW()),
       ('Gestión de talento', 'Encargados de la gestión y desarrollo del talento en la empresa', 2, 'admin', NOW()),
       ('Relaciones laborales', 'Encargados de gestionar las relaciones laborales en la empresa', 2, 'admin', NOW());

-- Insert Marketing department
INSERT INTO departments (name, description, created_by, created_at)
VALUES ('Marketing', 'Departamento encargado de la gestión de marketing y ventas', 'admin', NOW());

-- Insert Marketing areas
INSERT INTO areas (name, description, department_id, created_by, created_at)
VALUES ('Investigación de mercado', 'Encargados de analizar y estudiar el mercado y los consumidores', 3, 'admin', NOW()),
       ('Publicidad', 'Encargados de la creación y gestión de campañas publicitarias', 3, 'admin', NOW()),
       ('Ventas', 'Encargados de la venta de productos o servicios de la empresa', 3, 'admin', NOW());

-- Insert Ventas department
INSERT INTO departments (name, description, created_by, created_at)
VALUES ('Ventas', 'Departamento encargado de la gestión de ventas', 'admin', NOW());

-- Insert Ventas areas
INSERT INTO areas (name, description, department_id, created_by, created_at)
VALUES ('Ventas en línea', 'Encargados de la venta de productos o servicios en línea', 4, 'admin', NOW()),
       ('Ventas directas', 'Encargados de la venta directa de productos o servicios', 4, 'admin', NOW()),
       ('Gestión de cuentas', 'Encargados de gestionar cuentas y relaciones con clientes', 4, 'admin', NOW());


-- Insert users
INSERT INTO users (username, password, email, first_name, last_name, role_id, area_id, created_at, created_by)
VALUES ('jdoe', '$2b$10$WxM.TlUENMLuAcowgooX2e6vhfKywV2ERaK962z.uHXVAYYGsCrCK', 'jdoe@example.com', 'John', 'Doe', 1, 1, NOW(), 'admin'),
       ('msmith', 'password', 'msmith@example.com', 'Mary', 'Smith', 1, 1, NOW(), 'admin'),
       ('jrodriguez', 'password', 'jrodriguez@example.com', 'Jose', 'Rodriguez', 1, 2, NOW(), 'admin'),
       ('mkim', 'password', 'mkim@example.com', 'Min', 'Kim', 1, 2, NOW(), 'admin'),
       ('ajones', '$2b$10$WxM.TlUENMLuAcowgooX2e6vhfKywV2ERaK962z.uHXVAYYGsCrCK', 'ajones@example.com', 'Amy', 'Jones', 2, 3, NOW(), 'admin'),
       ('rwilson', 'password', 'rwilson@example.com', 'Robert', 'Wilson', 2, 3, NOW(), 'admin'),
       ('ssmith', 'password', 'ssmith@example.com', 'Samantha', 'Smith', 1, 4, NOW(), 'admin'),
       ('bhernandez', 'password', 'bhernandez@example.com', 'Brian', 'Hernandez', 1, 4, NOW(), 'admin'),
       ('clee', 'password', 'clee@example.com', 'Carol', 'Lee', 2, 5, NOW(), 'admin'),
       ('dnguyen', 'password', 'dnguyen@example.com', 'David', 'Nguyen', 2, 5, NOW(), 'admin');

-- Insert buildings
INSERT INTO buildings (name, created_by, created_at)
VALUES ('Pirámide', 'admin', NOW()),
       ('Venezuela', 'admin', NOW());

-- Insert levels for building Pirámide
INSERT INTO levels (name, building_id, created_by, created_at)
VALUES ('Nivel 1', 1, 'admin', NOW()),
       ('Nivel 2', 1, 'admin', NOW()),
       ('Nivel 3', 1, 'admin', NOW()),
       ('Nivel 4', 1, 'admin', NOW()),
       ('Nivel 5', 1, 'admin', NOW());

-- Insert levels for building Venezuela
INSERT INTO levels (name, building_id, created_by, created_at)
VALUES ('Nivel 1', 2, 'admin', NOW()),
       ('Nivel 2', 2, 'admin', NOW());

-- Insert rooms for building Pirámide, Nivel 1
INSERT INTO rooms (name, level_id, capacity, photo_url, created_by, created_at)
VALUES ('Suchitoto 1', 1, 12, 'https://example.com/suchitoto.jpg', 'admin', NOW()),
       ('Tazumal 1', 1, 8, 'https://example.com/tazumal.jpg', 'admin', NOW()),
       ('Joya de Cerén 1', 1, 6, 'https://example.com/joya-de-ceren.jpg', 'admin', NOW());

-- Insert rooms for building Pirámide, Nivel 2
INSERT INTO rooms (name, level_id, capacity, photo_url, created_by, created_at)
VALUES ('Volcán de Izalco 2', 2, 10, 'https://example.com/volcan-de-izalco.jpg', 'admin', NOW()),
       ('Lago de Coatepeque 2', 2, 8, 'https://example.com/lago-de-coatepeque.jpg', 'admin', NOW()),
       ('Playa El Tunco 2', 2, 12, 'https://example.com/playa-el-tunco.jpg', 'admin', NOW());

-- Insert rooms for building Pirámide, Nivel 3
INSERT INTO rooms (name, level_id, capacity, photo_url, created_by, created_at)
VALUES ('Tazumal 3', 3, 8, 'https://example.com/tazumal.jpg', 'admin', NOW()),
       ('Joya de Cerén 3', 3, 6, 'https://example.com/joya-de-ceren.jpg', 'admin', NOW()),
       ('Suchitoto 3', 3, 12, 'https://example.com/suchitoto.jpg', 'admin', NOW());

-- Insert rooms for building Pirámide, Nivel 4
INSERT INTO rooms (name, level_id, capacity, photo_url, created_by, created_at)
VALUES ('Lago de Coatepeque 4', 4, 8, 'https://example.com/lago-de-coatepeque.jpg', 'admin', NOW()),
       ('Playa El Tunco 4', 4, 12, 'https://example.com/playa-el-tunco.jpg', 'admin', NOW()),
       ('Volcán de Izalco 4', 4, 10, 'https://example.com/volcan-de-izalco.jpg', 'admin', NOW());

-- Insert rooms for building Pirámide, Nivel 5
INSERT INTO rooms (name, level_id, capacity, photo_url, created_by, created_at)
VALUES ('Cerro Verde 5', 5, 6, 'https://example.com/cerro-verde.jpg', 'admin', NOW()),
('El Boquerón 5', 5, 10, 'https://example.com/el-boqueron.jpg', 'admin', NOW()),
('Catedral de Santa Ana 5', 5, 8, 'https://example.com/catedral-de-santa-ana.jpg', 'admin', NOW());

-- Insert rooms for building Venezuela, Nivel 1
INSERT INTO rooms (name, level_id, capacity, photo_url, created_by, created_at)
VALUES ('Montecristo 1', 6, 10, 'https://example.com/montecristo.jpg', 'admin', NOW()),
('Jiquilisco 1', 6, 6, 'https://example.com/jiquilisco.jpg', 'admin', NOW());

-- Insert rooms for building Venezuela, Nivel 2
INSERT INTO rooms (name, level_id, capacity, photo_url, created_by, created_at)
VALUES ('Perquín 2', 7, 8, 'https://example.com/perquin.jpg', 'admin', NOW()),
('Tamanique 2', 7, 12, 'https://example.com/tamanique.jpg', 'admin', NOW());


-- Insert reservations 1
INSERT INTO reservations (user_id, room_id, start_time, end_time, reservation_date, reason, attendees, recurring, status, created_by, created_at)
VALUES (1, 1, '2023-03-25 10:00:00', '2023-03-25 12:00:00', '2023-03-25', 'Reunión de equipo', 6, FALSE, 'APPROVED', 'admin', NOW());

-- Insert reservation_users 1
INSERT INTO reservation_users (reservation_id, user_id, created_by, created_at)
VALUES (1, 1, 'admin', NOW()),
       (1, 2, 'admin', NOW());

-- Insert reservations 2
INSERT INTO reservations (user_id, room_id, start_time, end_time, reservation_date, reason, attendees, recurring, status, created_by, created_at)
VALUES (2, 6, '2023-03-26 15:00:00', '2023-03-26 16:00:00', '2023-03-26', 'Entrevista de trabajo', 2, FALSE, 'APPROVED', 'admin', NOW());

-- Insert reservation_users 2
INSERT INTO reservation_users (reservation_id, user_id, created_by, created_at)
VALUES (2, 2, 'admin', NOW()),
       (2, 3, 'admin', NOW());

-- Insert reservations 3
INSERT INTO reservations (user_id, room_id, start_time, end_time, reservation_date, reason, attendees, recurring, status, created_by, created_at)
VALUES (3, 3, '2023-03-27 11:00:00', '2023-03-27 12:00:00', '2023-03-27', 'Presentación de proyecto', 10, FALSE, 'PENDING', 'admin', NOW());

-- Insert reservation_users 3
INSERT INTO reservation_users (reservation_id, user_id, created_by, created_at)
VALUES (3, 3, 'admin', NOW()),
       (3, 4, 'admin', NOW()),
       (3, 5, 'admin', NOW());

-- Insert reservations 4
INSERT INTO reservations (user_id, room_id, start_time, end_time, reservation_date, reason, attendees, recurring, status, created_by, created_at)
VALUES (4, 2, '2023-03-28 14:00:00', '2023-03-28 16:00:00', '2023-03-28', 'Capacitación de ventas', 15, FALSE, 'REJECTED', 'admin', NOW());

-- Insert reservation_users 4
INSERT INTO reservation_users (reservation_id, user_id, created_by, created_at)
VALUES (4, 4, 'admin', NOW()),
       (4, 5, 'admin', NOW()),
       (4, 6, 'admin', NOW()),
       (4, 7, 'admin', NOW());

-- Insert reservations 5
INSERT INTO reservations (user_id, room_id, start_time, end_time, reservation_date, reason, attendees, recurring, status, created_by, created_at)
VALUES (5, 7, '2023-03-29 09:00:00', '2023-03-29 10:30:00', '2023-03-29', 'Presentación de ventas', 5, FALSE, 'PENDING', 'admin', NOW());

-- Insert reservation_users 5
INSERT INTO reservation_users (reservation_id, user_id, created_by, created_at)
VALUES (5, 5, 'admin', NOW()),
(5, 6, 'admin', NOW()),
(5, 8, 'admin', NOW());