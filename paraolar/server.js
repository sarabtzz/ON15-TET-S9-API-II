//Olá! Passando para avisar que essa semana tive algumas questões de saúde e não consegui de fato fazer o exercício que foi solicitado. Peço desculpas e logo o ex completo e corrigido será enviado.


const filmesJson = require("./data/filmes.json")
const seriesJson = require("./data/series.json")

const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (request, response)=>{
    response.status(200).json([
        {
            "mensagem":"API de filmes"
        }
    ])
})


app.get("/filmes.json/filmes", (request, response)=>{
    response.status(200).send(filmesJson)
})



app.get("/filmes.json/buscar/:id", (request, response)=>{
    let idRequest = request.params.id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    response.status(200).send(filmeEncontrado)

})

app.get("/filmes/filtro", (request, response)=>{
    
    let tituloRequest = request.query.titulo.toLowerCase()

    let filmeEncontrado = filmesJson.filter(
        filme => filme.title.toLowerCase().includes(tituloRequest))

    response.status(200).send(filmeEncontrado)
})


app.post("/filmes/cadastrar", (request,response)=>{
    let bodyRequest = request.body

    let novoFilme = {
        id: (filmesJson.length)+1, 
        title: bodyRequest.title, 
        description: bodyRequest.description 
    }
    filmesJson.push(novoFilme)
    
    response.status(201).send({
        "mensagem": "filmes cadastrados com sucesso",
        novoFilme
    })
})

app.delete("/filmes/deletar/:id",(request, response) => {
    const idRequest = request.params.id
    const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)


    const indice = filmesJson.indexOf(filmeEncontrado)
    console.log(indice)

    
    filmesJson.splice(indice, 1)

    response.status(200).json([{
        "mensagem": "filme deletado com sucesso",
        "filme-deletado": filmeEncontrado,
        filmesJson
    }])

})

app.put("/filmes/substituir/:id", (request, response) => {
    
    const idRequest = request.params.id
    
    const bodyRequest = request.body
    
    const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    const indice = filmesJson.indexOf(filmeEncontrado)


    bodyRequest.id = idRequest


    filmesJson.splice(indice, 1, bodyRequest)

    response.status(200).json([{
        "mensagem": "filme atualizado com sucesso",
        "filme-atualizado": bodyRequest,
        filmesJson
    }])
})

app.patch("/filmes/updateTitulo/:id", (request, response)=>{
    const idRequest = request.params.id
    const newTitle = request.body.title

    const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    filmeEncontrado.title = newTitle

    response.status(200).json([{
        "mensagem": "titulo atualizado com sucesso",
        "filme-atualizado": filmeEncontrado,
        filmesJson
    }])

})



app.listen(2240, ()=>{
    console.log("segura essa")
})
