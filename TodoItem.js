import React from 'react'

function TodoItem({ List, splicing, editItem }) {
    
  return (
      <div>
          {
              List.map(elem=>{
                let {id, title}=elem
                  return (
                    <ul key={id}>
                      <li>{title} <div><span onClick={()=>editItem(id)}>+</span><span onClick={()=>splicing(id)}>X</span></div> </li>
                     </ul>
                )
              })
          }
        
    </div>
  )
}

export default TodoItem