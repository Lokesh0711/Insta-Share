import React from 'react'

const ActiveTabContext = React.createContext({
  activeTab: 'Home',
  changeActive: () => {},
})

export default ActiveTabContext
