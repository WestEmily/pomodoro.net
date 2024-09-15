-- SEED DATABASE Affirmations

SET IDENTITY_INSERT [affirmations] ON;
INSERT INTO [affirmations](Id, Description)
VALUES
(1, 'You can do it.'),
(2, 'You are amazing')
SET IDENTITY_INSERT [affirmations] OFF;