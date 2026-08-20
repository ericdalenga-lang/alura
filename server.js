// Nome(s): __________________________
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const ARQUIVO = path.join(__dirname, 'alunos.json');
app.use(express.json()); // permite ler o corpo (body) em JSON
// Lê os alunos do arquivo e retorna um array
function lerAlunos() {
return JSON.parse(fs.readFileSync(ARQUIVO, 'utf-8'));
}
// Salva o array de volta no arquivo
function salvarAlunos(alunos) {
fs.writeFileSync(ARQUIVO, JSON.stringify(alunos, null, 2));
}
// GET /alunos -> lista todos (PRONTA)
app.get('/alunos', (req, res) => {
res.json(lerAlunos());
});
// POST /alunos -> matricula um novo aluno (PRONTA)
app.post('/alunos', (req, res) => {
const alunos = lerAlunos();
const novo = { id: Date.now(), ...req.body };
alunos.push(novo);
salvarAlunos(alunos);
res.status(201).json(novo);
});
// ===== COMPLETE AQUI: GET /alunos/:id, PUT e DELETE =====
app.get('/alunos/:id', (req, res) => {
const id = Number(req.params.id);
const aluno = lerAlunos().find(a => a.id === id);

if (!aluno) {
res.status(404).json({ erro: 'Aluno nao encontrado' });
return;
}

res.json(aluno);
});

app.put('/alunos/:id', (req, res) => {
const alunos = lerAlunos();
const id = Number(req.params.id);
const aluno = alunos.find(a => a.id === id);

if (!aluno) {
res.status(404).json({ erro: 'Aluno nao encontrado' });
return;
}

Object.assign(aluno, req.body);
salvarAlunos(alunos);
res.json(aluno);
});

app.delete('/alunos/:id', (req, res) => {
const id = Number(req.params.id);
const alunos = lerAlunos();
const aluno = alunos.find(a => a.id === id);

if (!aluno) {
res.status(404).json({ erro: 'Aluno nao encontrado' });
return;
}

const alunosAtualizados = alunos.filter(a => a.id !== id);
salvarAlunos(alunosAtualizados);
res.json(aluno);
});

app.listen(3000, () => {
console.log('Academia rodando em http://localhost:3000');
});