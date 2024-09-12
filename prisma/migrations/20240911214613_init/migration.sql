-- CreateTable
CREATE TABLE `Tarefa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `descricao` VARCHAR(140) NULL,
    `finalizada` BOOLEAN NOT NULL DEFAULT false,
    `dataTermino` DATETIME(3) NULL,
    `prioridade` VARCHAR(191) NOT NULL DEFAULT 'Baixa',
    `membroId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Membro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(50) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Membro_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tarefa` ADD CONSTRAINT `Tarefa_membroId_fkey` FOREIGN KEY (`membroId`) REFERENCES `Membro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
