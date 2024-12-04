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
import { getcategory } from '../../slices/category';
import { createproduct, updateproduct } from '../../slices/product';
import EditIcon from "@mui/icons-material/Edit";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  boxShadow: 12,
  p: 4,
};

export default function Editproduct({setLoader, editData}) {
  const [open, setOpen] = React.useState(false);

  const {category} = useSelector((state) => state.category);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [file, setFile] = React.useState(null);

  const dispatch = useDispatch();

  const [formdata, setFormdata] = React.useState({
      name: "",
      description: "",
      category: "",
      subcategory: "",
      unit: "",
      capacity: "",
      maxorderqty: "",
      price: "",
      stock: "",
      discounttype: "Percent",
      discount: "",
      taxtype: "Percent",
      tax: "",
      active: true,
      image: null,
      tags:[]
  });

  
  React.useEffect(()=>{
    if(editData){
      setFormdata(editData);
      setFile(editData?.image);
    }
}, [editData])

  React.useEffect(()=>{
    setLoader(true)
    dispatch(getcategory())
      .then(() => {
        setLoader(false);
        setFormdata(editData);
      })
      .catch(()=>{
        setLoader(false);
      })
  }, [])

  console.log(formdata);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    const c_id = editData.id
    const paydata = new FormData();
    paydata.append("name", formdata.name)
    paydata.append("description", formdata.description)
    paydata.append("category", formdata.category)
    paydata.append("subcategory", formdata.subcategory)
    paydata.append("unit", formdata.unit)
    paydata.append("capacity", formdata.capacity)
    paydata.append("maxorderqty", formdata.maxorderqty)
    paydata.append("price", formdata.price)
    paydata.append("stock", formdata.stock)
    paydata.append("discounttype", formdata.discounttype)
    paydata.append("discount", formdata.discount)
    paydata.append("taxtype", formdata.taxtype)
    paydata.append("tax", formdata.tax)
    paydata.append("active", formdata.active)
    paydata.append("tags", formdata.tags)
    paydata.append("image", file)
    dispatch(updateproduct({c_id, paydata}))
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
                                        </Button>      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Grid container sx={{paddingBottom: 2}}>
                <Grid xs={6} sx={{textAlign:'start'}}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Product
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
    <Grid container spacing={2}>
        <Grid item xs={6}>
        <TextField sx={{my: 2}} fullWidth id="outlined-basic" label="Product Name" variant="outlined" 
           value={formdata.name}
         onChange={(e) =>
                      setFormdata({
                        ...formdata,
                        name: e.target.value,
                      })
                    }
         />
         <TextField sx={{marginBottom: 2}} fullWidth id="outlined-basic" label="Short Description" variant="outlined" 
           value={formdata.description}
         onChange={(e) =>
                      setFormdata({
                        ...formdata,
                        description: e.target.value,
                      })
                    }
         />
                  <FormControl sx={{marginBottom: 2}} fullWidth>
  <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={formdata.category}
    label="Select Category"
    onChange={(e) =>
                      setFormdata({
                        ...formdata,
                        category: e.target.value,
                      }
                      )
                      }
  >
  {(category ? category : []).map((va, index)=>{
    return(
      <MenuItem value={va.id}>{va.name}</MenuItem>
    )
  })}
  </Select>
</FormControl>
         <FormControl sx={{marginBottom: 2}} fullWidth>
  <InputLabel id="demo-simple-select-label">Select Subcategory</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={formdata.subcategory}
    label="Select Category"
    onChange={(e) =>
                      setFormdata({
                        ...formdata,
                        subcategory: e.target.value,
                      })}
  >
  {category?.filter((ab)=> ab.id === formdata.category)[0]?.subcategories?.map((va, index)=>{
    return(
      <MenuItem key={index} value={va.id}>{va.name}</MenuItem>
    )
  })}
  </Select>
</FormControl>
<Grid container sx={{marginBottom: 2}} spacing={2}>
  <Grid item xs={4}>
  <FormControl sx={{morginBottom: 2}} fullWidth>
  <InputLabel id="demo-simple-select-label">Unit</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={formdata.unit}
    label="Unit"
    onChange={(e) =>
                      setFormdata({
                        ...formdata,
                        unit: e.target.value,
                      })}
  >
      <MenuItem value="Kg">Kg</MenuItem>
      <MenuItem value="Gm">Gm</MenuItem>
      <MenuItem value="Ltr">Ltr</MenuItem>
      <MenuItem value="Pc">Pc</MenuItem>
  </Select>
</FormControl>
  </Grid>
  <Grid item xs={4}>
  <TextField sx={{marginBottom: 2}} fullWidth id="outlined-basic" label="Capacity" variant="outlined" 
           value={formdata.capacity}
         onChange={(e) =>
                      setFormdata({
                        ...formdata,
                        capacity: e.target.value,
                      })
                    }
         />
  </Grid>
  <Grid item xs={4}>
  <TextField sx={{marginBottom: 2}} fullWidth id="outlined-basic" label="Max Order QTY" variant="outlined" 
           value={formdata.maxorderqty}
         onChange={(e) =>
                      setFormdata({
                        ...formdata,
                        maxorderqty: e.target.value,
                      })
                    }
         />
  </Grid>
</Grid>
        </Grid>
        <Grid item xs={6}>
        <TextField sx={{my: 2}} fullWidth id="outlined-basic" label="Default Unit Price" variant="outlined" 
           value={formdata.price}
         onChange={(e) =>
                      setFormdata({
                        ...formdata,
                        price: e.target.value,
                      })
                    }
         />
         <TextField sx={{marginBottom: 2}} fullWidth id="outlined-basic" label="Product Stock" variant="outlined" 
           value={formdata.stock}
         onChange={(e) =>
                      setFormdata({
                        ...formdata,
                        stock: e.target.value,
                      })
                    }
         />
         <Grid container sx={{marginBottom: 2}} spacing={2}>
  <Grid item xs={6}>
  <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Discount Type</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={formdata.discounttype}
    label="Discount Type"
    onChange={(e) =>
                      setFormdata({
                        ...formdata,
                        discounttype: e.target.value,
                      })}
  >
      <MenuItem value="Percent">Percent</MenuItem>
      <MenuItem value="Amount">Amount</MenuItem>
  </Select>
</FormControl>
  </Grid>
  <Grid item xs={6}>
  <TextField  fullWidth id="outlined-basic" label={`Discount ${formdata.discounttype === "Percent" ? "(%)" : "(₹)"}`} variant="outlined" 
           value={formdata.discount}
         onChange={(e) =>
                      setFormdata({
                        ...formdata,
                        discount: e.target.value,
                      })
                    }
         />
  </Grid>
</Grid>
         <Grid container sx={{marginBottom: 2}} spacing={2}>
  <Grid item xs={6}>
  <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Tax Type</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={formdata.taxtype}
    label="Tax Type"
    onChange={(e) =>
                      setFormdata({
                        ...formdata,
                        taxtype: e.target.value,
                      })}
  >
      <MenuItem value="Percent">Percent</MenuItem>
      <MenuItem value="Amount">Amount</MenuItem>
  </Select>
</FormControl>
  </Grid>
  <Grid item xs={6}>
  <TextField sx={{marginBottom: 2}} fullWidth id="outlined-basic" label={`Discount ${formdata.taxtype === "Percent" ? "(%)" : "(₹)"}`} variant="outlined" 
           value={formdata.tax}
         onChange={(e) =>
                      setFormdata({
                        ...formdata,
                        tax: e.target.value,
                      })
                    }
         />
  </Grid>
</Grid>
        </Grid>
    </Grid>
         <CloudUpload setLoader={setLoader} file={file} setFile={setFile} placeholder="Upload Product Image"/>
         <Button type='submit' size='large' sx={{marginTop: 5, width: '100%', py: 2}} variant='contained'> Submit</Button>
         </Box>
        </Box>
      </Modal>
    </div>
  );
}