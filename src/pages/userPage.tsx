import { useContext, useState, useCallback } from 'react'
import { UserContext } from '../contexts/UserContext'
import styles from '../styles/pages/UserPage.module.css'



const UserPage = () =>{
  const {userName} = useContext(UserContext)
  const [textInput,setTextInput] = useState('')



  return (
    <div className={styles.container}>
      <section>
        <div>
          <img src="icons/SimboloIcon.svg" alt="Simbolo"/>
        </div>
        <div>
          <img src="/Logo.svg" alt="logo"/>
          <h1>Bem Vindo</h1>
          <p><img src="icons/Github.svg" alt=""/>Faça login com seu Github para começar</p>
          <div className={styles.loginButton}>
            <input type="text" value={textInput}  onChange={(e)=> {setTextInput(e.target.value) ,console.log(textInput)}}/>
            <button type='button'><img src="icons/Vector.svg" alt=""/></button>
          </div>
          
        </div>

      </section>
    </div>
  )

}
export default UserPage