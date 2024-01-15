import './editarMetas.css'

import { useState,useEffect } from 'react'

import api from '../../../../service/api'

export default function FormEditMeta(props:any){

    const prazos = [
        '',
        'hoje',
        'semana',
        'mes',
        'ano'
    ]
    
    useEffect(() => {
        async function lerMeta(){
            await api.get(`/metas/${props.id}`)
                .then((res) => (
                    setEditandoMeta(res.data)
                ))
                .catch((err) => (
                    console.log(err)
                ))

        }

        lerMeta()

    },[])

    const [editandoMeta, setEditandoMeta] = useState<any>({})

    async function editarMeta(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        api.put(`/metas/${props.id}`, editandoMeta)
            .then(() => {
                alert('Meta editada!')
                location.reload()
            })
            .catch((err) => {
                alert('Erro ao editar Meta, confira o console')
                console.log(err)
            })
    }

    return(
        <form 
            onSubmit={editarMeta} 
            className='formEditarMeta'
        >
            <input 
                required
                type="text"
                placeholder='Meta' 
                value={editandoMeta.meta}
                onChange={e => setEditandoMeta({
                    ...editandoMeta, meta:e.target.value
                })}
            />

            <select 
                value={editandoMeta.prazo}
                required
                onChange={e => setEditandoMeta({
                    ...editandoMeta, prazo:e.target.value
                })}
            >
                {prazos.map((prazo:string) => (
                    <option key={prazo} >
                        {prazo}
                    </option>
                ))}
            </select>

            <button>Editar Meta</button>
        </form>
    )
}