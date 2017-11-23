import React, { Component } from 'react'
import axios from 'axios'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/theme/monokai'
import './App.css'

import LoadingIndicator from './components/LoadingIndicator'

class App extends Component {
  state = {
    code: localStorage.getItem('code') || '// Your code here...',
    results: '',
    doEval: false,
    testCode:
      localStorage.getItem('testCode') ||
      '// Your test code here...\n\n// Example: Test.assertEquals("a b".split(" ").length, 2)'
  }
  componentDidMount () {
    document.addEventListener('keydown', this.keydownHandler)
  }
  evalCode = async () => {
    console.log('eval...')
    const sterilCode = this.state.code.replace(/"/g, "'")
    const sterilTestCode = this.state.testCode.replace(/"/g, "'")
    localStorage.setItem('code', sterilCode)
    localStorage.setItem('testCode', sterilTestCode)
    this.setState({
      doEval: true
    })
    try {
      const { data } = await axios.post('http://localhost:6543/eva', {
        code: sterilCode,
        testCode: sterilTestCode
      })
      this.setState({
        results: data.result,
        code: sterilCode,
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
  onTestCaseChange = newValue => {
    this.setState({
      testCode: newValue
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
            height='380px'
            width='600px'
            fontSize='16px'
          />
          <hr />
          <AceEditor
            mode='javascript'
            theme='monokai'
            onChange={this.onTestCaseChange}
            name='testCode'
            editorProps={{ $blockScrolling: true }}
            value={this.state.testCode}
            height='200px'
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
          {this.state.doEval && <LoadingIndicator title='Evaluating...' />}
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
