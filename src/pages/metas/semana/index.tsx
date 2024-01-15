import '../metas.css'

import api from "../../../service/api";

import { useEffect, useState } from 'react'

import { IMeta } from '../../../types/IMetas';

import BotoesMetas from '../botoesMeta';

export default function MetasSemana(){

    const [idMetas, setIdMetas] = useState('')
    const [abrirOpcoes, setAbrirOpcoes] = useState(false)
    const [metasSemana, setMetasSemana] = useState([])

    useEffect(() => {
        async function lerMetas(){
            const response = await api.get('/metas')
            const data = response.data

            setMetasSemana(data)
        }

        lerMetas()

    },[])

    function handleOption(id:any){
        setAbrirOpcoes(!abrirOpcoes)
        setIdMetas(id)
    }

    return(
        <ul className='listaMetas'>
            <h2>Semana</h2>

            {metasSemana.map((metas:IMeta) => (
                metas.prazo == 'semana' ? 

                <li 
                    key={metas._id}
                    className={
                        metas.concluido == true ? 'metaConcluida' : 
                        metas.prioridade == true ? 'metaPrioridade' : ''
                    }
                >
                    <h3 onClick={() => handleOption(metas._id)}>
                        {metas.meta}
                    </h3>

                    {idMetas == metas._id ? 
                        abrirOpcoes == true ? 
                            <BotoesMetas
                                idPrioridade={metas._id}
                                idConcluir={metas._id}
                                idExcluir={metas._id}
                                idEditar={metas._id}
                            />  
                        :''
                    : ''}
                </li> : ''

            ))}

        </ul>
    )
}