/*
  Warnings:

  - A unique constraint covering the columns `[id_Pergunta]` on the table `Pergunta` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Text_Pergunta]` on the table `Pergunta` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_Respostas]` on the table `Resposta` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_Tipo]` on the table `Tipo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pergunta_id_Pergunta_key" ON "Pergunta"("id_Pergunta");

-- CreateIndex
CREATE UNIQUE INDEX "Pergunta_Text_Pergunta_key" ON "Pergunta"("Text_Pergunta");

-- CreateIndex
CREATE UNIQUE INDEX "Resposta_id_Respostas_key" ON "Resposta"("id_Respostas");

-- CreateIndex
CREATE UNIQUE INDEX "Tipo_id_Tipo_key" ON "Tipo"("id_Tipo");
