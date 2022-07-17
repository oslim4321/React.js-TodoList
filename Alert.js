import React, { useEffect } from 'react'

function Alert({ msg, type, remove }) {
    useEffect(() => {
      let timeout=setTimeout(() => {
        remove()
      }, 2000);
        return () => clearTimeout(timeout)
    }, [remove])
  return (
      <div className='alert'>
          <div className={`${type}`}>{msg}</div>
      </div>
  )
}

export default Alert