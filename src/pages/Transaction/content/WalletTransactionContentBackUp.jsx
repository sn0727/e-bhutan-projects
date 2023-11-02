import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
// import axios from 'axios';
import { ApiUrl, APIRequest } from '../../../utils/api';
import Loader from '../../../components/Feature/Loader';

// select dropdown
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import jwtDecode from 'jwt-decode';
// select dropdown

export default function WalletTransactionContent() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setisLoading] = useState(true);
  const [transaction, setTransaction] = useState([]);
  const [count, setCount] = useState('');
  const [categorie, setCategorie] = useState('');
  const [categoriedata, setCategorieData] = useState([]);

  // get user data from token 
  const token = localStorage.getItem("token")
  const decodeToken = jwtDecode(token);
  const userId = decodeToken.user.id;

  console.log(transaction, "transaction")

  // i am call api from server not use
  const SendRequestCategorie = async () => {
    setisLoading(true)
    let config = {
      url: `${ApiUrl.walletTransferGetAll}/${1}`,
      method: 'get',
    };
    APIRequest(
      config,
      res => {
        // console.log(res.data);
        setCategorieData(res.data)
        setisLoading(false)
      },
      err => {
        console.log(err);
        setisLoading(false)
      }
    );
  }

  // i am call api from server
  const SendRequest = async () => {
    setisLoading(true)
    let config = {
      url: `${ApiUrl.walletTransferGetAll}/${page}`,
      method: 'get',
    };
    APIRequest(
      config,
      res => {
        // console.log(res);
        setCount(res?.count);
        setTransaction(res?.data)
        // res?.data.map((items) => {
        //   setTransaction(items)
        // })

        setisLoading(false)
      },
      err => {
        console.log(err);
        setisLoading(false)
      }
    );
  }

  const columns = [
    { id: 'id', label: 'Id', minWidth: 50 },
    { id: 'senderId', label: 'Sender Id', minWidth: 100, align: 'center' },
    { id: 'senderNo', label: 'Sender No', minWidth: 70, align: 'center' },
    {
      id: 'senderName',
      label: 'Sender Name',
      minWidth: 120,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'receiverId',
      label: 'Receiver Id',
      minWidth: 100,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'receiverNo',
      label: 'Receiver No',
      minWidth: 150,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'receiverName',
      label: 'Receiver Name',
      minWidth: 200,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 150,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'amount',
      label: 'Amount',
      minWidth: 100,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'modifiedCreatedAt',
      label: 'Date',
      minWidth: 100,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ];


  // select value get
  // const handleChange = (event) => {
  //   setCategorie(event.target.value);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  useEffect(() => {
    SendRequest();
    // SendRequestCategorie();
  }, [])
  useEffect(() => {
    SendRequest();
  }, [page, categorie])

  return (

    <section className='transaction-table'>

      <div className="comman-container px-4">
        {/* <Box >
          <FormControl sx={{ m: 1, minWidth: 160 }} size="small">
            <InputLabel id="demo-simple-select-label">Categorie</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categorie}
              label="categorie"
              onChange={handleChange}

            >
              {
                categoriedata.map((items) => (
                  <MenuItem value={items.type}>{items.type}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Box> */}
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: '100%' }}>
            <h3 className='text-left mb-4'>Wallet Transaction.</h3>
            {
              transaction.length > 0 ?

                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns?.map((column) => (
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
                    {
                      transaction?.map((row) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns?.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                          </TableRow>
                        );
                      })
                    }
                  </TableBody>
                </Table> : <span className='not-found-dd'>Data Not Found.</span>
            }

          </TableContainer>

          {transaction.length > 0 ?
            <TablePagination
              rowsPerPageOptions={[10, 25, 30]}
              component="div"
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> : null}
        </Paper>
      </div>
      <Loader isLoading={isLoading} />
    </section>

  );
}