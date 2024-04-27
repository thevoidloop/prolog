CREATE TABLE prolog.sinonimos_hechos (
	id_sinonimo INT auto_increment NOT NULL,
	id_hecho INT NOT NULL,
	sinonimo varchar(100) NOT NULL,
	CONSTRAINT sinonimos_hechos_pk PRIMARY KEY (id_sinonimo),
	CONSTRAINT sinonimos_hechos_hechos_FK FOREIGN KEY (id_hecho) REFERENCES prolog.hechos(id_hecho)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;