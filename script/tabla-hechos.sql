CREATE TABLE prolog.hechos (
	id_hecho INT auto_increment NOT NULL,
	hecho varchar(100) NOT NULL,
	articulo varchar(10) NULL,
	CONSTRAINT hechos_pk PRIMARY KEY (id_hecho)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
