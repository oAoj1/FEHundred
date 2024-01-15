import '../cronograma.css'

import api from "../../../service/api"

import { useEffect, useState } from 'react'

import { ICronograma } from "../../../types/ICronograma"

export default function Quinta(){

    const [quinta, setQuinta] = useState([])

    useEffect(() => {
        async function lerQuinta(){
            const response = await api.get('/filtrardiacronograma?dia=quinta')
            const data = response.data
    
            setQuinta(data)
        }

        lerQuinta()
    },[])

    return(
        <div className="dia">
            {quinta.map((quinta:ICronograma) => (
                <th key={quinta._id}>
                    {quinta.horas} - {quinta.tarefa}
                </th>
            ))}
        </div>
    )
}