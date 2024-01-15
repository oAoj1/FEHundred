import './addCronograma.css'

import { useState } from 'react'

import api from '../../../../service/api'

export default function FormAddCronograma(){

    const dias = [
        '',
        'segunda',
        'terca',
        'quarta',
        'quinta',
        'sexta',
        'sabado',
        'domingo'
    ]
    
    const [cronograma, setCronograma] = useState({
        tarefa:'',
        dia:'',
        horas:'',
    })
    
    async function adicionarCronograma(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        api.post('/cronograma', cronograma)
            .then(() => {
                alert('Tarefa adicionada')
                location.reload()
            })
            .catch((err) => {
                alert('Erro ao adicionar tarefa, confira o console')
                console.log(err)
            })
    }

    return(
        <form 
            onSubmit={adicionarCronograma} 
            className='formAddCronograma'
        >
            <input 
                required
                type="text"
                placeholder='Tarefa' 
                onChange={e => setCronograma({
                    ...cronograma, tarefa:e.target.value
                })}
            />

            <select
                onChange={e => setCronograma({
                    ...cronograma, dia:e.target.value
                })}
            >
                {dias.map(dia => (
                    <option key={dia}>
                        {dia}
                    </option>
                ))}
            </select>

            <input 
                type="time"
                placeholder='Horas' 
                onChange={e => setCronograma({
                    ...cronograma, horas:e.target.value
                })}
            />

            <button>Adicionar</button>
        </form>
    )
}