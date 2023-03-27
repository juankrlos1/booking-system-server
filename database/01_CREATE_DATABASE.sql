-- Create roles table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by VARCHAR(100),
    updated_at TIMESTAMP,
    updated_by VARCHAR(100)
);

-- Add comments for roles table fields
COMMENT ON COLUMN roles.id IS 'Unique identifier for the role';
COMMENT ON COLUMN roles.name IS 'Name of the role (e.g., ''Administrator'', ''User'')';
COMMENT ON COLUMN roles.created_at IS 'Timestamp of when the role was created';
COMMENT ON COLUMN roles.updated_at IS 'Timestamp of when the role was last updated';


CREATE INDEX idx_roles_name ON roles (name);

-- Create departments table
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by VARCHAR(100),
    updated_at TIMESTAMP,
    updated_by VARCHAR(100)
);

-- Add comments for departments table fields
COMMENT ON COLUMN departments.id IS 'Unique identifier for the department';
COMMENT ON COLUMN departments.name IS 'Name of the department';
COMMENT ON COLUMN departments.created_at IS 'Timestamp of when the department was created';
COMMENT ON COLUMN departments.updated_at IS 'Timestamp of when the department was last updated';

-- Create areas table
CREATE TABLE areas (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(500),
    department_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by VARCHAR(100),
    updated_at TIMESTAMP,
    updated_by VARCHAR(100),
    FOREIGN KEY (department_id) REFERENCES departments (id)
);

-- Add comments for areas table fields
COMMENT ON COLUMN areas.id IS 'Unique identifier for the area';
COMMENT ON COLUMN areas.name IS 'Name of the area';
COMMENT ON COLUMN areas.department_id IS 'Foreign key referencing the department the area belongs to';
COMMENT ON COLUMN areas.created_at IS 'Timestamp of when the area was created';
COMMENT ON COLUMN areas.updated_at IS 'Timestamp of when the area was last updated';

CREATE INDEX idx_areas_name ON areas (name);

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    role_id INTEGER NOT NULL,
    area_id INTEGER NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by VARCHAR(100),
    updated_at TIMESTAMP,
    updated_by VARCHAR(100),
    FOREIGN KEY (role_id) REFERENCES roles (id),
    FOREIGN KEY (area_id) REFERENCES areas (id)
);

-- Add comments for users table fields
COMMENT ON COLUMN users.id IS 'Unique identifier for the user';
COMMENT ON COLUMN users.username IS 'Username used for authentication';
COMMENT ON COLUMN users.password IS 'Password used for authentication (should be stored hashed)';
COMMENT ON COLUMN users.email IS 'Email address of the user';
COMMENT ON COLUMN users.first_name IS 'First name of the user';
COMMENT ON COLUMN users.last_name IS 'Last name of the user';
COMMENT ON COLUMN users.role_id IS 'Foreign key referencing the role assigned to the user';
COMMENT ON COLUMN users.area_id IS 'Foreign key referencing the area the user belongs to';
COMMENT ON COLUMN users.created_at IS 'Timestamp of when the user was created';
COMMENT ON COLUMN users.updated_at IS 'Timestamp of when the user was last updated';

CREATE INDEX idx_users_username ON users (username);
CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_users_role_id ON users (role_id);
CREATE INDEX idx_users_area_id ON users (area_id);

-- Create buildings table
CREATE TABLE buildings (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by VARCHAR(100),
    updated_at TIMESTAMP,
    updated_by VARCHAR(100)
);

-- Add comments for buildings table fields
COMMENT ON COLUMN buildings.id IS 'Unique identifier for the building';
COMMENT ON COLUMN buildings.name IS 'Name of the building';
COMMENT ON COLUMN buildings.created_at IS 'Timestamp of when the building was created';
COMMENT ON COLUMN buildings.updated_at IS 'Timestamp of when the building was last updated';


CREATE INDEX idx_buildings_name ON buildings (name);

-- Create levels table
CREATE TABLE levels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    building_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by VARCHAR(100),
    updated_at TIMESTAMP,
    updated_by VARCHAR(100),
    FOREIGN KEY (building_id) REFERENCES buildings (id)
);

-- Add comments for levels table fields
COMMENT ON COLUMN levels.id IS 'Unique identifier for the level';
COMMENT ON COLUMN levels.name IS 'Name of the level';
COMMENT ON COLUMN levels.building_id IS 'Foreign key referencing the building the level belongs to';
COMMENT ON COLUMN levels.created_at IS 'Timestamp of when the level was created';
COMMENT ON COLUMN levels.updated_at IS 'Timestamp of when the level was last updated';


CREATE INDEX idx_levels_name ON levels (name);
CREATE INDEX idx_levels_building_id ON levels (building_id);

-- Create rooms table
CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    level_id INTEGER NOT NULL,
    capacity INTEGER NOT NULL,
    photo_url VARCHAR(255),
    status VARCHAR(255) NOT NULL DEFAULT 'available',--Activo, Inactivo, Ocupado
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by VARCHAR(100),
    updated_at TIMESTAMP,
    updated_by VARCHAR(100),
    FOREIGN KEY (level_id) REFERENCES levels (id)
);

-- Add comments for rooms table fields
COMMENT ON COLUMN rooms.id IS 'Unique identifier for the room';
COMMENT ON COLUMN rooms.name IS 'Name of the room';
COMMENT ON COLUMN rooms.level_id IS 'Foreign key referencing the level the room belongs to';
COMMENT ON COLUMN rooms.capacity IS 'Maximum number of people the room can accommodate';
COMMENT ON COLUMN rooms.photo_url IS 'URL of the photo of the room';
COMMENT ON COLUMN rooms.status IS 'Current status of the room (e.g., ''available'', ''booked'')';
COMMENT ON COLUMN rooms.created_at IS 'Timestamp of when the room was created';
COMMENT ON COLUMN rooms.updated_at IS 'Timestamp of when the room was last updated';

CREATE INDEX idx_rooms_name ON rooms (name);
CREATE INDEX idx_rooms_level_id ON rooms (level_id);
CREATE INDEX idx_rooms_status ON rooms (status);

-- Create reservations table
CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    room_id INTEGER NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    reservation_date DATE NOT NULL,
    reason VARCHAR(255) NOT NULL,
    attendees INTEGER NOT NULL,
    recurring BOOLEAN DEFAULT FALSE,
    status VARCHAR(250),--PENDIENTE, APROVADO, RECHAZADO
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by VARCHAR(100),
    updated_at TIMESTAMP,
    updated_by VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (room_id) REFERENCES rooms (id)
);

-- Add comments for reservations table fields
COMMENT ON COLUMN reservations.id IS 'Unique identifier for the reservation';
COMMENT ON COLUMN reservations.user_id IS 'Foreign key referencing the user who made the reservation';
COMMENT ON COLUMN reservations.room_id IS 'Foreign key referencing the room being reserved';
COMMENT ON COLUMN reservations.start_time IS 'Start time of the reservation';
COMMENT ON COLUMN reservations.end_time IS 'End time of the reservation';
COMMENT ON COLUMN reservations.reservation_date IS 'Date of the reservation';
COMMENT ON COLUMN reservations.reason IS 'Reason for the reservation';
COMMENT ON COLUMN reservations.attendees IS 'Number of attendees expected for the reservation';
COMMENT ON COLUMN reservations.recurring IS 'Indicates if the reservation is recurring';
COMMENT ON COLUMN reservations.created_at IS 'Timestamp of when the reservation was created';
COMMENT ON COLUMN reservations.updated_at IS 'Timestamp of when the reservation was last updated';

CREATE INDEX idx_reservations_user_id ON reservations (user_id);
CREATE INDEX idx_reservations_room_id ON reservations (room_id);
CREATE INDEX idx_reservations_reservation_date ON reservations (reservation_date);
CREATE INDEX idx_reservations_start_time_end_time ON reservations (start_time, end_time);

--create reservation_users table
CREATE TABLE reservation_users (
  id SERIAL PRIMARY KEY,
  reservation_id INT NOT NULL,
  user_id INT NOT NULL,
  created_by VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_by VARCHAR(100),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (reservation_id) REFERENCES reservations(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

COMMENT ON TABLE reservation_users IS 'Table that relates users to reservations in the system';
COMMENT ON COLUMN reservation_users.id IS 'Unique identifier for the relationship between a user and a reservation';
COMMENT ON COLUMN reservation_users.reservation_id IS 'Foreign key referencing the ID of the associated reservation';
COMMENT ON COLUMN reservation_users.user_id IS 'Foreign key referencing the ID of the associated user';
COMMENT ON COLUMN reservation_users.created_at IS 'Date and time when the relationship between a user and a reservation was created';
COMMENT ON COLUMN reservation_users.updated_at IS 'Date and time of the last update to the relationship between a user and a reservation';
COMMENT ON COLUMN reservation_users.created_by IS 'User who entered the relationship between a user and a reservation was created';
COMMENT ON COLUMN reservation_users.updated_by IS 'User who the last update to the relationship between a user and a reservation';