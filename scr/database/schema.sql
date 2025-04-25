-- Tabela de Departamentos
CREATE TABLE Departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Funcionários
CREATE TABLE Employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hire_date DATE NOT NULL,
    department_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES Departments(id) ON DELETE SET NULL
);

-- Tabela de Cursos
CREATE TABLE Courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    duration_in_hours INT NOT NULL, -- Duração em horas
    validity_in_years INT NOT NULL, -- Validade em anos
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Treinamentos
CREATE TABLE Trainings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    course_id INT NOT NULL,
    completion_date DATE NOT NULL,
    expiration_date DATE NOT NULL, -- Agora a data de expiração será calculada e definida manualmente
    status ENUM('Completed', 'Pending') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES Employees(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES Courses(id) ON DELETE CASCADE
);

INSERT INTO Departments (name) VALUES 
('Recursos Humanos'),
('Tecnologia da Informação'),
('Financeiro'),
('Marketing');
INSERT INTO Employees (name, email, hire_date, department_id) VALUES
('João Silva', 'joao.silva@example.com', '2020-10-01', 1),
('Maria Oliveira', 'maria.oliveira@example.com', '2019-05-15', 2),
('Carlos Souza', 'carlos.souza@example.com', '2021-07-20', 3),
('Ana Costa', 'ana.costa@example.com', '2022-03-10', 4);
INSERT INTO Courses (name, duration_in_hours, validity_in_years) VALUES
('Curso de Liderança', 40, 2),
('Curso de Primeiros Socorros', 8, 1),
('Curso de Comunicação', 16, 3),
('Curso de Segurança da Informação', 24, 2);
DELIMITER $$

CREATE TRIGGER before_insert_trainings
BEFORE INSERT ON Trainings
FOR EACH ROW
BEGIN
    DECLARE validity INT;

    -- Buscar a validade do curso
    SELECT validity_in_years INTO validity
    FROM Courses
    WHERE id = NEW.course_id;

    -- Calcular a data de expiração
    SET NEW.expiration_date = DATE_ADD(NEW.completion_date, INTERVAL validity YEAR);
END$$

DELIMITER ;
INSERT INTO Trainings (employee_id, course_id, completion_date, status) VALUES
(1, 1, '2023-01-15', 'Completed'),
(2, 3, '2023-02-20', 'Pending'),
(3, 2, '2023-03-10', 'Completed'),
(4, 4, '2023-04-05', 'Pending');
