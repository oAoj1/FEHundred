import '../cronograma.css'

import api from "../../../service/api"

import { useEffect, useState } from 'react'

import { ICronograma } from "../../../types/ICronograma"

export default function Terca(){

    const [terca, setTerca] = useState([])

    useEffect(() => {
        async function lerTerca(){
            const response = await api.get('/organizarhoras?dia=terca')
            const data = response.data
    
            setTerca(data)
        }

        lerTerca()
    },[])

    return(
        <div className="dia">
            {terca.map((terca:ICronograma) => (
                <th key={terca._id}>
                    {terca.horas} - {terca.tarefa} 
                </th>
            ))}
        </div>
    )
}