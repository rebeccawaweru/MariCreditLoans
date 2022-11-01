import {Box,Typography,Modal,Button} from '@mui/material'
import {FcHighPriority} from 'react-icons/fc'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CustomModal({open,handleDelete,handleClose,subject,title,color}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className='flex space-x-2'>
          <FcHighPriority className='text-2xl'/>
          <p>Confirm</p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           Are you sure you want to  {subject}?
          </Typography>
          <div className='grid grid-cols-2 space-x-2 mt-2'>
           <Button color={color} variant='contained' onClick={handleDelete}>{title}</Button> 
           <Button color='primary' variant='contained' onClick={handleClose}>Cancel</Button> 
          </div>
        </Box>
      </Modal>
    </div>
  );
}
