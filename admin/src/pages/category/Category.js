import React, { useEffect } from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';
import CustomTable from '../../components/table/CategoryTable';
import Addcategory from './Addcategory';
import { useDispatch, useSelector } from "react-redux";
import { getcategory } from "../../slices/category";
import Toast from '../../components/toast/Toast';

const columns = [
  { id: 'id', label: 'S.No', minWidth: 150, align:'start' },
  { id: 'image', label: 'Image', minWidth: 150, align:'start' },
  { id: 'name', label: 'Category', minWidth: 150, align:'start' },
  { id: 'action', label: 'Action', minWidth: 100, align:'center', actionType: [{edit: true, delete: true}] },
];

const Category = ({setLoader}) => {

  const {category} = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(()=>{
    setLoader(true)
    dispatch(getcategory())
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
            <Typography variant='h6'> Manage Category</Typography>
          </Grid>
          <Grid item xs={6} sx={{textAlign: 'end', paddingTop: 0}}>
            <Addcategory setLoader={setLoader}/>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <CustomTable setLoader={setLoader} columns={columns} rows={category.length > 0 ? category : []} />
      </Box>
      <Toast/>
    </div>
  );
}

export default Category;