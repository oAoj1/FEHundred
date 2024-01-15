import '../cronograma.css'

import api from "../../../service/api"

import { useEffect, useState } from 'react'

import { ICronograma } from "../../../types/ICronograma"

export default function Sabado(){

    const [sabado, setSabado] = useState([])

    useEffect(() => {
        async function lerSabado(){
            const response = await api.get('/filtrardiacronograma?dia=sabado')
            const data = response.data
    
            setSabado(data)
        }

        lerSabado()
    },[])

    return(
        <div className="dia">
            {sabado.map((sabado:ICronograma) => (
                <th key={sabado._id}>
                    {sabado.horas} - {sabado.tarefa}
                </th>
            ))}
        </div>
    )
}