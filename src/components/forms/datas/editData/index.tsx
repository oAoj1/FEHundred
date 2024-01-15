import './editarData.css'

import { useState,useEffect } from 'react'

import api from '../../../../service/api'

export default function FormEditData(props:any){
    
    const [editandoData, setEditandoData] = useState<any>([])

    useEffect(() => {
        async function lerData(){
            const response = await api.get(`/datas/${props.id}`)
            const data = response.data

            setEditandoData(data)

        }

        lerData()

    },[])


    async function editarData(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        api.put(`/datas/${props.id}`, editandoData)
            .then(() => {
                alert('Data editada!')
                location.reload()
            })
            .catch((err) => {
                alert('Erro ao editar Data, confira o console')
                console.log(err)
            })
    }

    return(
        <form 
            onSubmit={editarData} 
            className='formEditarData'
        >
            <input 
                required
                type="text"
                placeholder='Data' 
                value={editandoData.evento}
                onChange={e => setEditandoData({
                    ...editandoData, evento:e.target.value
                })}
            />

            <input 
                required
                type="date"
                placeholder='Data' 
                value={editandoData.data}
                onChange={e => setEditandoData({
                    ...editandoData, data:e.target.value
                })}
            />

            <input 
                required
                type="time"
                placeholder='horas' 
                value={editandoData.horas}
                onChange={e => setEditandoData({
                    ...editandoData, horas:e.target.value
                })}
            />

            <button>Editar Data</button>
        </form>
    )
}