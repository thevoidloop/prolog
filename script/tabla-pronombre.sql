CREATE TABLE prolog.pronombres (
	id_pronombre INT auto_increment NOT NULL,
	pronombre varchar(50) NOT NULL,
	plural BOOL NOT NULL,
	CONSTRAINT pronombres_pk PRIMARY KEY (id_pronombre)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
