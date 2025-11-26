/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `Curso` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `Curso` table. All the data in the column will be lost.
  - Added the required column `nome` to the `Curso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Curso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Curso" DROP COLUMN "criadoEm",
DROP COLUMN "titulo",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "descricao" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "cursoId" INTEGER;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE SET NULL ON UPDATE CASCADE;
