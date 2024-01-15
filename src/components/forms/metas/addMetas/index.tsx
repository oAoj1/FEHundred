import './addMetas.css'

import { useState } from 'react'

import api from '../../../../service/api'

export default function FormAddMeta(){

    const prazos = [
        '',
        'hoje',
        'semana',
        'mes',
        'ano'
    ]
    
    const [meta, setMeta] = useState({
        meta:'',
        prazo:'',
        prioridade:false,
        concluido:false
    })
    
    async function adicionarMeta(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        api.post('/metas', meta)
            .then(() => {
                alert('Meta adicionada')
                location.reload()
            })
            .catch((err) => {
                alert('Erro ao adicionar Meta, confira o console')
                console.log(err)
            })
    }

    return(
        <form 
            onSubmit={adicionarMeta} 
            className='formAddMeta'
        >
            <input 
                required
                type="text"
                placeholder='Meta' 
                onChange={e => setMeta({
                    ...meta, meta:e.target.value
                })}
            />

            <select 
                value={meta.prazo}
                required
                onChange={e => setMeta({
                    ...meta, prazo:e.target.value
                })}
            >
                {prazos.map((prazo:string) => (
                    <option key={prazo}>
                        {prazo}
                    </option>
                ))}
            </select>

            <button>Adicionar Meta</button>
        </form>
    )
}