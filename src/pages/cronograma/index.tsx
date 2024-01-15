import './cronograma.css'

import Segunda from './dias/segunda'
import Terca from './dias/terca'
import Quarta from './dias/quarta'
import Quinta from './dias/quinta'
import Sexta from './dias/sexta'
import Sabado from './dias/sabado'
import Domingo from './dias/domingo'

import FormAddCronograma from '../../components/forms/cronograma/addCronograma'

import { useState } from 'react'

import { IoIosAdd } from "react-icons/io"

export default function Cronograma(){

    const [formAddCronograma, setFormAddCronograma] = useState(false)
    
    return(
        <div className='cronograma'>
            <div className="tituloCronograma">
                <span>
                    <h1>Cronograma</h1>

                    <IoIosAdd 
                        onClick={() => setFormAddCronograma(!formAddCronograma)}
                    />
                </span>

                {formAddCronograma == true ? 
                    <FormAddCronograma/>
                : ''}
            </div>
            
            <table>
                <thead>
                     <tr>
                        <th className='semanaHead'>segunda</th>
                        <th className='semanaHead'>terca</th>
                        <th className='semanaHead'>quarta</th>
                        <th className='semanaHead'>quinta</th>
                        <th className='semanaHead'>sexta</th>
                        <th className='fimSemanaHead'>sabado</th>
                        <th className='fimSemanaHead'>domingo</th>
                    </tr>  
                </thead>
                <tbody>
                    <tr>
                        <td className='semanaBody'><Segunda/></td>
                        <td className='semanaBody'><Terca/></td>
                        <td className='semanaBody'><Quarta/></td>
                        <td className='semanaBody'><Quinta/></td>
                        <td className='semanaBody'><Sexta/></td>
                        <td className='fimSemanaBody'><Sabado/></td>
                        <td className='fimSemanaBody'><Domingo/></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}