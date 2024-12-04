import React, { useEffect } from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';
import CustomTable from '../../components/table/BannerTable';
import { useDispatch, useSelector } from "react-redux";
import Toast from '../../components/toast/Toast';
import Addbanner from './Addbanner';
import { getbanner } from '../../slices/banner';

const columns = [
  { id: 'id', label: 'S.No', minWidth: 150, align:'start' },
  { id: 'image', label: 'Image', minWidth: 150, align:'start' },
  { id: 'attribute', label: 'Attribute', minWidth: 150, align:'start' },
  { id: 'action', label: 'Action', minWidth: 100, align:'center', actionType: [{edit: true, delete: true}] },
];

const Banner = ({setLoader}) => {

  const {banner} = useSelector((state) => state.banner);

  const dispatch = useDispatch();

  useEffect(()=>{
    setLoader(true)
    dispatch(getbanner())
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
            <Typography variant='h6'> Manage Banners</Typography>
          </Grid>
          <Grid item xs={6} sx={{textAlign: 'end', paddingTop: 0}}>
            <Addbanner setLoader={setLoader}/>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <CustomTable setLoader={setLoader} columns={columns} rows={banner.length > 0 ? banner : []} />
      </Box>
      <Toast/>
    </div>
  );
}

export default Banner;