import React from 'react';
import { useRef, useEffect } from 'react';
import './style.css';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useTheme } from '@mui/material/styles';

export default ({handleChange}) => {
  const inputReference = useRef(null);
  useEffect(() => {
    inputReference.current.focus();
  });
  const theme = useTheme();
  return (
    <div className='label-in-textarea'>
      <TextareaAutosize
        ref={inputReference}
        style={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText
        }}
        id='reply'
        className='form-control'
        aria-label="minimum height"
        minRows={3}
        placeholder="Write a message"
        required name='text'
        onKeyDown={handleChange}>
      </TextareaAutosize>
    </div >
  )
}
