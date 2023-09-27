import { useState, useContext } from 'react';
import './signin.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

export default function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const {signIn, loadingAuth}  = useContext(AuthContext);

    async function handleSignIn(event: any){
        event.preventDefault();
        
        if (email != '' && password != '' ){
            await signIn(email, password);
        }
    }

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt='logo do sistema de chamados'></img>
                </div>
                <form onSubmit={handleSignIn}>
                    <h1>Entrar</h1>
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
                        {loadingAuth ? "Carregando..." : "Acessar"}
                    </button>
                </form>

                <Link to="/register">Criar Uma Conta</Link>
            </div>
        </div>
    )
}