-- CreateTable
CREATE TABLE "Pergunta" (
    "id_Pergunta" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Text_Pergunta" TEXT NOT NULL,
    "Tipo_id" INTEGER NOT NULL,
    CONSTRAINT "Pergunta_Tipo_id_fkey" FOREIGN KEY ("Tipo_id") REFERENCES "Tipo" ("id_Tipo") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Resposta" (
    "id_Respostas" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Text_Respostas" TEXT NOT NULL,
    "id_Pergunta" INTEGER NOT NULL,
    CONSTRAINT "Resposta_id_Pergunta_fkey" FOREIGN KEY ("id_Pergunta") REFERENCES "Pergunta" ("id_Pergunta") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tipo" (
    "id_Tipo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Tipo" TEXT NOT NULL
);
