import React from 'react'

export function Message({msg, bgColor}) {
  let styles={
    padding:"1rem",
    marginBottom:"1rem",
    teaxtAlign:"center",
    backgroundColor:bgColor,
    color:"#fff",
    fontWeight:"bold",

  }

  return (
    <div style={styles}>
      <p>{msg}</p>
    </div>
  )
}
