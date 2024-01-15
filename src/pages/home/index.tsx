import './Home.css'

import Header from '../../components/header'
import Cronograma from '../cronograma'
import Tarefas from '../tarefas'
import Metas from '../metas'
import Datas from '../datas'

export default function Home(){

    return(
        <>
            <Header/>
            
            <div className="janelasHome">
                <div className="janelasCronogramaData">
                    <iframe src="/cronograma" className='janelaCronograma'>
                        <Cronograma/>
                    </iframe>

                    <iframe src="/datas" className='janelaData'>
                        <Datas/>
                    </iframe>
                </div>

                <div className="janelasMetasTarefas">
                    <iframe src="/tarefas" className='janelaTarefa'>
                        <Tarefas/>
                    </iframe>

                    <iframe src="/metas" className='janelaMetas'>
                        <Metas/>
                    </iframe>
                </div>

            </div>
            
        </>
    )
}