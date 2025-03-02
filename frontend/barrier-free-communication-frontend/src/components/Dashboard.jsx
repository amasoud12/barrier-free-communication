import React from 'react'

const Dashboard = ({theme, setTheme}) => {
  const toggle_mode = ()=>{
    theme == 'light' ? setTheme('dark') : setTheme('light')
}

  return (
    <div>
      {theme == 'light' && <div style={{color: 'black'}}>Dashboard</div>}
      {theme == 'dark' && <div style={{color: 'white'}}>Dashboard</div>}
      </div>
    
  )
}

export default Dashboard