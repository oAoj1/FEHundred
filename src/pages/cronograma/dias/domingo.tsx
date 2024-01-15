import '../cronograma.css'

import api from "../../../service/api"

import { useEffect, useState } from 'react'

import { ICronograma } from "../../../types/ICronograma"

export default function Domingo(){

    const [domingo, setDomingo] = useState([])

    useEffect(() => {
        async function lerDomingo(){
            const response = await api.get('/filtrardiacronograma?dia=domingo')
            const data = response.data
    
            setDomingo(data)
        }

        lerDomingo()
    },[])

    return(
        <div className="dia">
            {domingo.map((domingo:ICronograma) => (
                <th key={domingo._id}>
                    {domingo.horas} - {domingo.tarefa}
                </th>
            ))}
        </div>
    )
}