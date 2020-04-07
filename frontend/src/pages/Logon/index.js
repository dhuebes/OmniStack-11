import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() {
    const [id, setId] = useState('');

    const history = useHistory();
    async function handleLogon(e) {
        e.preventDefault();

        try {         
            const resp = await api.post('sessions', { id });
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', resp.data.name);
            history.push('/profile');
        } catch (error) {
            alert('Falha no Logon, tente novamente.');   
        }
        
    }

    return (            
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"></img>

                <form onSubmit={handleLogon}>
                    <h1>Faça seu logon</h1>
                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className='button 'type="submit">Entrar</button>

                    
                    <Link to="/register/" className="back-link">
                        <FiLogIn size={16}></FiLogIn>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="heroes"></img>
        </div>
    )
}