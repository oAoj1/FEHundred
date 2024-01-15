import './botoesData.css'

import api from '../../../service/api'

import { useState } from 'react'

import { TiDelete } from "react-icons/ti"
import { FaCheckDouble } from "react-icons/fa6"
import { MdEdit } from "react-icons/md"

import { IBotoes } from '../../../types/IBotoes'

import FormEditData from '../../../components/forms/datas/editData'

export default function BotoesData({idEditar,idExcluir,idConcluir}:IBotoes){

    const [abrirFormEditarData, setAbrirFormEditarData] = useState(false)

    //funcoes CRUD

    async function deletarData(id:any){
        const confirmar = window.confirm('Deseja deletar Data?')

        if(confirmar){
            await api.delete(`/Datas/${id}`)
            alert('Data deletada!')
            location.reload()
        }

    }

    async function concluirData(id:any){
        const confirmar = window.confirm('Deseja concluir Data?')

        if(confirmar){
            await api.post(`/datasconcluir/${id}`)
            alert('Data concluida!')
            location.reload()
        }

    }

    return(
        <div className="botoesMaisOpcoesDatas">
            <div className='botoes'>
                <button 
                    onClick={() => setAbrirFormEditarData(!abrirFormEditarData)}
                > 
                    Editar
                    <MdEdit/>
                </button>

                <button onClick={() => deletarData(idExcluir)}>
                    Excluir
                    <TiDelete/>
                </button>

                <button onClick={() => concluirData(idConcluir)}>
                    Concluir
                    <FaCheckDouble/>
                </button>

            </div>

            <div>
                {abrirFormEditarData == true ? 
                    <FormEditData
                        id={idEditar}
                    /> :  ''  
                }
            </div>

        </div>
    )
}