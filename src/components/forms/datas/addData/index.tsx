import './addData.css'

import { useState } from 'react'

import api from '../../../../service/api'

export default function FormAddData(){
    
    const [data, setData] = useState({
        data:'',
        horas:'',
        concluido:false,
        evento:''
    })
    
    async function adicionarData(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        api.post('/datas', data)
            .then(() => {
                alert('Data adicionada')
                location.reload()
            })
            .catch((err) => {
                alert('Erro ao adicionar Data, confira o console')
                console.log(err)
            })
    }

    return(
        <form 
            onSubmit={adicionarData} 
            className='formAddData'
        >
            <input 
                required
                type="text"
                placeholder='Evento' 
                onChange={e => setData({
                    ...data, evento:e.target.value
                })}
            />

            <input 
                required
                type="date"
                placeholder='Data' 
                onChange={e => setData({
                    ...data, data:e.target.value
                })}
            />

            <input 
                required
                type="time"
                placeholder='horas'
                onChange={e => setData({
                    ...data, horas:e.target.value
                })}
            />

            <button>Adicionar Data</button>
        </form>
    )
}