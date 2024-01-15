import './editarTarefa.css'

import { useState,useEffect } from 'react'

import api from '../../../../service/api'

export default function FormEditTarefa(props:any){
    
    useEffect(() => {
        async function lerTarefa(){
            await api.get(`/tarefas/${props.id}`)
                .then((res) => (
                    setEditandoTarefa(res.data)
                ))
                .catch((err) => (
                    console.log(err)
                ))

        }

        lerTarefa()

    },[])

    const [editandoTarefa, setEditandoTarefa] = useState<any>({})

    async function editarTarefa(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        api.put(`/tarefas/${props.id}`, editandoTarefa)
            .then(() => {
                alert('Tarefa editata!')
                location.reload()
            })
            .catch((err) => {
                alert('Erro ao editar tarefa, confira o console')
                console.log(err)
            })
    }

    return(
        <form 
            onSubmit={editarTarefa} 
            className='formEditarTarefa'
        >
            <input 
                required
                type="text"
                placeholder='Tarefa' 
                value={editandoTarefa.tarefa}
                onChange={e => setEditandoTarefa({
                    ...editandoTarefa, tarefa:e.target.value
                })}
            />

            <input 
                type="text"
                placeholder='Detalhes' 
                value={editandoTarefa.detalhes}
                onChange={e => setEditandoTarefa({
                    ...editandoTarefa, detalhes:e.target.value
                })}
            />

            <button>Editar Tarefa</button>
        </form>
    )
}