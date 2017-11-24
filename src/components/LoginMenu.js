import React from 'react'

import { auth, githubAuthProvider } from '../fire'

class LoginMenu extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      currentUser: null
    }
  }
  componentDidMount () {
    auth.onAuthStateChanged(currentUser => {
      this.setState({ currentUser })
    })
  }
  doLogin = () => {
    auth.signInWithPopup(githubAuthProvider)
  }
  render () {
    const { currentUser } = this.state
    return (
      <div className='grid'>
        <div className='grid__col-12'>
          {!currentUser && <button onClick={this.doLogin}>Login</button>}
        </div>
      </div>
    )
  }
}

export default LoginMenu
