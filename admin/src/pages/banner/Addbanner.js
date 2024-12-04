import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import CloudUpload from '../../components/button/Cloudupload';
import {Grid} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { createcategory } from '../../slices/category';
import { createbanner } from '../../slices/banner';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 12,
  p: 4,
};

export default function Addbanner({setLoader}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [file, setFile] = React.useState(null);

  const dispatch = useDispatch();

  const initialState = {
    attribute:"",
    image: null
  }

  const [formdata, setFormdata] = React.useState(initialState);


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    const formData = new FormData();
    formData.append("attribute", formdata.attribute)
    formData.append("image", file)
    dispatch(createbanner(formData))
    .unwrap()
    .then(() => {
      setLoader(false);
      setOpen(false);
      setFormdata(initialState);
      setFile(null);
    })
    .catch(()=>{
      setLoader(false);
    })
  };



  return (
    <div>
      <Button variant='contained' size='large' onClick={handleOpen}>Add Banner</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Grid container sx={{paddingBottom: 1}}>
                <Grid xs={6} sx={{textAlign:'start'}}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Banner
          </Typography>
                </Grid>
                <Grid xs={6} sx={{textAlign:'end'}}>
               <CloseIcon onClick={handleClose} sx={{cursor:'pointer'}}></CloseIcon>
                </Grid>
            </Grid>
            <hr></hr>
            <Box
    component="form"
    noValidate
    autoComplete="off"
    onSubmit={handleSubmit}
    >
         <TextField type='number' sx={{my: 2}} fullWidth id="outlined-basic" label="Attribute" variant="outlined"
         value={formdata.attribute}
         onChange={(e) =>
                      setFormdata({
                        ...formdata,
                        attribute: e.target.value,
                      })
                    }
          />
         <CloudUpload file={file} setFile={setFile} setLoader={setLoader} placeholder="Upload Image"/>
         <Button type='submit' size='large' sx={{marginTop: 5, width: '100%'}} variant='contained'> Submit</Button>
         </Box>
        </Box>
      </Modal>
    </div>
  );
}