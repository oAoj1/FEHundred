import './botoesMeta.css'

import api from '../../../service/api'

import { useState } from 'react'

import { TiDelete } from "react-icons/ti"
import { FaCheckDouble } from "react-icons/fa6"
import { MdEdit, MdPriorityHigh } from "react-icons/md"

import { IBotoes } from '../../../types/IBotoes'

import FormEditMeta from '../../../components/forms/metas/editarMetas'

export default function BotoesMetas({idEditar,idExcluir,idPrioridade,idConcluir}:IBotoes){

    const [abrirFormEditarMetas, setAbrirFormEditarMetas] = useState(false)

    //funcoes CRUD

    async function deletarMetas(id:any){
        const confirmar = window.confirm('Deseja deletar Metas?')

        if(confirmar){
            await api.delete(`/metas/${id}`)
            alert('Metas deletada!')
            location.reload()
        }

    }

    async function concluirMetas(id:any){
        const confirmar = window.confirm('Deseja concluir Metas?')

        if(confirmar){
            await api.post(`/metasconcluidas/${id}`)
            alert('Metas concluida!')
            location.reload()
        }

    }

    async function prioridadeMetas(id:any){
        const confirmar = window.confirm('Deseja dar prioridade Metas?')

        if(confirmar){
            await api.post(`/metasprioridade/${id}`)
            alert('Metas marcada com prioridade!')
            location.reload()
        }

    }

    return(
        <div className="botoesMaisOpcoesMetas">
            <div className='botoes'>
                <button 
                    onClick={() => setAbrirFormEditarMetas(!abrirFormEditarMetas)}
                > 
                    Editar
                    <MdEdit/>
                </button>

                <button onClick={() => deletarMetas(idExcluir)}>
                    Excluir
                    <TiDelete/>
                </button>

                <button onClick={() => concluirMetas(idConcluir)}>
                    Concluir
                    <FaCheckDouble/>
                </button>

                <button onClick={() => prioridadeMetas(idPrioridade)}>
                    Prioridade
                    <MdPriorityHigh/>
                </button>
            </div>

            <div>
                {abrirFormEditarMetas == true ?
                    <FormEditMeta
                        id={idEditar}
                    /> : ''
                }
            </div>

        </div>
    )
}