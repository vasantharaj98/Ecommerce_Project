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
import {  updatebanner } from '../../slices/banner';
import EditIcon from "@mui/icons-material/Edit";

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

export default function Editbanner({setLoader, editData}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [file, setFile] = React.useState(null);

  const dispatch = useDispatch();

  const [formdata, setFormdata] = React.useState({
    attribute:"",
    image: null
  });

  React.useEffect(()=>{
    if(editData){
      setFormdata(editData);
      setFile(editData?.image);
    }
}, [editData])

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    const c_id = editData.id
    const paydata = new FormData();
    paydata.append("attribute", formdata.attribute)
    paydata.append("image", file)
    dispatch(updatebanner({c_id, paydata}))
    .unwrap()
    .then(() => {
      setLoader(false);
      setOpen(false)
    })
    .catch(()=>{
      setLoader(false);
    })
  };



  return (
    <div>
 <Button
                                        onClick={handleOpen}
                                          sx={{
                                            background: "#3d07dc",
                                            marginRight: 2,
                                            height: '40px',
                                            width:'40px',
                                            minWidth: 0
                                          }}
                                        >
                                          <EditIcon
                                            sx={{ color: "#fff", fontSize: 17 }}
                                          ></EditIcon>
                                        </Button> 
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
            Edit Banner
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