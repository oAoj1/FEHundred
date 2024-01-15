import '../cronograma.css'

import api from "../../../service/api"

import { useEffect, useState } from 'react'

export default function Horas(){

    const [horas, setHoras] = useState([])

    useEffect(() => {
        async function lerHoras(){
            const response = await api.get('/organizarhoras')
            const data = response.data
    
            setHoras(data)
        }

        lerHoras()
    },[])

    return(
        <>
            {horas.map((horas:string) => (
                <th key='horas' className='horas'>
                    {horas}
                </th>
            ))}
        </>
    
    )
}