import React, { useEffect, useState } from 'react'
import Alert from './Alert'
import './Todo.css'
import TodoItem from './TodoItem'

function getlocalStorage() {
    let getlocal = localStorage.getItem('List')
    if (getlocal) {
        return JSON.parse(localStorage.getItem('List'))
    }else{
        return []
    }
}
function Todolist() {
    const [name, setname] = useState()
    const [List, setList] = useState(getlocalStorage())
    const [isEditing, setisEditing] = useState(false)
    const [editID, seteditID] = useState(null)
    const [alert, setalert] = useState({show:false, msg:'', type:''})
// console.log(List)
    function addTodo(e) {
        e.preventDefault()
        if (!name) {
            showAlert(true, 'input something', 'danger')
        
        } else if (name && isEditing) {
            setList(List.map(elem => {
                if (elem.id === editID) {
                    return {...elem, title: name}
                }
                return elem
            }))
            setisEditing(false)
            setname('')    
            seteditID(null)
            showAlert(true, 'edit success', 'success')
        } else {
            showAlert(true, 'Item Added', 'success')
            let newItem = { id: Math.floor(Math.random() * 200), title: name }
            setList([...List, newItem])
            setname('')
        }
    }
    function showAlert(show=false, msg='', type='') {
        setTimeout(() => {
            setalert({show,msg,type})
        }, 200);
    }
    function clearItem() {
        showAlert(true, 'Items Cleared', 'danger')
        setList('')
    }
    function splicing(id) {
        showAlert(true,'Item deleted', 'danger')
       let filtering=List.filter(elem=> elem.id !== id)
       setList(filtering)
    }
    function editItem(id) {
        setisEditing(true)
        let specific = List.find(elem => elem.id === id)
        // console.log(specific)
        seteditID(id)
        setname(specific.title)
    }
    useEffect(() => {
       localStorage.setItem('List', JSON.stringify(List))
    }, [List])
  return (
    <div>
        <div className="listcontainer">
              <div className="box">
              {alert.show && <Alert {...alert} remove={showAlert} />}
                  <h3>Groseries Bud</h3>
                  <form onSubmit={addTodo}>
                      
                    <input type="text" placeholder='Egg.s' value={name} onChange={(e)=> setname(e.target.value)} />
                    <button>{isEditing ? 'Edit':'Submit'}</button>
                  </form>
                  {
                     List.length > 0 && (
                          <>
                           <TodoItem splicing={splicing} List={List} editItem={editItem} />
                             <button onClick={clearItem} className='clearItem'>Clear Items</button>
                          </>
                     )
                  }
            </div>
        </div>
    </div>
  )
}

export default Todolist