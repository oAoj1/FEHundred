import '../cronograma.css'

import api from "../../../service/api"

import { useEffect, useState } from 'react'

import { ICronograma } from "../../../types/ICronograma"

export default function Quarta(){

    const [quarta, setQuarta] = useState([])

    useEffect(() => {
        async function lerQuarta(){
            const response = await api.get('/filtrardiacronograma?dia=quarta')
            const data = response.data
    
            setQuarta(data)
        }

        lerQuarta()
    },[])

    return(
        <div className="dia">
            {quarta.map((quarta:ICronograma) => (
                <th key={quarta._id}>
                    {quarta.horas} - {quarta.tarefa}
                </th>
            ))}
        </div>
    )
}