import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import {Box, Button } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import Updatecategory from '../../pages/category/Updatecategory';
import { deletecategory } from '../../slices/category';
import { useDispatch } from "react-redux";

export default function CustomTable({columns, rows, setLoader}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const dispatch = useDispatch()

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (id) => {
    setLoader(true);
    const c_id = id
    dispatch(deletecategory({c_id}))
    .then(() => {
      setLoader(false);
    })
    .catch(()=>{
      setLoader(false);
    })
  }


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden'}}>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <>
                        {
                          column.id === "image" ?
                          <TableCell key={column.id} align={column.align}>
                               <img src={value} width={50} alt='category_img'></img>
                        </TableCell>
                        :
                        <TableCell key={column.id} align={column.align}>
                          {value}
                            {column.id === "action" && 
                                    column.actionType.map((a)=>{
                                        return (
                                            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    {a.edit && 
                                      <Updatecategory setLoader={setLoader} editData={row}/>}
                                     {a.delete && (
                                      <Link
                                      >
                                        <Button
                                          sx={{
                                            background: "#dc0707",
                                            marginRight: 2,
                                            height: '40px',
                                            width:'40px',
                                            minWidth: 0
                                          }}
                                          onClick={() => handleDelete(row.id)}
                                        >
                                          <DeleteIcon
                                            sx={{ color: "#fff", fontSize: 17 }}
                                          ></DeleteIcon>
                                        </Button>
                                      </Link>
                                    )}
                                    </Box>
                                        )
                                    })
                            }
                            {column.id === "image" && 
                               <img src={value}></img>
                            }
                        </TableCell>
                        }
                        </>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}