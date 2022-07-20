import {useState} from "react"
import {useWorkoutsContext} from "../hooks/useWorkoutsContext"
import fetch from 'isomorphic-fetch';
import {useNavigate} from "react-router-dom"
// import react from 'react'
// import axios from  'axios'
const WorkoutForm=() =>{
    const {dispatch}=useWorkoutsContext()
    const [title,setTitle]=useState('')
    const [load,setLoad]=useState('')
    const [reps,setReps]=useState('')
    const [error,setError]=useState(null)
    const [emptyFields,setEmptyFields]=useState([])
    const history=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const workout={title,load,reps}
         const response=await fetch('/api/workouts' ,{
             method:'POST',
            body:JSON.stringify(workout),
             headers:{
                 'Content-Type':'application/json'
             }
         })
         const json=await response.json()
        
         if(!response.ok){
            setError(json.error)
             setEmptyFields(json.emptyFields)
         }
         if(response.ok){
             setTitle('')
             setLoad('')
             setReps('')
            setError(null)
           setEmptyFields([])
           console.log('new workout added',json)
           dispatch({type:'WORKOUT_CREATED',payload:json}) 
           history('/')
           window.location.reload(false);
        } 
    }
      return(
        <form className="create" onSubmit={handleSubmit}>
          <h3>Add a new Workout</h3>
          <label>Exercise Title:</label>
          <input 
            type="text"
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title') ? 'error' : ''}
          />
          <label>Load (in kg):</label>
          <input 
              type="number"
              onChange={(e)=>setLoad(e.target.value)}
              value={load}
              className={emptyFields.includes('load') ? 'error' : '' }
          />
          <label>Reps:</label>
          <input 
            type="number"
            onChange={(e)=>setReps(e.target.value)}
            value={reps}
            className={emptyFields.includes('reps') ? 'error' : ''}
          />
          <button>Add Workout</button>
          {error && <div className="error">{error}</div>}
        </form>
        
      )
    
}

export default WorkoutForm