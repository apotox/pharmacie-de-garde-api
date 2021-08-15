import React from 'react'
// import Footer from '../components/Footer'
import '../glitch.css'

import { useHistory } from 'react-router-dom'
function Home() {

    const history = useHistory()
    return (
        <div className='home-page'>

            <div className='cybr-btn-container'>
                <button class="cybr-btn" onClick={() => {
                    history.push('/dashboard')
                }}>
                    Dashboard<span aria-hidden>_</span>
                    <span aria-hidden class="cybr-btn__glitch">Apotox_</span>
                    <span aria-hidden class="cybr-btn__tag">BATNA05</span>
                </button>
            </div>


            <div className='cybr-btn-container'>
                <button class="cybr-btn" onClick={() => {
                    window.location.href='https://github.com/apotox/pharmacie-de-garde-api'
                }}>
                    Github<span aria-hidden>_</span>
                    <span aria-hidden class="cybr-btn__glitch">Apotox_</span>
                    <span aria-hidden class="cybr-btn__tag">BATNA05</span>
                </button>
            </div>

            <div className='cybr-btn-container'>
                <button class="cybr-btn" onClick={() => {
                    window.location.href='https://twitter.com/saphidev'
                }}>
                    Twitter<span aria-hidden>_</span>
                    <span aria-hidden class="cybr-btn__glitch">Apotox_</span>
                    <span aria-hidden class="cybr-btn__tag">BATNA05</span>
                </button>
            </div>


            <div className='cybr-btn-container'>
                <button class="cybr-btn" onClick={() => {
                    history.push('/how-it-works')
                }}>
                    How it Works<span aria-hidden>_</span>
                    <span aria-hidden class="cybr-btn__glitch">Apotox_</span>
                    <span aria-hidden class="cybr-btn__tag">BATNA05</span>
                </button>
            </div>


        </div>
    )
}

export default Home
