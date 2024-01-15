import './addTarefa.css'

import { useState } from 'react'

import api from '../../../../service/api'

export default function FormAddTarefa(){
    
    const [tarefa, setTarefa] = useState({
        tarefa:'',
        prioridade:false,
        concluido:false,
        detalhes:''
    })
    
    async function adicionarTarefa(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        api.post('/tarefas', tarefa)
            .then(() => {
                alert('Tarefa adicionada')
                location.reload()
            })
            .catch((err) => {
                alert('Erro ao adicionar tarefa, confira o console')
                console.log(err)
            })
    }

    return(
        <form 
            onSubmit={adicionarTarefa} 
            className='formAddTarefa'
        >
            <input 
                required
                type="text"
                placeholder='Tarefa' 
                onChange={e => setTarefa({
                    ...tarefa, tarefa:e.target.value
                })}
            />

            <input 
                type="text"
                placeholder='Detalhes' 
                onChange={e => setTarefa({
                    ...tarefa, detalhes:e.target.value
                })}
            />

            <button>Adicionar Tarefa</button>
        </form>
    )
}