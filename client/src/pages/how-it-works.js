import { Button } from 'reactstrap'
import React from 'react'

function HowItWorks() {
    return (
        <div className='how-it-works'>
            <p>
                to learn more about this project and how its diffrent parts works together:
            </p>
            <ul>
                <li>Backend (Nodejs)</li>
                <li>
                    <ul>
                        <li>Nodejs API structure</li>
                        <li>Eslint</li>
                        <li>Express Framework</li>
                        <li>Firebase RT Database</li>
                        <li>Firebase Authentication (token verification)</li>
                    </ul>
                </li>
                <li>CI/CD</li>
                <li>
                    <ul>
                        <li>Eslint Test</li>
                        <li>Heroku Deployment</li>
                        <li>Github Actions</li>
                        <li>Google Play</li>
                    </ul>
                </li>

                <li>Frontend (dashboard)</li>
                <li>
                    <ul>
                        <li>React js</li>
                        <li>Redux</li>
                        <li>Firebase Authentication (signin)</li>
                        <li>React Router Dom</li>
                        <li>Lazy and loading</li>
                    </ul>
                </li>

                <li>Application Mobile</li>
                <li>
                    <ul>
                        <li>Kotlin</li>
                        <li>Fragments</li>
                        <li>Retrofit</li>
                        <li>Navigation</li>
                    </ul>
                </li>
            </ul>


            <div className='subscription'>
                <a href='https://forms.gle/3zhLnJxw2ZX4u7V98'>
                    <div className='cybr-btn-container'>
                        <button class="cybr-btn">
                            Subscribe<span aria-hidden>_</span>
                            <span aria-hidden class="cybr-btn__glitch">Apotox_</span>
                            <span aria-hidden class="cybr-btn__tag">BATNA05</span>
                        </button>
                    </div>
                </a>
                <p>subscribe and you will get notified when the course becomes ready</p>
            </div>
        </div>
    )
}

export default HowItWorks
