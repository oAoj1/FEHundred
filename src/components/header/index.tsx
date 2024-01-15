import './header.css'

import { Link } from 'react-router-dom'

import { RxHamburgerMenu } from "react-icons/rx"
import { IoMdClose } from "react-icons/io"

import { useState } from 'react'

export default function Header(){

    const [isMenuResponsiveOpen, setIsMenuResponsiveOpen] = useState(false)

    window.addEventListener('resize', fecharMenu)

    function fecharMenu(){
        setIsMenuResponsiveOpen(false)
    }

    const botoes = [
        {
            url:'/',
            nome:'home'
        },
        {
            url:'/cronograma',
            nome:'cronograma'
        },
        {
            url:'/tarefas',
            nome:'tarefas'
        },
        {
            url:'/metas',
            nome:'metas'
        },
        {
            url:'/datas',
            nome:'datas'
        },
        {
            url:'/anotacoes',
            nome:'anotacoes'
        }
    ]

    return(
        <header>
            <div className="tituloHeader">
                <Link to='/' style={{textDecoration:'none'}}>
                    <span>100% Day</span>
                </Link>
            </div>
            
            <ul className='listaBotoesLinks'>
                {botoes.map(links => (
                    <li key={links.nome}>
                        <Link to={links.url}>
                            <button>{links.nome}</button>
                        </Link>
                    </li>
                ))}
            </ul>

            <RxHamburgerMenu 
                className='menuResponsivo'
                onClick={() => setIsMenuResponsiveOpen(!isMenuResponsiveOpen)}
            />

            {isMenuResponsiveOpen == true ? 
                <>
                    <div 
                        className='overlay' 
                        onClick={() => setIsMenuResponsiveOpen(!isMenuResponsiveOpen)}>
                    </div>
                        <ul className='listaBotoesLinksResponsivo'>
                            <IoMdClose 
                                onClick={() => setIsMenuResponsiveOpen(!isMenuResponsiveOpen)}
                                className='fecharMenuResponsivo'
                            />
                            {botoes.map(links => (
                                <li key={links.nome}>
                                    <Link to={links.url}>
                                        <button>{links.nome}</button>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                </>
                
            : ''}

        </header>
    )
}