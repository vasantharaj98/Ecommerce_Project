import React, { useEffect } from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';
import CustomTable from '../../components/table/ProductTable';
import { useDispatch, useSelector } from 'react-redux';
import Addproduct from './Addproduct';
import { getproduct } from '../../slices/product';
import Toast from '../../components/toast/Toast';

const columns = [
  { id: 'id', label: 'S.No', minWidth: 150, align:'start' },
  { id: 'image', label: 'Image', minWidth: 150, align:'start' },
  { id: 'name', label: 'Product Name', minWidth: 150, align:'start' },
  { id: 'stock', label: 'Total Stock', minWidth: 150, align:'start' },
  { id: 'price', label: 'Selling Price', minWidth: 150, align:'start' },
  // { id: 'active', label: 'Status', minWidth: 150, align:'center' },
  { id: 'action', label: 'Action', minWidth: 100, align:'center', actionType: [{edit: true, delete: true}] },
];

const Product = ({setLoader}) => {

  
  const {product} = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(()=>{
    setLoader(true)
    dispatch(getproduct())
      .then(() => {
        setLoader(false);
      })
      .catch(()=>{
        setLoader(false);
      })
  }, [])

  return (
    <div className="content">
        <Box>
        <Grid container spacing={2} sx={{ paddingBottom: 2, alignItems:'center' }}>
          <Grid item xs={6} sx={{paddingTop: 0}}>
          <Typography variant='h6'>Product List</Typography>
          </Grid>
          <Grid item xs={6} sx={{textAlign: 'end', paddingTop: 0}}>
            <Addproduct  setLoader={setLoader}/>
          </Grid>
          </Grid>
        </Box>
         <Box>
           <CustomTable setLoader={setLoader} columns={columns}  rows={product.length > 0 ? product : []} />
         </Box>
         <Toast/>
    </div>
  );
}

export default Product;