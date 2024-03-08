import express from "express"
import {v4 as uuidv4} from 'uuid'
const app = express();
app.use(express.json());
const tarefas = []

app.get("/tasks", (requisicao, resposta) =>{
    return resposta.json(tarefas)
});

app.post(("/tasks"), (requisicao, resposta) => {
    const { tarefa } = requisicao.body
    tarefas.push({
        id: uuidv4(),
        task: tarefa,
        complet: false,
    })
    return resposta.json(tarefas)
})

app.put("/tasks/:tasksId", (requisicao, resposta) =>{
    const { id } = requisicao.params
    const part = tarefas.find((element) => element.id === id)
    if(part){
        const index = tarefas.indexOf(part)
        tarefas[index].complet = !tarefas[index].complet
        return resposta.json(tarefas)
    } else{
        return resposta.status(400).json({"error": "Id não encotrado"})
    }
});

app.get(("/tasks/:tasksId"), (requisicao,resposta) =>{
    const { id } = requisicao.params
    const part = tarefas.find((element) => element.id === id)
    if(part){
        const index = tarefas.indexOf(part)
        return resposta.json(tarefas[index])
    } else{
        return resposta.status(400).json({"error": "Id não encotrado"})
    }
})

app.delete(("/tasks/:tasksId", (requisicao, resposta) =>{
    const { id } = requisicao.params
    const part = tarefas.find((element) => element.id === id)
    if(part){
        const index = tarefas.indexOf(part)
        tarefas.splice(index, 1)
        return resposta.status(204).json({"Ok": "Elemento apagado"})
    } else{
        return resposta.status(400).json({"error": "Id não encotrado"})
    }
}))

app.listen(3000, () => "Server On🔥");