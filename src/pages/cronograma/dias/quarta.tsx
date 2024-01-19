import '../cronograma.css'

import api from "../../../service/api"

import { useEffect, useState } from 'react'

import { ICronograma } from "../../../types/ICronograma"

import { TiDelete } from "react-icons/ti"
import { MdEdit } from "react-icons/md"

export default function Quarta(){

    const [quarta, setQuarta] = useState([])
    const [idTarefaCronograma, setIdTarefaCronograma] = useState('')
    const [isOpenTarefaCronograma, setIsOpenTarefaCronograma] = useState(false)
    const [atualizandoTarefa, setAtualizandoTarefa] = useState({
        tarefa:'',
        horas:''
    })

    useEffect(() => {
        async function lerQuarta(){
            const response = await api.get('/organizarhoras?dia=quarta')
            const data = response.data
    
            setQuarta(data)
        }

        async function lerQuartaID(){
            const response = await api.get(`/cronograma/${idTarefaCronograma}`)
            const data = response.data

            setAtualizandoTarefa(data)
        }

        lerQuarta()
        lerQuartaID()
 
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
            {quarta.map((quarta:ICronograma) => (
                <th key={quarta._id}>
                    <div className='ajustarFlexCronograma'>
                        <div className="horariosTarefas">

                            {idTarefaCronograma == quarta._id && isOpenTarefaCronograma == true ?
                                <form 
                                    className='formEditarTarefaCronograma'
                                    onSubmit={() => handleEditandoTarefaCrongrama(quarta._id)}
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
                                        placeholder={quarta.tarefa}
                                        onChange={e => setAtualizandoTarefa({
                                            ...atualizandoTarefa, tarefa:e.target.value
                                        })}
                                    />

                                    {atualizandoTarefa.tarefa !== quarta.tarefa ||
                                    atualizandoTarefa.horas !== quarta.horas ?
                                        <button>Atualizar</button> 
                                    : '' }

                                </form> : <div>{quarta.horas} - {quarta.tarefa}</div>
                            }
                            
                        </div>

                        <div className="edicaoTarefas">
                            <MdEdit
                                onClick={() => editarTarefaCronograma(quarta._id)}
                            />
                            <TiDelete 
                                onClick={() => deletarTarefaCronograma(quarta._id)}
                            />
                        </div>
                    </div>
                </th>
            ))}
        </div>
    )
}