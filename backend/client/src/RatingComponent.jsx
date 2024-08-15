import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { useContext } from 'react';


function PaperComponent(props) {
  return (
    <Draggable
    handle="#draggable-dialog-title"
    cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog(props) {
  const {user} = useContext(UserContext)
    const {open, setOpen, venueId,bookingID} = props 
    const navigate = useNavigate();
  console.log('booking iddddd', bookingID)
  
  const [text, setText] = useState('')

  const [stars, setStars] = useState(4)

//   console.log('open', open)

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

  const handleClose = () => {
    setOpen(false);
  };

  async function SubmitReview(){

    const review = {
      stars: stars,
      text: text,
      venueId: venueId,
      userName: user,
      bookingID: bookingID,
  }


    try {
      const res = await axios.post('/sendReview', review);

      if (res.status === 200) {
          alert('Review Posted');
          setOpen(false);
          navigate('/ads');
      } else if(res.status== 400) {
          console.log('Review of Same booking found', res);
          alert('Review of Same booking found');
      }
  } catch (error) {
    console.log('Review of Same booking found');
    alert('Review of Same booking found');
      navigate('/ads')
  }
  }

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open draggable dialog
      </Button> */}
      <Dialog
        open={open}
        // onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Give your Review
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >

      <Rating
        name="simple-controlled"
        value={stars}
        onChange={(event, newValue) => {
          setStars(newValue);
        }}
       
      />
      </Box>
            Write about your experience
           <input value={text} onChange={(ev)=> setText(ev.target.value)} className='border border-solid border-black p-3 border-3 rounded-lg' />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={SubmitReview}>Send Review</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}