import './botoesTarefa.css'

import api from '../../../service/api'

import { useState } from 'react'

import { TiDelete } from "react-icons/ti"
import { FaCheckDouble } from "react-icons/fa6"
import { MdEdit, MdPriorityHigh } from "react-icons/md"

import { IBotoes } from '../../../types/IBotoes'

import FormEditTarefa from '../../../components/forms/tarefas/editarTarefa'

export default function BotoesTarefa({idEditar,idExcluir,idPrioridade,idConcluir}:IBotoes){

    const [abrirFormEditarTarefa, setAbrirFormEditarTarefa] = useState(false)

    //funcoes CRUD

    async function deletarTarefa(id:any){
        const confirmar = window.confirm('Deseja deletar tarefa?')

        if(confirmar){
            await api.delete(`/tarefas/${id}`)
            alert('Tarefa deletada!')
            location.reload()
        }

    }

    async function concluirTarefa(id:any){
        const confirmar = window.confirm('Deseja concluir tarefa?')

        if(confirmar){
            await api.post(`/tarefasconcluir/${id}`)
            alert('Tarefa concluida!')
            location.reload()
        }

    }

    async function prioridadeTarefa(id:any){
        const confirmar = window.confirm('Deseja dar prioridade tarefa?')

        if(confirmar){
            await api.post(`/tarefasprioridade/${id}`)
            alert('Tarefa marcada com prioridade!')
            location.reload()
        }
    }

    return(
        <div className="botoesMaisOpcoesTarefas">
            <div className='botoes'>
                <button 
                    onClick={() => setAbrirFormEditarTarefa(!abrirFormEditarTarefa)}
                > 
                    Editar
                    <MdEdit/>
                </button>

                <button onClick={() => deletarTarefa(idExcluir)}>
                    Excluir
                    <TiDelete/>
                </button>

                <button onClick={() => concluirTarefa(idConcluir)}>
                    Concluir
                    <FaCheckDouble/>
                </button>

                <button onClick={() => prioridadeTarefa(idPrioridade)}>
                    Prioridade
                    <MdPriorityHigh/>
                </button>
            </div>

            <div>
                {abrirFormEditarTarefa == false ? '' : 
                    <FormEditTarefa
                        id={idEditar}
                    />
                }
            </div>

        </div>
    )
}