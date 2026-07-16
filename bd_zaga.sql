CREATE DATABASE IF NOT EXISTS GrupoDeEstudos;
USE GrupoDeEstudos;

CREATE TABLE IF NOT EXISTS Usuario (
  iduser      INT          AUTO_INCREMENT PRIMARY KEY,
  nome        VARCHAR(50)  NOT NULL,
  nascimento  DATE         NOT NULL,
  email       VARCHAR(100) NOT NULL UNIQUE,
  senha       VARCHAR(255) NOT NULL,
  foto        VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Grupo (
  idgrupo        INT          AUTO_INCREMENT PRIMARY KEY,
  nome           VARCHAR(50)  NOT NULL,
  descricao      VARCHAR(500),
  idcriador      INT          NOT NULL,
  codigo_convite VARCHAR(10)  UNIQUE,
  data_criacao   DATE         NOT NULL DEFAULT (CURRENT_DATE),
  FOREIGN KEY (idcriador) REFERENCES Usuario(iduser)
);

CREATE TABLE Membro (
  id       INT         AUTO_INCREMENT PRIMARY KEY,
  idgrupo  INT         NOT NULL,
  idmembro INT         NOT NULL,
  cargo    VARCHAR(10) DEFAULT 'membro',
  UNIQUE KEY uq_membro_grupo (idgrupo, idmembro),
  FOREIGN KEY (idgrupo)  REFERENCES Grupo(idgrupo)  ON DELETE CASCADE,
  FOREIGN KEY (idmembro) REFERENCES Usuario(iduser) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Disciplina (
  iddisciplina INT         AUTO_INCREMENT PRIMARY KEY,
  nome         VARCHAR(50) NOT NULL,
  iduser       INT,
  FOREIGN KEY (iduser) REFERENCES Usuario(iduser) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS SessaoEstudo (
  idsessao    INT          AUTO_INCREMENT PRIMARY KEY,
  iduser      INT          NOT NULL,
  disciplina  INT          NOT NULL,
  data        DATE         NOT NULL DEFAULT (CURRENT_DATE),
  horainicio  TIME,
  horatermino TIME,
  observacao  VARCHAR(255),
  FOREIGN KEY (iduser)     REFERENCES Usuario(iduser)        ON DELETE CASCADE,
  FOREIGN KEY (disciplina) REFERENCES Disciplina(iddisciplina) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS Forum (
  idpost   INT          AUTO_INCREMENT PRIMARY KEY,
  idgrupo  INT,
  iduser   INT,
  topico   VARCHAR(100) NOT NULL,
  mensagem TEXT         NOT NULL,
  data     DATETIME     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idgrupo) REFERENCES Grupo(idgrupo)   ON DELETE CASCADE,
  FOREIGN KEY (iduser)  REFERENCES Usuario(iduser)  ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS Comentarios (
  idcomentario INT      AUTO_INCREMENT PRIMARY KEY,
  idpost       INT,
  iduser       INT,
  mensagem     TEXT     NOT NULL,
  data         DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idpost)  REFERENCES Forum(idpost)    ON DELETE CASCADE,
  FOREIGN KEY (iduser)  REFERENCES Usuario(iduser)  ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS Desafios (
  iddesafio INT          AUTO_INCREMENT PRIMARY KEY,
  idgrupo   INT,
  titulo    VARCHAR(100),
  mensagem  TEXT,
  prazodata DATE,
  status    ENUM('ativo', 'expirado') DEFAULT 'ativo',
  FOREIGN KEY (idgrupo) REFERENCES Grupo(idgrupo) ON DELETE CASCADE
);
