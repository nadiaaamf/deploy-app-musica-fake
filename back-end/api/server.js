import express from "express";
import cors from "cors";
import { db } from "./connect.js";
import path from "path";

// Capturar exceções não tratadas
process.on('uncaughtException', function (err) {
  console.error('Erro não capturado:', err);
});

const __dirname = path.resolve();
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas da API
app.get('/api/', (req, res) => {
  res.send("Olá Mundo! Teste");
});

app.get('/api/artists', async (req, res) => {
  try {
    const artists = await db.collection('artists').find({}).toArray();
    res.json(artists);
  } catch (error) {
    console.error("Erro ao buscar artistas:", error);
    res.status(500).send("Erro ao buscar dados");
  }
});

app.get('/api/songs', async (req, res) => {
  try {
    const songs = await db.collection('songs').find({}).toArray();
    res.json(songs);
  } catch (error) {
    console.error("Erro ao buscar músicas:", error);
    res.status(500).send("Erro ao buscar dados");
  }
});

// Arquivos estáticos
app.use(express.static(path.join(__dirname, "../front-end/dist")));

// Middleware para lidar com todas as outras rotas - sempre por último
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/dist/index.html"));
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro na aplicação:', err);
  res.status(500).send('Ocorreu um erro no servidor');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});