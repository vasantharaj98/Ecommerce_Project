import React, { useEffect } from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';
import CustomTable from '../../components/table/SubCategoryTable';
import Addsubcategory from './Addsubcategory';
import { useDispatch, useSelector } from 'react-redux';
import { getsubcategory } from '../../slices/subcategory';
import Toast from '../../components/toast/Toast';

const columns = [
  { id: 'id', label: 'S.No', minWidth: 150, align:'start' },
  { id: 'category_name', label: 'Category', minWidth: 150, align:'start' },
  { id: 'name', label: 'Subcategory', minWidth: 150, align:'start' },
  { id: 'image', label: 'Image', minWidth: 150, align:'center' },
  { id: 'action', label: 'Action', minWidth: 100, align:'center', actionType: [{edit: true, delete: true}] },
];

const Subcategory = ({setLoader}) => {

  
  const {subcategory} = useSelector((state) => state.subcategory);

  const modData = subcategory?.map((va) => {
    return{
      ...va, 
      category_name: va?.category?.name
    }
  })

  const dispatch = useDispatch();

  useEffect(()=>{
    setLoader(true)
    dispatch(getsubcategory())
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
          <Typography variant='h6'>Manage Subcategory</Typography>
          </Grid>
          <Grid item xs={6} sx={{textAlign: 'end', paddingTop: 0}}>
            <Addsubcategory  setLoader={setLoader}/>
          </Grid>
          </Grid>
        </Box>
         <Box>
           <CustomTable setLoader={setLoader} columns={columns}  rows={subcategory.length > 0 ? modData : []} />
         </Box>
         <Toast/>
    </div>
  );
}

export default Subcategory;