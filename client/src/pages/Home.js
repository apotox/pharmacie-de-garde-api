import React from 'react'
// import Footer from '../components/Footer'
import '../glitch.css'

import { useHistory } from 'react-router-dom'
import { Button } from 'reactstrap'
import {FaGithub, FaTwitter} from 'react-icons/fa'
function Home() {

    const history = useHistory()
    return (
        <div className='home-page'>

                <Button class="cybr-btn" onClick={() => {
                    history.push('/dashboard')
                }}>
                    Dashboard
                </Button>


                <Button class="cybr-btn" onClick={() => {
                    window.location.href='https://github.com/apotox/pharmacie-de-garde-api'
                }}>
                    <FaGithub />  Github
                </Button>

                <Button class="cybr-btn" onClick={() => {
                    window.location.href='https://twitter.com/saphidev'
                }}>
                   <FaTwitter /> Twitter
                </Button>
          


            
                <Button class="cybr-btn" onClick={() => {
                    history.push('/how-it-works')
                }}>
                    How it Works<span aria-hidden>_</span>
                    <span aria-hidden class="cybr-btn__glitch">Apotox_</span>
                    <span aria-hidden class="cybr-btn__tag">BATNA05</span>
                </Button>
           


        </div>
    )
}

export default Home
