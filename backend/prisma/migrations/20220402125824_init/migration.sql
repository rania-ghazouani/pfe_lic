BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[user] (
    [userId] INT NOT NULL IDENTITY(1,1),
    [userName] NVARCHAR(1000),
    [email] NVARCHAR(1000) NOT NULL,
    [pwd] NVARCHAR(1000) NOT NULL,
    [userType] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [user_pkey] PRIMARY KEY ([userId]),
    CONSTRAINT [user_email_key] UNIQUE ([email])
);

-- CreateTable
CREATE TABLE [dbo].[product] (
    [productId] NVARCHAR(1000) NOT NULL,
    [productName] NVARCHAR(1000) NOT NULL,
    [productDescription] NVARCHAR(1000),
    [productQuantity] INT NOT NULL,
    [productPrice] FLOAT(53) NOT NULL,
    [productMin] INT NOT NULL,
    [isArchived] BIT CONSTRAINT [product_isArchived_df] DEFAULT 0,
    [creationDate] DATETIME2 NOT NULL CONSTRAINT [product_creationDate_df] DEFAULT CURRENT_TIMESTAMP,
    [updateDate] DATETIME2 NOT NULL,
    [destination] NVARCHAR(1000) NOT NULL,
    [categoryId] INT,
    CONSTRAINT [product_pkey] PRIMARY KEY ([productId])
);

-- CreateTable
CREATE TABLE [dbo].[categoryProduct] (
    [categoryId] INT NOT NULL IDENTITY(1,1),
    [categoryName] NVARCHAR(1000) NOT NULL,
    [userId] INT,
    CONSTRAINT [categoryProduct_pkey] PRIMARY KEY ([categoryId])
);

-- CreateTable
CREATE TABLE [dbo].[history] (
    [idHistory] INT NOT NULL IDENTITY(1,1),
    [transactionType] NVARCHAR(1000) NOT NULL,
    [date] DATETIME2 NOT NULL,
    [note] NVARCHAR(1000),
    [productId] NVARCHAR(1000) NOT NULL,
    [userId] INT NOT NULL,
    CONSTRAINT [history_pkey] PRIMARY KEY ([idHistory])
);

-- CreateTable
CREATE TABLE [dbo].[alert] (
    [alertId] INT NOT NULL IDENTITY(1,1),
    [alertObject] NVARCHAR(1000) NOT NULL,
    [productId] NVARCHAR(1000),
    [userId] INT,
    CONSTRAINT [alert_pkey] PRIMARY KEY ([alertId])
);

-- CreateTable
CREATE TABLE [dbo].[_productTouser] (
    [A] NVARCHAR(1000) NOT NULL,
    [B] INT NOT NULL,
    CONSTRAINT [_productTouser_AB_unique] UNIQUE ([A],[B])
);

-- CreateIndex
CREATE INDEX [_productTouser_B_index] ON [dbo].[_productTouser]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[product] ADD CONSTRAINT [product_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[categoryProduct]([categoryId]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[categoryProduct] ADD CONSTRAINT [categoryProduct_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[user]([userId]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[history] ADD CONSTRAINT [history_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[user]([userId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[history] ADD CONSTRAINT [history_productId_fkey] FOREIGN KEY ([productId]) REFERENCES [dbo].[product]([productId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[alert] ADD CONSTRAINT [alert_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[user]([userId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[alert] ADD CONSTRAINT [alert_productId_fkey] FOREIGN KEY ([productId]) REFERENCES [dbo].[product]([productId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[_productTouser] ADD CONSTRAINT [FK___productTouser__A] FOREIGN KEY ([A]) REFERENCES [dbo].[product]([productId]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_productTouser] ADD CONSTRAINT [FK___productTouser__B] FOREIGN KEY ([B]) REFERENCES [dbo].[user]([userId]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
