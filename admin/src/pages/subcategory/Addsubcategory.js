import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import CloudUpload from '../../components/button/Cloudupload';
import {Grid} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { createsubcategory } from '../../slices/subcategory';
import { getcategory } from '../../slices/category';

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

export default function Addcategory({setLoader}) {
  const [open, setOpen] = React.useState(false);

  const {category} = useSelector((state) => state.category);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [file, setFile] = React.useState(null);

  const dispatch = useDispatch();

  const [formdata, setFormdata] = React.useState({
    category_id: "",
    name:"",
    image: null
  });

  React.useEffect(()=>{
    setLoader(true)
    dispatch(getcategory())
      .then(() => {
        setLoader(false);
      })
      .catch(()=>{
        setLoader(false);
      })
  }, [])

  const handleChange = (event) => {
    setFormdata({...formdata, category_id: event.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    const formData = new FormData();
    formData.append("category_id", formdata.category_id)
    formData.append("name", formdata.name)
    formData.append("image", file)
    dispatch(createsubcategory(formData))
    .unwrap()
    .then(() => {
      setLoader(false);
      setOpen(false);
    })
    .catch(()=>{
      setLoader(false);
    })
  };

  return (
    <div>
      <Button variant='contained' size='large' onClick={handleOpen}>Add Subcategory</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Grid container sx={{paddingBottom: 2}}>
                <Grid xs={6} sx={{textAlign:'start'}}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Subcategory
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
         <FormControl sx={{my: 2}} fullWidth>
  <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={formdata.category_id}
    label="Select Category"
    onChange={handleChange}
  >
  {(category ? category : []).map((va, index)=>{
    return(
      <MenuItem value={va.id}>{va.name}</MenuItem>
    )
  })}
  </Select>
</FormControl>
         <TextField sx={{marginBottom: 2}} fullWidth id="outlined-basic" label="Subcategory Name" variant="outlined" 
           value={formdata.name}
         onChange={(e) =>
                      setFormdata({
                        ...formdata,
                        name: e.target.value,
                      })
                    }
         />
         <CloudUpload setLoader={setLoader} file={file} setFile={setFile} placeholder="Upload Image"/>
         <Button type='submit' size='large' sx={{marginTop: 5, width: '100%'}} variant='contained'> Submit</Button>
         </Box>
        </Box>
      </Modal>
    </div>
  );
}