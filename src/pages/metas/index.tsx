import './metas.css'

import { useState } from 'react'

import { IoIosAdd } from "react-icons/io"

import FormAddMeta from '../../components/forms/metas/addMetas'

/* import Header from '../../components/header' */

import MetasHoje from './hoje'
import MetasSemana from './semana'
import MetasMes from './mes'
import MetasAno from './ano'

export default function Metas(props:any){

    const [formAddMeta, setFormAddMeta] = useState(false)

    return(
        <>
            {/* <Header/> */}
            <div 
                className={"metas" || props.estilo}
            >

                <div className="tituloMetas">
                    <span>
                        <h1>Metas</h1>

                        <IoIosAdd 
                            onClick={() => setFormAddMeta(!formAddMeta)}
                        />
                    </span>

                    {formAddMeta == true ? 
                        <FormAddMeta/>
                    : ''}

                </div>
                
                <div className="todasMetas">
                    <MetasHoje/>
                    <MetasSemana/>
                    <MetasMes/>
                    <MetasAno/>
                </div>

            </div>
        </>
    )
}