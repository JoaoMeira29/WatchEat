/*
  WatchEat database schema (Microsoft SQL Server).

  Rebuilt from the SQL queries in backend/services, so it has every table and
  column the API reads or writes. Run it inside an empty database:

      CREATE DATABASE WatchEat;
      GO
      USE WatchEat;
      GO
      -- then run this file, then seed.sql
*/

CREATE TABLE [dbo].[Utilizador] (
    [Id]               INT IDENTITY(1,1) NOT NULL,
    [Nome]             VARCHAR(255) NULL,
    [Apelido]          VARCHAR(255) NULL,
    [Email]            VARCHAR(255) NOT NULL,
    [Password]         VARCHAR(255) NOT NULL,
    [NTelemovel]       INT NULL,
    [Morada]           VARCHAR(255) NULL,
    [NIF]              VARCHAR(255) NULL,
    [ImagemPerfil]     VARCHAR(MAX) NULL,
    [Estado]           VARCHAR(255) NOT NULL,   -- Ativo, Suspenso, Bloqueado
    [Utilizador_Roles] VARCHAR(255) NOT NULL,   -- Normal, Premium, Admin
    [Status]           VARCHAR(255) NULL,
    CONSTRAINT [PK_Utilizador] PRIMARY KEY ([Id]),
    CONSTRAINT [UQ_Utilizador_Email] UNIQUE ([Email])
);

-- Friend requests and friendships: UtilizadorId sent the request, UtilizadorId2 received it
CREATE TABLE [dbo].[Utilizador_Utilizador] (
    [UtilizadorId]      INT NOT NULL,
    [UtilizadorId2]     INT NOT NULL,
    [DataPedidoEnviado] DATETIME NOT NULL,
    [DataPedidoAceite]  DATETIME NULL,
    [Estado]            VARCHAR(255) NOT NULL,  -- Pedido Enviado, Amigos
    CONSTRAINT [PK_Utilizador_Utilizador] PRIMARY KEY ([UtilizadorId], [UtilizadorId2]),
    CONSTRAINT [FK_Amizade_Utilizador1] FOREIGN KEY ([UtilizadorId]) REFERENCES [dbo].[Utilizador] ([Id]) ON DELETE CASCADE,
    -- SQL Server does not allow two cascade paths from the same table
    CONSTRAINT [FK_Amizade_Utilizador2] FOREIGN KEY ([UtilizadorId2]) REFERENCES [dbo].[Utilizador] ([Id])
);

CREATE TABLE [dbo].[Conteudo] (
    [Id]           INT IDENTITY(1,1) NOT NULL,
    [Nome]         VARCHAR(255) NOT NULL,
    [Poster]       VARCHAR(MAX) NULL,
    [Realizador]   VARCHAR(255) NULL,
    [Rating]       REAL NULL,
    [DataReleased] DATE NULL,
    [Sinopse]      VARCHAR(MAX) NULL,
    [Trailer]      VARCHAR(MAX) NULL,
    CONSTRAINT [PK_Conteudo] PRIMARY KEY ([Id])
);

CREATE TABLE [dbo].[Filme] (
    [Id]         INT IDENTITY(1,1) NOT NULL,
    [Duracao]    VARCHAR(255) NOT NULL,
    [ConteudoId] INT NOT NULL,
    CONSTRAINT [PK_Filme] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Filme_Conteudo] FOREIGN KEY ([ConteudoId]) REFERENCES [dbo].[Conteudo] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [dbo].[Serie] (
    [Id]               INT IDENTITY(1,1) NOT NULL,
    [NTemporadas]      INT NOT NULL,
    [Estado]           VARCHAR(255) NOT NULL,   -- A decorrer, Concluido, Brevemente
    [DataFim]          DATE NULL,
    [NEpisodiosTotais] INT NULL,
    [ConteudoId]       INT NOT NULL,
    CONSTRAINT [PK_Serie] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Serie_Conteudo] FOREIGN KEY ([ConteudoId]) REFERENCES [dbo].[Conteudo] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [dbo].[Genero] (
    [Id]        INT IDENTITY(1,1) NOT NULL,
    [Nome]      VARCHAR(255) NOT NULL,
    [Descricao] VARCHAR(255) NULL,
    CONSTRAINT [PK_Genero] PRIMARY KEY ([Id])
);

CREATE TABLE [dbo].[Conteudo_Genero] (
    [ConteudoId] INT NOT NULL,
    [GeneroId]   INT NOT NULL,
    CONSTRAINT [PK_Conteudo_Genero] PRIMARY KEY ([ConteudoId], [GeneroId]),
    CONSTRAINT [FK_ConteudoGenero_Conteudo] FOREIGN KEY ([ConteudoId]) REFERENCES [dbo].[Conteudo] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_ConteudoGenero_Genero] FOREIGN KEY ([GeneroId]) REFERENCES [dbo].[Genero] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [dbo].[Ator] (
    [Id]     INT IDENTITY(1,1) NOT NULL,
    [Nome]   VARCHAR(255) NOT NULL,
    [Imagem] VARCHAR(MAX) NULL,
    CONSTRAINT [PK_Ator] PRIMARY KEY ([Id])
);

CREATE TABLE [dbo].[Conteudo_Ator] (
    [ConteudoId]   INT NOT NULL,
    [AtorId]       INT NOT NULL,
    [NomeFicticio] VARCHAR(255) NULL,
    [Descricao]    VARCHAR(255) NULL,
    CONSTRAINT [PK_Conteudo_Ator] PRIMARY KEY ([ConteudoId], [AtorId]),
    CONSTRAINT [FK_ConteudoAtor_Conteudo] FOREIGN KEY ([ConteudoId]) REFERENCES [dbo].[Conteudo] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_ConteudoAtor_Ator] FOREIGN KEY ([AtorId]) REFERENCES [dbo].[Ator] ([Id]) ON DELETE CASCADE
);

-- Watch'List: one row per user and content
CREATE TABLE [dbo].[Biblioteca] (
    [UtilizadorId] INT NOT NULL,
    [ConteudoId]   INT NOT NULL,
    [Review]       VARCHAR(MAX) NULL,
    [Rating]       REAL NULL,
    [Estado]       VARCHAR(255) NOT NULL,       -- Para Assistir, Assistindo, Em Espera, Terminado, Cancelado
    [Visibilidade] VARCHAR(255) NOT NULL,       -- Publica, Privada, Friends Only
    [DataInsercao] DATETIME NULL,
    CONSTRAINT [PK_Biblioteca] PRIMARY KEY ([UtilizadorId], [ConteudoId]),
    CONSTRAINT [FK_Biblioteca_Utilizador] FOREIGN KEY ([UtilizadorId]) REFERENCES [dbo].[Utilizador] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_Biblioteca_Conteudo] FOREIGN KEY ([ConteudoId]) REFERENCES [dbo].[Conteudo] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [dbo].[ReviewsPremium] (
    [UtilizadorId] INT NOT NULL,
    [ConteudoId]   INT NOT NULL,
    [Review]       VARCHAR(MAX) NULL,
    [Rating]       REAL NULL,
    CONSTRAINT [PK_ReviewsPremium] PRIMARY KEY ([UtilizadorId], [ConteudoId]),
    CONSTRAINT [FK_ReviewsPremium_Utilizador] FOREIGN KEY ([UtilizadorId]) REFERENCES [dbo].[Utilizador] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_ReviewsPremium_Conteudo] FOREIGN KEY ([ConteudoId]) REFERENCES [dbo].[Conteudo] ([Id]) ON DELETE CASCADE
);

-- Edits proposed by Premium users; a user can propose several edits to the same content
CREATE TABLE [dbo].[AlteracaoConteudo] (
    [ConteudoId]          INT NOT NULL,
    [UtilizadorId]        INT NOT NULL,
    [DataUltimaAlteracao] DATETIME NOT NULL,
    [DescricaoMotivo]     VARCHAR(255) NULL,
    [AlteracaoAceite]     VARCHAR(255) NULL,    -- Em Espera, Aceite, Não Aceite
    [Alteracoes]          VARCHAR(MAX) NULL,
    CONSTRAINT [PK_AlteracaoConteudo] PRIMARY KEY ([ConteudoId], [UtilizadorId], [DataUltimaAlteracao]),
    CONSTRAINT [FK_AlteracaoConteudo_Conteudo] FOREIGN KEY ([ConteudoId]) REFERENCES [dbo].[Conteudo] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_AlteracaoConteudo_Utilizador] FOREIGN KEY ([UtilizadorId]) REFERENCES [dbo].[Utilizador] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [dbo].[Estafeta] (
    [Id]         INT IDENTITY(1,1) NOT NULL,
    [Nome]       VARCHAR(255) NOT NULL,
    [Apelido]    VARCHAR(255) NOT NULL,
    [NTelemovel] INT NOT NULL,
    CONSTRAINT [PK_Estafeta] PRIMARY KEY ([Id])
);

CREATE TABLE [dbo].[Produto] (
    [Id]     INT IDENTITY(1,1) NOT NULL,
    [Nome]   VARCHAR(255) NOT NULL,
    [Preco]  REAL NOT NULL,
    [Stock]  INT NOT NULL,
    [Imagem] VARCHAR(MAX) NULL,
    CONSTRAINT [PK_Produto] PRIMARY KEY ([Id])
);

CREATE TABLE [dbo].[Menu] (
    [Id]    INT IDENTITY(1,1) NOT NULL,
    [Nome]  VARCHAR(255) NOT NULL,
    [Preco] REAL NOT NULL,
    CONSTRAINT [PK_Menu] PRIMARY KEY ([Id])
);

-- Deleting a user who has orders or payments is blocked by these foreign keys
CREATE TABLE [dbo].[Pedido] (
    [Id]            INT IDENTITY(1,1) NOT NULL,
    [Descricao]     VARCHAR(255) NULL,
    [Morada]        VARCHAR(255) NOT NULL,
    [HoraReservada] DATETIME NOT NULL,          -- when the user wants the order delivered
    [HoraReserva]   DATETIME NOT NULL,          -- when the order was placed
    [HoraEntrega]   DATETIME NULL,
    [PrecoTotal]    REAL NOT NULL,
    [Estado]        VARCHAR(255) NOT NULL,
    [UtilizadorId]  INT NOT NULL,
    [EstafetaId]    INT NOT NULL,
    CONSTRAINT [PK_Pedido] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Pedido_Utilizador] FOREIGN KEY ([UtilizadorId]) REFERENCES [dbo].[Utilizador] ([Id]),
    CONSTRAINT [FK_Pedido_Estafeta] FOREIGN KEY ([EstafetaId]) REFERENCES [dbo].[Estafeta] ([Id])
);

CREATE TABLE [dbo].[Pedido_Produto] (
    [PedidoId]   INT NOT NULL,
    [ProdutoId]  INT NOT NULL,
    [Preco]      REAL NULL,
    [Quantidade] INT NULL,
    CONSTRAINT [PK_Pedido_Produto] PRIMARY KEY ([PedidoId], [ProdutoId]),
    CONSTRAINT [FK_PedidoProduto_Pedido] FOREIGN KEY ([PedidoId]) REFERENCES [dbo].[Pedido] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_PedidoProduto_Produto] FOREIGN KEY ([ProdutoId]) REFERENCES [dbo].[Produto] ([Id])
);

CREATE TABLE [dbo].[Pagamento] (
    [Id]            INT IDENTITY(1,1) NOT NULL,
    [ValorPagar]    REAL NULL,
    [Estado]        VARCHAR(255) NULL,          -- Não Pago, Pago, Terminou o Prazo
    [DataEmissao]   DATETIME NULL,
    [DataPagamento] DATETIME NULL,
    [Descricao]     VARCHAR(255) NULL,
    [TipoPagamento] VARCHAR(255) NULL,          -- Tier premium, or an order payment
    [PedidoId]      INT NULL,
    [UtilizadorId]  INT NULL,
    CONSTRAINT [PK_Pagamento] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Pagamento_Pedido] FOREIGN KEY ([PedidoId]) REFERENCES [dbo].[Pedido] ([Id]),
    CONSTRAINT [FK_Pagamento_Utilizador] FOREIGN KEY ([UtilizadorId]) REFERENCES [dbo].[Utilizador] ([Id])
);
