import React, { forwardRef } from 'react';
import './Message.css';
import Card from '@material-ui/core/Card';

const Message = forwardRef(({ message, name }, ref) => {
  const isUser = name === message.name;

  return (
    <div ref={ref} className={isUser ? 'message__user' : 'message'}>
      <p className='message__username'>
        {!isUser ? `${message.name} says:` : ''}
      </p>
      <Card className={isUser ? 'message__userCard' : 'message__card'}>
        <p>{message.input}</p>
      </Card>
    </div>
  );
});

export default Message;
