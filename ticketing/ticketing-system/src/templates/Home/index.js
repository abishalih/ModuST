import 'semantic-ui-css/semantic.min.css'
import React, { Component } from 'react'
import {
  Container,
} from '../../components'
import {
  Message,
} from 'semantic-ui-react'

const listFeature = [
  'User can create ticket to request new item, service and support',
]

const MessageWelcome = () => {
  return(
    <Message 
      header={'Welcome to Ticketing System'}
      list={listFeature} 
    />
  )
}

export default class Home extends Component {
    componentDidMount(){
      document.title = "Home | Ticketing System"
    }
    
    render() {
        return (
            <div>
              <Container 
                contents={
                  <div>
                    <MessageWelcome />
                  </div>
                } 
              />
            </div>
        )
    }
}   