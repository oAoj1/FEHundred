import '../cronograma.css'

import api from "../../../service/api"

import { useEffect, useState } from 'react'

import { ICronograma } from "../../../types/ICronograma"

import { TiDelete } from "react-icons/ti"
import { MdEdit } from "react-icons/md"

export default function Quinta(){

    const [quinta, setQuinta] = useState([])
    const [idTarefaCronograma, setIdTarefaCronograma] = useState('')
    const [isOpenTarefaCronograma, setIsOpenTarefaCronograma] = useState(false)
    const [atualizandoTarefa, setAtualizandoTarefa] = useState({
        tarefa:'',
        horas:''
    })

    useEffect(() => {
        async function lerQuinta(){
            const response = await api.get('/organizarhoras?dia=quinta')
            const data = response.data
    
            setQuinta(data)
        }

        async function lerQuintaID(){
            const response = await api.get(`/cronograma/${idTarefaCronograma}`)
            const data = response.data

            setAtualizandoTarefa(data)
        }

        lerQuinta()
        lerQuintaID()
 
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
            {quinta.map((quinta:ICronograma) => (
                <th key={quinta._id}>
                    <div className='ajustarFlexCronograma'>
                        <div className="horariosTarefas">

                            {idTarefaCronograma == quinta._id && isOpenTarefaCronograma == true ?
                                <form 
                                    className='formEditarTarefaCronograma'
                                    onSubmit={() => handleEditandoTarefaCrongrama(quinta._id)}
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
                                        placeholder={quinta.tarefa}
                                        onChange={e => setAtualizandoTarefa({
                                            ...atualizandoTarefa, tarefa:e.target.value
                                        })}
                                    />

                                    {atualizandoTarefa.tarefa !== quinta.tarefa ||
                                    atualizandoTarefa.horas !== quinta.horas ?
                                        <button>Atualizar</button> 
                                    : '' }

                                </form> : <div>{quinta.horas} - {quinta.tarefa}</div>
                            }
                            
                        </div>

                        <div className="edicaoTarefas">
                            <MdEdit
                                onClick={() => editarTarefaCronograma(quinta._id)}
                            />
                            <TiDelete 
                                onClick={() => deletarTarefaCronograma(quinta._id)}
                            />
                        </div>
                    </div>
                </th>
            ))}
        </div>
    )
}