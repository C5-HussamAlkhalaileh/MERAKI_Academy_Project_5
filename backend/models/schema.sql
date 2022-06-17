-- DROP DATABASE RUNTIME_TERROR;
-- CREATE DATABASE RUNTIME_TERROR;
USE RUNTIME_TERROR;

-- CREATE TABLE roles (
--     id INT AUTO_INCREMENT NOT NULL,
--     role VARCHAR(255) NOT NULL,
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE users(
--     id INT AUTO_INCREMENT NOT NULL,
--     firstName VARCHAR(255),
--     lastName VARCHAR(255),
--     email VARCHAR(255) NOT NULL UNIQUE,
--     gender VARCHAR(255),
--     lastLogin DATE,
--     password VARCHAR(255),
--     role_id INT,
--     FOREIGN KEY (role_id) REFERENCES roles(id),
--     is_deleted TINYINT DEFAULT 0,
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE carts (
--     id INT AUTO_INCREMENT NOT NULL,
--     user_id INT,
--     FOREIGN KEY (user_id) REFERENCES users(id),
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE address (
--     id INT AUTO_INCREMENT NOT NULL,
--     street VARCHAR(255),
--     city VARCHAR(255),
--     notes VARCHAR(255),
--     buldingNumber VARCHAR(255),
--     user_id INT,
--     FOREIGN KEY (user_id) REFERENCES users(id),
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE restaurants (
--     id INT AUTO_INCREMENT NOT NULL,
--     location VARCHAR(255) NOT NULL,
--     backImg VARCHAR(255) NOT NULL,
--     Logo VARCHAR(255) NOT NULL,
--     orders INT DEFAULT 0,
--     lat VARCHAR(255) NOT NULL,
--     lng VARCHAR(255) NOT NULL,
--     name VARCHAR(255) NOT NULL,
--     rest_category VARCHAR(255) NOT NULL,
--     owner_id INT,
--     FOREIGN KEY (owner_id) REFERENCES users(id),
--     is_deleted TINYINT DEFAULT 0,
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE employees(
--     id INT AUTO_INCREMENT NOT NULL,
--     user_id INT NOT NULL,
--     restaurant_id INT NOT NULL,
--     salary VARCHAR(255) NOT NULL,
--     weeklyHours INT NOT NULL,
--     shift VARCHAR(255) NOT NULL,
--     FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
--     FOREIGN KEY (user_id) REFERENCES users(id),
--     is_deleted TINYINT DEFAULT 0,
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE meals(
--     id INT AUTO_INCREMENT NOT NULL,
--     name VARCHAR(255) NOT NULL UNIQUE,
--     imgUrl VARCHAR(255) NOT NULL,
--     category VARCHAR(255) NOT NULL,
--     price INT NOT NULL,
--     restaurant_id INT,
--     is_deleted TINYINT DEFAULT 0,
--     FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE sizes (
--     id INT AUTO_INCREMENT NOT NULL,
--     size VARCHAR(255) NOT NULL,
--     name VARCHAR(255),
--     price INT NOT NULL,
--     FOREIGN KEY (name) REFERENCES meals(name),
--     is_deleted TINYINT DEFAULT 0,
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE cartItems(
--     id INT AUTO_INCREMENT NOT NULL,
--     quantity VARCHAR(255) NOT NULL,
--     subTotal FLOAT NOT NULL,
--     cart_id INT,
--     meal_id INT,
--     FOREIGN KEY (meal_id) REFERENCES meals(id),
--     FOREIGN KEY (cart_id) REFERENCES carts(id),
--     is_deleted TINYINT DEFAULT 0,
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE orders (
--     id INT AUTO_INCREMENT NOT NULL,
--     -- quantity VARCHAR(255) NOT NULL,
--     state VARCHAR(255) NOT NULL,
--     receipt FLOAT NOT NULL,
--     address_id INT,
--     restaurant_id INT,
--     user_id INT,
--     FOREIGN KEY (address_id) REFERENCES address(id),
--     FOREIGN KEY (user_id) REFERENCES users(id),
--     FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
--     is_deleted TINYINT DEFAULT 0,
--     PRIMARY KEY (id)
-- );

-- -- meal_id INT,
-- -- FOREIGN KEY (meal_id) REFERENCES meals(id),
-- CREATE TABLE orders_meals (
--     id INT AUTO_INCREMENT NOT NULL,
--     quantity VARCHAR(255) NOT NULL,
--     order_id INT,
--     meal_id INT,
--     FOREIGN KEY (order_id) REFERENCES orders(id),
--     FOREIGN KEY (meal_id) REFERENCES meals(id),
--     PRIMARY KEY (id)
-- );

INSERT INTO restaurants  (location,backImg,Logo,lat, lng,name, rest_category,owner_id) VALUES ('Amman','https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=1000,height=300,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/fff33026-470a-444b-a248-9c0237da449f.jpg','https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=1000,height=300,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/fff33026-470a-444b-a248-9c0237da449f.jpg','dd','ddd','The Ice Cream Parlor','pizza',1)

-- INSERT INTO meals (name, imgUrl,category,price, restaurant_id) VALUES ("issdcddddsd_c","https://img.cdn4dd.com/p/fit=cover,width=150,height=150,format=jpeg,quality=50/media/photosV2/d18fd6d5-dda4-4113-8eec-a039bb114db7-retina-large.JPG","ice_creddddddama",10,1);