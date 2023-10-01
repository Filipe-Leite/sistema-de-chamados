import { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiPlusCircle } from 'react-icons/fi'

import { AuthContext } from '../../contexts/auth';
import { db } from '../../services/firebaseConnection';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';

import './new.css';

const listRef = collection(db, "customers");

export default function New(){
    const { user } = useContext(AuthContext);

    const [customers, setCustomers] = useState<object[]>([]);
    const [loadCustomer, setLoadCustomer] = useState(true);
    const [customerSelected, setCustomerSelected] = useState(0);

    const [complemento, setComplemento] = useState('');
    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto')

    useEffect(() => {
        async function loadCustomers(){
            const querySnapshot = await getDocs(listRef)
            .then((snapshot) => {
                let lista: Array<object> = [];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        nomeFantasia: doc.data().nomeFantasia
                    })
                })
                
                if(snapshot.docs.length === 0){
                    console.log("NENHUMA EMPRESA ENCONTRA")
                    setCustomers([ { id:'1', nomeFantasia: 'FREELA'} ])
                    setLoadCustomer(false);
                    return;
                }

                setCustomers(lista);
                setLoadCustomer(false)
            })
            .catch((error) => {
                console.log("ERRO AO BUSCAR OS CLIENTES", error)
                setLoadCustomer(false)
                setCustomers([ { id: "1", nome: "FREELA" } ])
            })
        }

        loadCustomers();
    }, [])

    function handleOptionChange(event: any){
        setStatus(event.target.value);
    }

    function handleChangeSelect(event: any){
        setAssunto(event.target.value)
    }

    function handleChangeCustomer(event: any){
        setCustomerSelected(event.target.value)
    }

    return(
        <div>
            <Header/>
            
            <div className='content'>
                <Title name='Novo chamado'>
                    <FiPlusCircle size={25}/>
                </Title>

                <div className='container'>
                    <form className="form-profile">
                        
                        <label>Clientes</label>
                        {
                            loadCustomer ? (
                                <input type="text" disabled={true} value="Carregando..."></input>
                            ) : (
                                <select value={customerSelected} onChange={handleChangeCustomer}>
                                    {customers.map((item: any, index) => {
                                        return(
                                            <option key={index} value={index}>
                                                {item.nomeFantasia}
                                            </option>
                                        )
                                    })}
                                </select>
                            )
                        }

                        <label>Assuntos</label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option value="Suporte">Suporte</option>
                            <option value="Visita Tecnica">Visita Tecnica</option>
                            <option value="Financeiro">Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className='status'>
                            <input
                             type='radio'
                             name='radio'
                             value='Aberto'
                             onChange={handleOptionChange}
                             checked={status === 'Aberto'}
                            />
                            <span>Em Aberto</span>

                            <input
                             type="radio"
                             name="radio"
                             value="Progresso"
                             onChange={handleOptionChange}
                             checked={status === 'Progresso'}
                            />
                            <span>Progresso</span>

                            <input
                             type="radio"
                             name="radio"
                             value="Atendido"
                             onChange={handleOptionChange}
                             checked={status === 'Atendido'}
                            />
                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea
                          placeholder='Descreva seu problema (opcional).'
                          value={complemento}
                          onChange={ (event) => setComplemento(event.target.value)}
                         />

                        <button type='submit'>Registrar</button>
                    </form>
                </div>

            </div>
        </div>
    )
}