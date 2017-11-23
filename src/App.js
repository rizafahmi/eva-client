import React, { Component } from 'react'
import axios from 'axios'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/theme/monokai'
import './App.css'

class App extends Component {
  state = {
    code: '',
    results: '',
    doEval: false
  }
  componentDidMount () {
    document.addEventListener('keydown', this.keydownHandler)
  }
  evalCode = async () => {
    console.log('eval...')
    this.setState({
      doEval: true
    })
    try {
      const { data } = await axios.post('http://localhost:6543/eva', {
        code: this.state.code
      })
      this.setState({
        results: data.result,
        doEval: false
      })
    } catch (error) {
      console.error(error)
      this.setState({
        doEval: false
      })
    }
  }
  keydownHandler = e => {
    if (e.keyCode === 13 && e.metaKey) {
      this.evalCode()
    }
  }
  handleCodeChange = e => {
    this.setState({
      code: e.target.value
    })
  }
  onChange = newValue => {
    this.setState({
      code: newValue
    })
  }
  render () {
    const textButton = this.state.doEval ? 'Evaluating...' : 'Evaluate now!'
    return (
      <div className='grid' style={styles.container}>
        <div className='grid__col-6' style={styles.code}>
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
          <br />
          <button
            onClick={this.evalCode}
            className='btn--default'
            disabled={this.state.doEval}
          >
            {textButton}
          </button>
        </div>
        <div className='grid__col-6' style={styles.result}>
          <textarea
            className='form__input'
            style={styles.panel}
            name='result'
            value={this.state.results}
            disabled={true}
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
    height: '100vh'
  },
  result: {
    flex: 1
  },
  panel: { width: '100%', height: '85vh' }
}

export default App
