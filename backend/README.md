# API Express + TypeScript + Prisma + MongoDB

Documentação completa da configuração do projeto.

## 📋 Índice

1. [Tecnologias Utilizadas](#tecnologias-utilizadas)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Configuração Passo a Passo](#configuração-passo-a-passo)
4. [Arquivos de Configuração](#arquivos-de-configuração)
5. [Como Usar](#como-usar)
6. [Comandos Úteis](#comandos-úteis)
7. [Troubleshooting](#troubleshooting)

---

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Express** - Framework web minimalista
- **Prisma** - ORM moderno para Node.js
- **MongoDB** - Banco de dados NoSQL
- **tsx** - Executor TypeScript para desenvolvimento
- **dotenv** - Gerenciador de variáveis de ambiente

---

## 📁 Estrutura do Projeto

```
prisma-mongo/
├── src/
│   ├── config/
│   │   └── prisma.ts          # Configuração do Prisma Client
│   └── server.ts              # Arquivo principal do servidor
├── prisma/
│   └── schema.prisma          # Schema do banco de dados
├── .env                       # Variáveis de ambiente
├── .gitignore                 # Arquivos ignorados pelo Git
├── package.json               # Dependências e scripts
├── tsconfig.json              # Configuração do TypeScript
└── README.md                  # Documentação
```

---

## ⚙️ Configuração Passo a Passo

### 1. Inicializar o Projeto

```bash
# Criar pasta do projeto
mkdir prisma-mongo
cd prisma-mongo

# Inicializar package.json
npm init -y
```

### 2. Instalar Dependências

```bash
# Dependências principais
npm install express dotenv prisma @prisma/client

# Dependências de desenvolvimento
npm install -D typescript @types/node @types/express tsx
```

### 3. Configurar TypeScript

Crie o arquivo `tsconfig.json` na raiz do projeto:

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "target": "esnext",
    "types": ["node"],
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

**Explicação das configurações:**
- `module: "nodenext"` - Usa o sistema de módulos mais recente do Node.js
- `target: "esnext"` - Compila para a versão mais recente do JavaScript
- `types: ["node"]` - Inclui tipagens do Node.js
- `strict: true` - Ativa todas as verificações estritas de tipo
- `verbatimModuleSyntax: true` - Exige sintaxe explícita de importação/exportação

### 4. Configurar package.json

Adicione `"type": "module"` e os scripts:

```json
{
  "name": "prisma-mongo",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

**Explicação dos scripts:**
- `dev` - Inicia o servidor em modo desenvolvimento com hot reload
- `build` - Compila TypeScript para JavaScript
- `start` - Executa a versão compilada em produção

### 5. Inicializar o Prisma

```bash
npx prisma init
```

Este comando cria:
- Pasta `prisma/` com arquivo `schema.prisma`
- Arquivo `.env` com variável `DATABASE_URL`

### 6. Configurar Variáveis de Ambiente

Edite o arquivo `.env`:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/meudb?retryWrites=true&w=majority"
```

**Para MongoDB local:**
```env
DATABASE_URL="mongodb://localhost:27017/meudb"
```

### 7. Configurar o Schema do Prisma

Edite `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model User {
  id    String  @id @default(auto()) @map("_id") @db.ObjectId
  email String  @unique
  name  String?
  age   Int
}
```

**Explicação do schema:**
- `generator client` - Configura o Prisma Client JS
- `datasource db` - Define MongoDB como banco e a URL de conexão
- `model User` - Define a estrutura da coleção User
  - `@id` - Campo identificador único
  - `@default(auto())` - Gera automaticamente o ID
  - `@map("_id")` - Mapeia para o campo _id do MongoDB
  - `@db.ObjectId` - Tipo específico do MongoDB
  - `@unique` - Garante que o email seja único
  - `String?` - Campo opcional (nullable)

### 8. Criar Configuração do Prisma

Crie `src/config/prisma.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
});

export const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("✅ Conectado ao MongoDB com Prisma!");
    } catch (error) {
        console.error("❌ Erro ao conectar no MongoDB:", error);
        process.exit(1);
    }
};

export const disconnectDB = async () => {
    await prisma.$disconnect();
    console.log("🔌 Desconectado do MongoDB");
};

export default prisma;
```

**Explicação:**
- `PrismaClient({ log: [...] })` - Ativa logs de queries e erros
- `connectDB()` - Função assíncrona para conectar ao banco
- `$connect()` - Método do Prisma para estabelecer conexão
- `disconnectDB()` - Função para desconectar do banco
- `process.exit(1)` - Encerra o processo se houver erro

### 9. Criar o Servidor Express

Crie `src/server.ts`:

```typescript
import "dotenv/config";
import express from "express";
import { connectDB } from "./config/prisma.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Rotas
app.get("/", (req, res) => {
    res.json({
        message: "🚀 API funcionando com Express + TypeScript + Prisma + MongoDB!",
        endpoints: {
            users: "/usuarios",
        },
    });
});

// Iniciar servidor
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
            console.log(`📍 http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao iniciar servidor:", error);
        process.exit(1);
    }
};

startServer();
```

**Explicação:**
- `import "dotenv/config"` - Carrega variáveis de ambiente do .env
- `express.json()` - Middleware para parsear JSON no body das requisições
- `startServer()` - Função assíncrona que conecta ao banco antes de iniciar o servidor
- A rota `/` retorna informações sobre a API

### 10. Gerar o Prisma Client

```bash
npx prisma generate
```

Este comando gera o cliente TypeScript baseado no schema.

### 11. Criar .gitignore

Crie `.gitignore` na raiz:

```
node_modules/
dist/
.env
*.log
.DS_Store
```

---

## 📝 Arquivos de Configuração

### tsconfig.json - Configurações do TypeScript

| Opção | Descrição |
|-------|-----------|
| `module: "nodenext"` | Sistema de módulos ES do Node.js |
| `target: "esnext"` | Compila para JS mais recente |
| `types: ["node"]` | Inclui tipagens do Node.js |
| `strict: true` | Ativa verificações estritas |
| `verbatimModuleSyntax: true` | Exige import/export explícitos |
| `isolatedModules: true` | Cada arquivo é tratado isoladamente |
| `skipLibCheck: true` | Pula checagem de arquivos .d.ts |

### package.json - Dependências e Scripts

```json
{
  "type": "module",  // Habilita ES Modules
  "scripts": {
    "dev": "tsx watch src/server.ts",    // Desenvolvimento
    "build": "tsc",                      // Compilação
    "start": "node dist/server.js"       // Produção
  }
}
```

### schema.prisma - Definição do Banco de Dados

```prisma
// Gerador do cliente
generator client {
  provider = "prisma-client-js"
}

// Fonte de dados
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

// Modelo de dados
model User {
  id    String  @id @default(auto()) @map("_id") @db.ObjectId
  email String  @unique
  name  String?
  age   Int
}
```

---

## 🎯 Como Usar

### Desenvolvimento

```bash
# Instalar dependências
npm install

# Gerar Prisma Client
npx prisma generate

# Rodar em modo desenvolvimento
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

### Produção

```bash
# Compilar TypeScript
npm run build

# Executar versão compilada
npm start
```

### Testando a API

```bash
# Testar rota principal
curl http://localhost:3000

# Resposta esperada:
{
  "message": "🚀 API funcionando com Express + TypeScript + Prisma + MongoDB!",
  "endpoints": {
    "users": "/usuarios"
  }
}
```

---

## 🛠️ Comandos Úteis do Prisma

```bash
# Gerar Prisma Client
npx prisma generate

# Abrir Prisma Studio (interface visual)
npx prisma studio

# Formatar schema.prisma
npx prisma format

# Validar schema.prisma
npx prisma validate

# Resetar banco de dados (CUIDADO!)
npx prisma db push --force-reset
```

---

## 🔧 Troubleshooting

### Erro: "Cannot find module '@prisma/client'"

**Solução:**
```bash
npm uninstall @prisma/client prisma
npm install prisma@6 @prisma/client@6
npx prisma generate
```

### Erro: "PrismaClient needs to be constructed with options"

**Solução:** Você está usando Prisma 7. Faça downgrade para Prisma 6:
```bash
npm install prisma@6 @prisma/client@6
npx prisma generate
```

### Erro: "Cannot find name 'process'"

**Solução:** Adicione `"types": ["node"]` no `tsconfig.json`

### Erro: "Module not found" ao importar

**Solução:** Certifique-se de adicionar `.js` nas importações:
```typescript
import prisma from "./config/prisma.js";  // ✅ Correto
import prisma from "./config/prisma";     // ❌ Errado
```

### Erro de conexão com MongoDB

**Solução:** Verifique se:
1. A URL do MongoDB no `.env` está correta
2. Seu IP está na whitelist do MongoDB Atlas
3. O usuário e senha estão corretos
4. O cluster está ativo

---

## 📚 Próximos Passos

Agora que a configuração básica está pronta, você pode:

1. **Criar Controllers** - Para organizar a lógica das rotas
2. **Adicionar Validações** - Com bibliotecas como Zod ou Joi
3. **Implementar Autenticação** - Com JWT ou Passport
4. **Adicionar Mais Models** - No schema.prisma
5. **Criar Testes** - Com Jest ou Vitest
6. **Documentar API** - Com Swagger/OpenAPI

---

## 📖 Referências

- [Prisma Documentation](https://www.prisma.io/docs)
- [Express Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)

---

## 👨‍💻 Autor

**GabrielLiz**

---

## 📄 Licença

ISC License