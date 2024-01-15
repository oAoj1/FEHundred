import '../cronograma.css'

import api from "../../../service/api"

import { useEffect, useState } from 'react'

import { ICronograma } from "../../../types/ICronograma"

export default function Segunda(){

    const [segunda, setSegunda] = useState([])

    useEffect(() => {
        async function lerSegunda(){
            const response = await api.get('/organizarhoras?dia=segunda')
            const data = response.data
    
            setSegunda(data)
        }

        lerSegunda()
    },[])

    return(
        <div className="dia">
            {segunda.map((segunda:ICronograma) => (
                <th key={segunda._id}>
                    {segunda.horas} - {segunda.tarefa} 
                </th>
            ))}
        </div>
    )
}