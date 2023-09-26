import { useContext, useState } from 'react';
import './signup.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

export default function SignUp(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const {signUp, loadingAuth }  = useContext(AuthContext);

    function handleSubmit(event: any){
        event.preventDefault();

        if (name != '' && email != '' && password != '' ){
            signUp(email,password,name);
        }
    }

    return(
        <div className='container-center'>
            <div className='register'>
                <div className='register-area'>
                    <img src={logo} alt='logo do sistema de chamados'></img>
                </div>
                <form onSubmit={handleSubmit}>
                    <h1>Nova Conta</h1>
                    <input
                      type="text"
                      placeholder='Nome'
                      value={name}
                      onChange={(e) => setName(e.target.value)}>
                    </input>

                    <input
                      type="text"
                      placeholder='exemple@email.com'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}>
                    </input>

                    <input
                      type="text"
                      placeholder='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}>
                    </input>
                    <button type='submit'>
                        {loadingAuth ? 'Carregando...' : 'Cadastrar'}
                    </button>
                </form>

                <Link to="/register">Já possui uma conta? Faça login</Link>
            </div>
        </div>
    )
}