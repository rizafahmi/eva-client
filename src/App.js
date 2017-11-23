import React, { Component } from 'react'
import axios from 'axios'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/theme/monokai'

class App extends Component {
  state = {
    code: '',
    results: ''
  }
  evalCode = async () => {
    try {
      const { data } = await axios.post('http://localhost:6543/eva', {
        code: this.state.code
      })
      this.setState({
        results: data.result
      })
    } catch (error) {
      console.error(error)
    }
  }
  handleCodeChange = e => {
    this.setState({
      code: e.target.value
    })
  }
  onChange = newValue => {
    console.log('change', newValue)
    this.setState({
      code: newValue
    })
  }
  render () {
    return (
      <div style={styles.container}>
        <div style={styles.code}>
          <AceEditor
            mode='javascript'
            theme='monokai'
            onChange={this.onChange}
            name='code'
            editorProps={{ $blockScrolling: true }}
            value={this.state.code}
            height='600px'
            width='600px'
            fontSize='16px'
          />
          <button onClick={this.evalCode}>Evaluate</button>
        </div>
        <div style={styles.result}>
          <textarea
            style={styles.panel}
            name='result'
            value={this.state.results}
          />
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row'
  },
  code: {
    flex: 1,
    backgroundColor: 'mediumaquamarine',
    height: '100vh'
  },
  result: {
    flex: 1,
    backgroundColor: '#cacaca'
  },
  panel: { background: 'transparent', width: '100%', height: '90vh' }
}

export default App
