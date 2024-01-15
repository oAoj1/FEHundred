import '../cronograma.css'

import api from "../../../service/api"

import { useEffect, useState } from 'react'

import { ICronograma } from "../../../types/ICronograma"

export default function Sexta(){

    const [sexta, setSexta] = useState([])

    useEffect(() => {
        async function lerSexta(){
            const response = await api.get('/filtrardiacronograma?dia=sexta')
            const data = response.data
    
            setSexta(data)
        }

        lerSexta()
    },[])

    return(
        <div className="dia">
            {sexta.map((sexta:ICronograma) => (
                <th key={sexta._id}>
                    {sexta.horas} - {sexta.tarefa}
                </th>
            ))}
        </div>
    )
}