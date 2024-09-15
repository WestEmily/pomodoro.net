-- CREATE DATABASE affirmations

CREATE TABLE [affirmations]
(
    [Id]                INT                 NOT NULL PRIMARY KEY IDENTITY(1,1),
    [Description]       NVARCHAR(1000)      NOT NULL
);