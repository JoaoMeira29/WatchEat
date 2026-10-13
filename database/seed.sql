/*
  WatchEat sample data. Run after schema.sql, on empty tables.

  The accounts below are for local development only. Their passwords are stored
  as plain text here and are replaced by a hash the first time each one logs in.

      user1@gmail.com  / 1234    Premium
      user2@gmail.com  / 1234    Normal
      user3@gmail.com  / 1234    Normal
      user4@gmail.com  / 13121   Normal, suspended (cannot log in)
      admin@gmail.com  / admin   Admin

  The backend tests in backend/tests expect user1, user4 and admin to exist.
  Posters and trailers are left empty: add your own image and video links.
*/

SET IDENTITY_INSERT [dbo].[Utilizador] ON;
INSERT INTO [dbo].[Utilizador] ([Id],[Nome],[Apelido],[Email],[Password],[NTelemovel],[Morada],[NIF],[Estado],[Utilizador_Roles]) VALUES
    (1, N'Ana',    N'Silva',    'user1@gmail.com', '1234',  912345601, N'Rua das Flores 10, Braga', '100000001', N'Ativo',    'Premium'),
    (2, N'Bruno',  N'Costa',    'user2@gmail.com', '1234',  912345602, N'Avenida Central 22, Porto', '100000002', N'Ativo',    'Normal'),
    (3, N'Carla',  N'Ferreira', 'user3@gmail.com', '1234',  912345603, NULL, NULL,                               N'Ativo',    'Normal'),
    (4, N'Diogo',  N'Martins',  'user4@gmail.com', '13121', NULL,      NULL, NULL,                               N'Suspenso', 'Normal'),
    (5, N'Admin',  N'WatchEat', 'admin@gmail.com', 'admin', NULL,      NULL, NULL,                               N'Ativo',    'Admin');
SET IDENTITY_INSERT [dbo].[Utilizador] OFF;

-- Ana and Bruno are friends; Carla has sent Ana a request
INSERT INTO [dbo].[Utilizador_Utilizador] ([UtilizadorId],[UtilizadorId2],[DataPedidoEnviado],[DataPedidoAceite],[Estado]) VALUES
    (1, 2, '2024-01-10T18:00:00', '2024-01-11T09:30:00', N'Amigos'),
    (3, 1, '2024-02-01T20:15:00', NULL,                  N'Pedido Enviado');

SET IDENTITY_INSERT [dbo].[Genero] ON;
INSERT INTO [dbo].[Genero] ([Id],[Nome],[Descricao]) VALUES
    (1, N'Drama',              NULL),
    (2, N'Crime',              NULL),
    (3, N'Ficção Científica',  NULL),
    (4, N'Thriller',           NULL),
    (5, N'Comédia',            NULL),
    (6, N'Ação',               NULL);
SET IDENTITY_INSERT [dbo].[Genero] OFF;

SET IDENTITY_INSERT [dbo].[Conteudo] ON;
INSERT INTO [dbo].[Conteudo] ([Id],[Nome],[Poster],[Realizador],[Rating],[DataReleased],[Sinopse],[Trailer]) VALUES
    (1, N'The Shawshank Redemption', NULL, N'Frank Darabont',       9.3, '1994-09-23', N'Um banqueiro condenado a prisão perpétua faz amizade com outro recluso e nunca perde a esperança.', NULL),
    (2, N'The Godfather',            NULL, N'Francis Ford Coppola', 9.2, '1972-03-24', N'O patriarca de uma família do crime organizado passa o controlo do império ao filho mais novo.', NULL),
    (3, N'Inception',                NULL, N'Christopher Nolan',    8.8, '2010-07-16', N'Um ladrão que rouba segredos através dos sonhos recebe a missão de implantar uma ideia.', NULL),
    (4, N'Parasite',                 NULL, N'Bong Joon-ho',         8.5, '2019-05-30', N'Uma família pobre infiltra-se, um a um, na casa de uma família rica.', NULL),
    (5, N'Breaking Bad',             NULL, N'Vince Gilligan',       9.5, '2008-01-20', N'Um professor de química com cancro começa a produzir metanfetamina para garantir o futuro da família.', NULL),
    (6, N'Chernobyl',                NULL, N'Craig Mazin',          9.3, '2019-05-06', N'A história do acidente nuclear de 1986 e das pessoas que tentaram conter as suas consequências.', NULL);
SET IDENTITY_INSERT [dbo].[Conteudo] OFF;

INSERT INTO [dbo].[Filme] ([Duracao],[ConteudoId]) VALUES
    ('142', 1), ('175', 2), ('148', 3), ('132', 4);

INSERT INTO [dbo].[Serie] ([NTemporadas],[Estado],[DataFim],[NEpisodiosTotais],[ConteudoId]) VALUES
    (5, N'Concluido', '2013-09-29', 62, 5),
    (1, N'Concluido', '2019-06-03', 5,  6);

INSERT INTO [dbo].[Conteudo_Genero] ([ConteudoId],[GeneroId]) VALUES
    (1, 1), (2, 1), (2, 2), (3, 3), (3, 6), (4, 4), (4, 5), (5, 1), (5, 2), (6, 1), (6, 4);

INSERT INTO [dbo].[Biblioteca] ([UtilizadorId],[ConteudoId],[Review],[Rating],[Estado],[Visibilidade],[DataInsercao]) VALUES
    (1, 1, NULL, 9,    N'Terminado',     N'Publica', '2024-01-05T21:00:00'),
    (1, 5, NULL, NULL, N'Assistindo',    N'Publica', '2024-01-20T22:10:00'),
    (2, 3, NULL, NULL, N'Para Assistir', N'Privada', '2024-02-02T19:45:00');

INSERT INTO [dbo].[ReviewsPremium] ([UtilizadorId],[ConteudoId],[Review],[Rating]) VALUES
    (1, 1, N'Um clássico que vale sempre a pena rever.', 9.5);

-- Orders are assigned to a random courier with Id 1 to 5, so all five must exist
SET IDENTITY_INSERT [dbo].[Estafeta] ON;
INSERT INTO [dbo].[Estafeta] ([Id],[Nome],[Apelido],[NTelemovel]) VALUES
    (1, N'Rui',    N'Almeida', 930000001),
    (2, N'Sofia',  N'Pereira', 930000002),
    (3, N'Tiago',  N'Sousa',   930000003),
    (4, N'Marta',  N'Rocha',   930000004),
    (5, N'Pedro',  N'Lopes',   930000005);
SET IDENTITY_INSERT [dbo].[Estafeta] OFF;

-- Imagem is used directly as the image address in the products page
INSERT INTO [dbo].[Produto] ([Nome],[Preco],[Stock],[Imagem]) VALUES
    (N'Pipocas',             2.50, 100, N'assets/produtos/pipocas.png'),
    (N'Pipocas Grandes',     3.50, 100, N'assets/produtos/pipocasGrandes.png'),
    (N'Pipocas de Caramelo', 3.00, 100, N'assets/produtos/pipocasCaramelo.png'),
    (N'Coca-Cola',           1.50, 100, N'assets/produtos/cocaCola.png'),
    (N'Pepsi',               1.50, 100, N'assets/produtos/pepsi.png'),
    (N'Bananas',             1.00, 100, N'assets/produtos/bananas.png'),
    (N'Maçãs',               1.00, 100, N'assets/produtos/maças.png');

INSERT INTO [dbo].[Menu] ([Nome],[Preco]) VALUES
    (N'Menu Cinema', 4.50),
    (N'Menu Duplo',  8.00);
