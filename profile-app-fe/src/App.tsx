import { useState } from 'react'
import axios from 'axios'
import styles from './App.module.scss'

function App() {
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [searchEmail, setSearchEmail] = useState('')

  /* useEffect(() => {
    axios.get('http://localhost:8080').then((res) => {
      if(res.data && Object.keys(res.data).length > 0){
        setName(res.data.name)
        setAge(res.data.age)
        setEmail(res.data.email)
        setIsSubmitted(true)
        setEditMode(true)
      }
    }).catch(err => console.log(err))
  }, []) */

  const reset = () => {
    setEmail("")
    setName("")
    setAge("")
    setIsSubmitted(false)
    setEditMode(false)
    setShowMessage(false)
    setMessage('')
    setSearchEmail('')
  }

  const handleGetData = async (e:any) => {
    e.preventDefault();
    import.meta.env.VITE_API_URL && axios.post(import.meta.env.VITE_API_URL, { email: searchEmail }).then((res) => {
      console.log(res.data)
      if(res.data && Object.keys(res.data).length > 0){
        setName(res.data.name)
        setAge(res.data.age)
        setEmail(res.data.email)
        setIsSubmitted(true)
        setEditMode(true)
      }else{
        setName('')
        setAge('')
        setEmail('')
        setIsSubmitted(false)
        setEditMode(false)
        setMessage('Email not found')
        setShowMessage(true)
      }
    }).catch(err => console.log(err))
  }
  
  const handleSubmitClick = async (e:any) => {
    e.preventDefault();
    const data = {
      name: name,
      age: age,
      email: email,
      editMode: editMode
    }
    try{
      const res = import.meta.env.VITE_API_URL && await axios.put(import.meta.env.VITE_API_URL, data)
      setEditMode(true) //true
      setIsSubmitted(true)
      setShowMessage(true)
      setMessage('Successfully submitted!')
      //reset()
    }catch(err:any){
      setMessage(err.response.data)
      setShowMessage(true)
      console.log(err)
    }
  }

  const handleEdit = () => {
    //setEditMode(false)
    setIsSubmitted(false)
  }

  return (
    <div className={styles.topLevelParentContainer}>
      <form onSubmit={handleSubmitClick} className={styles.formContainer}>
        <div className={styles.formInputLabelContainer}>
          <label className={styles.labelContainer}>Name</label>
          <input className={styles.inputContainer} type='text' onChange={(e) => setName(e.target.value)} value={name} disabled={isSubmitted} required/>
        </div>
        <div className={styles.formInputLabelContainer}>
          <label className={styles.labelContainer}>Age</label>
          <input className={styles.inputContainer} type='text' onChange={(e) => setAge(e.target.value)} value={age}  disabled={isSubmitted} required/>
        </div>
        <div className={styles.formInputLabelContainer}>
          <label className={styles.labelContainer}>Email</label>
          <input 
            type='email'
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            disabled={isSubmitted}
            className={styles.inputContainer} 
            //pattern=".+@example\.com"
            required
          />
        </div>
        <div className={styles.formSubmitEditContainer}>
          <input className={styles.subButton} type='submit' disabled={isSubmitted} value={'Submit'}/>
          <input className={styles.editButton} type='button' onClick={handleEdit} disabled={!editMode} value={'Edit'}/>
        </div>
      </form>

      <form onSubmit={handleGetData} className={styles.formContainer}>
        <div className={styles.fetchingRecordMessageContainer}>
          <div style={{marginBottom: "3px"}}>Already submitted the form?</div>
          <div>Enter your email below to load your data</div>  
        </div>
        <div className={styles.searchInputContainer}> 
          <input className={styles.searchContainer}  type='email' value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} required/> 
          <input className={styles.subButton} type='submit' value={"Search"} />
        </div>
      </form>

      {showMessage &&  //showMessage
      <div className={styles.messageContainer}>
        <div className={styles.errorMessageContainer}>{message}</div>
        <button className={styles.subButton} onClick={() => {
          //setShowMessage(!showMessage)
          reset()
        }}>
          Ok
        </button>
      </div>}
    </div>
  )
}

export default App
