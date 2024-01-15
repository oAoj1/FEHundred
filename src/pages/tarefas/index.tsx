import './tarefas.css'

import FormAddTarefa from '../../components/forms/tarefas/addTarefa'

import BotoesTarefa from './botoesTarefa'

import api from '../../service/api'

import { useState, useEffect } from 'react'

import { ITarefa } from '../../types/ITarefa'

import { IoIosAdd } from "react-icons/io"
import { RiArrowUpSFill } from "react-icons/ri"

export default function Tarefas(){

    const [idTarefa, setIdTarefa] = useState('')
    const [tarefas,setTarefas] = useState([])
    const [formAddTarefa, setFormAddTarefa] = useState(false)
    const [isOption, setIsOption] = useState(false)

    useEffect(() => {

        async function lerTarefa(){
            const response = await api.get('/tarefas')
            const data = response.data

            setTarefas(data)
        }

        lerTarefa()

    },[])

    //abrir e fechar opcoes de cada tarefa

    function handleOption(id:any){
        setIsOption(!isOption)
        setIdTarefa(id)
    }
    
    //abrir fechar formulario de adicionar tarefas

    return(
        <div className="tarefas">
            <div className='tituloTarefas'>
                <span>
                    <h1>Tarefas</h1>
                    
                    <IoIosAdd
                        onClick={() => setFormAddTarefa(!formAddTarefa)}
                    />
                </span>

                {formAddTarefa == true ? 
                    <FormAddTarefa/>
                : ''}

            </div>

            <ul className='listaTarefas'>
                {tarefas.map((tarefas:ITarefa) => (
                    <li 
                        key={tarefas._id}
                        className={`${
                            tarefas.concluido == true ? 'tarefaConcluida' : 
                            tarefas.prioridade == true ? 'tarefaPrioridade' : ''}`
                        }
                    > 
                        <h3 onClick={() => handleOption(tarefas._id)}>
                            {tarefas.tarefa}
                        </h3>

                        {idTarefa == tarefas._id ? 
                            
                            isOption == true ? 
                                <div className='maisOpcoesTarefa'>
                                    <RiArrowUpSFill className='setaCima'/>

                                    <h4>{tarefas.detalhes}</h4>
                                    
                                    <BotoesTarefa
                                        idEditar={tarefas._id}
                                        idExcluir={tarefas._id}
                                        idConcluir={tarefas._id}
                                        idPrioridade={tarefas._id}
                                    />
                                </div> : ''
                                
                            : ''}   

                            <div>

                        </div>

                    </li>

                ))}
            </ul>
        </div>
    )
}