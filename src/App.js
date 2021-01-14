import React, { useState, useEffect } from 'react';
import './App.css';
import {
  IconButton,
  Button,
  FormControl,
  Input,
  InputLabel,
} from '@material-ui/core';
import Message from './components/Message';
import db from './components/Firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

function App() {
  const [input, setInput] = useState('');
  const [name, setName] = useState('');
  const [messages, setMessages] = useState([]);

  //methode for setting the username
  useEffect(() => {
    setName(prompt('Please enter your name'));
  }, []);

  //firebase database
  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => doc.data()));
      });
  }, []);

  //methode for setting the input value
  const inputHandler = e => {
    setInput(e.target.value);
  };

  //methode for sending a message
  const sendMessage = e => {
    e.preventDefault();

    //adding messages to database
    db.collection('messages').add({
      id: Math.random() * 100000000,
      name: name,
      input: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), //creating time when message is createt and is used for sorting messages by time
    });

    // setMessages([...messages, { input: input, name: name }]);

    setInput('');
  };

  return (
    <div className='app'>
      <h1 className='app__appTitle'>Chat Message</h1>
      <div className='app__user'>
        <h4 className='app__userName'>{name}</h4>
        <FiberManualRecordIcon className='app__online' />
      </div>

      <form className='app__form'>
        <FormControl className='app__formControl'>
          <InputLabel htmlFor='my-input'>Enter a message...</InputLabel>
          <Input
            className='app__input'
            onChange={inputHandler}
            value={input}
            type='text'
          />
          <IconButton
            className='app__button'
            disabled={!input}
            onClick={sendMessage}
            type='submit'
            variant='contained'>
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <div className='app__messages'>
        <FlipMove>
          {messages.map(message => (
            <Message key={message.id} message={message} name={name} />
          ))}
        </FlipMove>
      </div>
    </div>
  );
}

export default App;
