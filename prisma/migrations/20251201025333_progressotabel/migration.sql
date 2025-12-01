-- CreateTable
CREATE TABLE "Progresso" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "cursoId" INTEGER NOT NULL,
    "moduloId" INTEGER NOT NULL,
    "progresso" INTEGER NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Progresso_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Progresso_userId_moduloId_key" ON "Progresso"("userId", "moduloId");

-- AddForeignKey
ALTER TABLE "Progresso" ADD CONSTRAINT "Progresso_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progresso" ADD CONSTRAINT "Progresso_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progresso" ADD CONSTRAINT "Progresso_moduloId_fkey" FOREIGN KEY ("moduloId") REFERENCES "Modulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
