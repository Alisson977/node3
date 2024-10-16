const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

async function sqlConnection() {
    const banco = await sqlite.open({
        filename: 'database.db',
        driver: sqlite3.Database
    })

    return banco;

}

async function criarTabela() {
    const banco = await sqlConnection();

    const tabela = `CREATE TABLE IF NOT EXISTS alunos (
                    id integer PRIMARY KEY AUTOINCREMENT,
                    uuid varchar(100),
                    nome varchar(100),
                    email varchar(100)
                    );`;

    await banco.exec(tabela) 
}

async function inserir(aluno) {
    const {uuid, nome, email} = aluno;
    const banco = await sqlConnection();
    await banco.run("INSERT INTO alunos (uuid, nome, email) values (?, ?, ?)", uuid, nome, email)
}

async function remover (id) {
    const banco = await sqlConnection();
    await banco.run("DELETE FROM alunos WHERE id = ?", id)
}

async function atualizar (aluno) {

    const {nome, email, id} = aluno
    const banco = await sqlConnection();
    await banco.run("UPDATE alunos SET nome = ?, email = ? WHERE id = ?",nome, email, id)
}

async function listar () {
    const banco = await sqlConnection();
    const result = await banco.run("SELECT * FROM alunos")
    console.log(result)
    return result
}
const aluno = {
    id: 7,
    uuid: "123424",
    nome: "Alisson8",
    email: "jasf@email.com"
}

atualizar(aluno)