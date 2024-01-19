import '../cronograma.css'

import api from "../../../service/api"

import { useEffect, useState } from 'react'

import { ICronograma } from "../../../types/ICronograma"

import { TiDelete } from "react-icons/ti"
import { MdEdit } from "react-icons/md"

export default function Terca(){

    const [terca, setTerca] = useState<any>([])
    const [idTarefaCronograma, setIdTarefaCronograma] = useState('')
    const [isOpenTarefaCronograma, setIsOpenTarefaCronograma] = useState(false)
    const [atualizandoTarefa, setAtualizandoTarefa] = useState({
        tarefa:'',
        horas:''
    })

    useEffect(() => {
        async function lerTerca(){
            const response = await api.get('/organizarhoras?dia=terca')
            const data = response.data
    
            setTerca(data)
        }

        async function lerTercaID(){
            const response = await api.get(`/cronograma/${idTarefaCronograma}`)
            const data = response.data

            setAtualizandoTarefa(data)
        }

        lerTerca()
        lerTercaID()
 
    },[idTarefaCronograma])

    async function deletarTarefaCronograma(id:any){
        const confirmar = window.confirm('Deseja deletar tarefa?')

        if(confirmar){
            await api.delete(`/cronograma/${id}`)
            
            .then(() => {
                alert('Tarefa deletada do cronograma!')
                location.reload()
            })
            .catch((err) => {
                alert('Erro ao deletar tarefa do cronograma, confira o console')
                console.log(err)
            })
        }
    }

    async function handleEditandoTarefaCrongrama(id:any){
        const confirm = window.confirm('Deseja atualizar tarefa cronograma?')

        if(confirm){
            await api.put(`/cronograma/${id}`, atualizandoTarefa)

            .then(() => {
                alert('Cronograma atualizado com sucesso')
            })
            .catch((err) => {
                alert('Erro ao cronograma, confira o console')
                console.log(err)
            })
        }
    }

    function editarTarefaCronograma(id:any){
        setIsOpenTarefaCronograma(!isOpenTarefaCronograma)
        setIdTarefaCronograma(id)
    }

    return(
        <div className="dia">
            {terca.map((terca:ICronograma) => (
                <th key={terca._id}>
                    <div className='ajustarFlexCronograma'>
                        <div className="horariosTarefas">

                            {idTarefaCronograma == terca._id && isOpenTarefaCronograma == true ?
                                <form 
                                    className='formEditarTarefaCronograma'
                                    onSubmit={() => handleEditandoTarefaCrongrama(terca._id)}
                                >
                                    <input 
                                        type="time" 
                                        value={atualizandoTarefa.horas}
                                        onChange={e => setAtualizandoTarefa({
                                            ...atualizandoTarefa, horas:e.target.value
                                        })}
                                    />
                                    <input 
                                        type="text" 
                                        value={atualizandoTarefa.tarefa}
                                        placeholder={terca.tarefa}
                                        onChange={e => setAtualizandoTarefa({
                                            ...atualizandoTarefa, tarefa:e.target.value
                                        })}
                                    />

                                    {atualizandoTarefa.tarefa !== terca.tarefa ||
                                    atualizandoTarefa.horas !== terca.horas ?
                                        <button>Atualizar</button> 
                                    : '' }

                                </form> : <div>{terca.horas} - {terca.tarefa}</div>
                            }
                            
                        </div>

                        <div className="edicaoTarefas">
                            <MdEdit
                                onClick={() => editarTarefaCronograma(terca._id)}
                            />
                            <TiDelete 
                                onClick={() => deletarTarefaCronograma(terca._id)}
                            />
                        </div>
                    </div>
                </th>
            ))}
        </div>
    )
}