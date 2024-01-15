import './datas.css'

import { useState, useEffect } from 'react'

import { IDatas } from '../../types/IDatas'

import { IoIosAdd } from "react-icons/io"

import api from '../../service/api'

import FormAddData from '../../components/forms/datas/addData'

import BotoesData from './botoesData'

export default function Datas(){

    const [idData, setIdData] = useState('')
    const [datas, setDatas] = useState([])
    const [abrirOpcoes, setAbrirOpcoes] = useState(false)
    const [formAddData, setFormAddData] = useState(false)

    useEffect(() => {
        async function lerDatas(){
            const response = await api.get('/datas')
            const data = response.data

            setDatas(data)

        }

        lerDatas()


        
    },[])

    function handleOption(id:any){
        setAbrirOpcoes(!abrirOpcoes)
        setIdData(id)
    }

    return(
        <>
            <div className="datas">
                <div className="tituloDatas">
                    <span>
                        <h1>Datas</h1>

                        <IoIosAdd 
                            onClick={() => setFormAddData(!formAddData)}
                        />
                    </span>

                    {formAddData == true ? 
                        <FormAddData/>
                    : ''}
                </div>

                <ul className="listaDatas">
                    {datas.map((datas:IDatas) => (
                        <li 
                            key={datas._id}
                            className={datas.concluido == true ? 'dataConcluida' : 'dataPendente'}
                        >
                            <h3 onClick={() => handleOption(datas._id)}>
                                {datas.evento}
                            </h3>

                            <div className="dataHoras">
                                <p>{datas.horas}h</p>
                                <input 
                                    type="date" 
                                    value={datas.data}
                                    disabled
                                />
                            </div>
                            
                            {idData == datas._id ? 
                                abrirOpcoes == false ? '' : 
                                    <BotoesData
                                        idPrioridade={datas._id}
                                        idConcluir={datas._id}
                                        idExcluir={datas._id}
                                        idEditar={datas._id}
                                    />
                                
                            : ''}
                            

                        </li>
                    ))}
                </ul>

            </div>
        </>
    )
}