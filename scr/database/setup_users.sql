CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users (username, email, password, role) VALUES
('admin1', 'admin1@example.com', '$2b$10$GjY2qVhVZxD2Z4KQ1Z7tgejrcD7k9zZqGWSsF4f2fR8QkHn5x1tgu', 'admin'), -- Senha: admin123
('admin2', 'admin2@example.com', '$2b$10$L3k2OWK3hY7Kt1lA6/5zGeY3lGHT2U5kXG8Wf1r2t9hJ8mV4xTqTC', 'admin'), -- Senha: admin456
('user1', 'user1@example.com', '$2b$10$8g6mLZ3sXzWc9Z1oJ4fGKeT2lGFXp9qKX7tF3xA1v5uJ2nM8xV3TG', 'user'),  -- Senha: user123
('user2', 'user2@example.com', '$2b$10$9j7mLZ3sXvWc9Z1oM5hGKeT2lGFXp9uKX7tF3xB1v5uJ2nM8xV4TG', 'user');  -- Senha: user456
SELECT * FROM users;