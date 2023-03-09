const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let alunos = [];
let maiorNota = 0;
let nomeMaiorNota = '';
let menorNota = 100;
let nomeMenorNota = '';
let somaNotas = 0;
let qtdAprovados = 0;
let qtdReprovados = 0;

function obterDadosAluno() {
    return new Promise((resolve) => {
        rl.question('Nome do aluno: ', (nome) => {
            rl.question('Nota: ', (nota) => {
                const aluno = {
                    nome: nome,
                    nota: parseFloat(nota)
                };
                resolve(aluno);
            });
        });
    });
}

async function calculoNotas() {
    for (let i = 1; i <= 10; i++) {
        
        const aluno = await obterDadosAluno();
        alunos.push(aluno);
        console.log(`---------------------`);

        if (aluno.nota > maiorNota) {
            maiorNota = aluno.nota;
            nomeMaiorNota = aluno.nome;
        }
        if (aluno.nota < menorNota) {
            menorNota = aluno.nota;
            nomeMenorNota = aluno.nome;
        }
        somaNotas += aluno.nota;
        if (aluno.nota >= 60) {
            qtdAprovados++;
        } else {
            qtdReprovados++;
        }
    }

    const media = somaNotas / 10;
    console.log(`Maior nota: ${maiorNota} - Aluno: ${nomeMaiorNota}`);
    console.log(`Menor nota: ${menorNota} - Aluno: ${nomeMenorNota}`);
    console.log(`Média das notas: ${media}`);
    console.log(`Quantidade de alunos aprovados: ${qtdAprovados}`);
    console.log(`Quantidade de alunos reprovados: ${qtdReprovados}`);

    rl.close();
}

module.exports = calculoNotas;