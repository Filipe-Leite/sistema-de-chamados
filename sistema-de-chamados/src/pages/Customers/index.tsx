import { useState } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';

import { FiUser } from 'react-icons/fi'

export default function Customers(){
    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');

    function handleRegister(event: any){
        event.preventDefault();
        
        alert("teste")
    }

    return(
        <div>
            <Header/>

            <div className="content">
                <Title name="Clientes">
                    < FiUser size={25} />
                </Title>
            </div>

            <div className='container'>
                <form className='form-profile' onClick={handleRegister}>
                    <label>Nome fantasia</label>
                    <input
                        type="text"
                        placeholder='Nome da empresa'
                        value={nome}
                        onChange={(event) => setNome(event.target.value)}
                    />

                    <label>CNPJ</label>
                    <input
                        type="text"
                        placeholder='Digite o CNPJ'
                        value={cnpj}
                        onChange={(event) => setCnpj(event.target.value)}
                    />

                    <label>Endereço</label>
                    <input
                        type="text"
                        placeholder='Endereço da empresa'
                        value={endereco}
                        onChange={(event) => setEndereco(event.target.value)}
                    />
                </form>
            </div>
        </div>
    )
}

