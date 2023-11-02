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

// select dropdown
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Loader from '../../../components/Feature/Loader';
import moment from 'moment';
// select dropdown

export default function TransactionContent() {
  const [page, setPage] = useState(0);
  const [page1, setPage1] = useState(1);
  const [isLoading, setisLoading] = useState(true);
  const [transaction, setTransaction] = useState([]);
  const [count, setCount] = useState('');
  const [categorie, setCategorie] = useState('');
  const [categoriedata, setCategorieData] = useState([]);

  let rowsPerPage = 10

  // console.log(categoriedata)

  // i am call api from server
  const SendRequestCategorie = async () => {
    setisLoading(true)
    let config = {
      url: `${ApiUrl.getAllType}`,
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
      url: `${ApiUrl.getAllTransaction}`,
      method: 'post',
      body: {
        page: page1,
        type: categorie
      }
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
    { id: 'id', label: 'Id', minWidth: 70 },
    { id: 'consumerId', label: 'User Id', align: 'center', minWidth: 120 },
    {
      id: 'type',
      label: 'Type',
      minWidth: 130,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'adminPinCode',
      label: 'User Pin Code',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'date',
      label: 'Date',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'invoiceNo',
      label: 'Invoice No',
      minWidth: 100,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'amount',
      label: 'Amount',
      minWidth: 100,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ];




  // select value get
  const handleChange = (event) => {
    setCategorie(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setPage1(newPage + 1);
  };

  useEffect(() => {
    SendRequest();
    SendRequestCategorie();
  }, [])
  useEffect(() => {
    SendRequest();
  }, [page, categorie])

  return (

    <section className='transaction-table'>
      <div className="comman-container px-4">
        <Box >
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

              {/* <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          </FormControl>
        </Box>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <h3 className='text-left mb-4'>All Transaction</h3>
          {columns.length > 0 ?
            <TableContainer sx={{ maxHeight: '100%' }}>
              {transaction.length > 0 ?
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
                            {columns?.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.id !== 'date' ? column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value
                                    : moment(value).format('MMMM Do YYYY, h:mm:ss a')
                                  }
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })
                    }
                  </TableBody>
                </Table> : <span className='not-found-dd'>Data Not Found.</span>
              }
            </TableContainer>
            : "Account not found"}

          {transaction.length > 0 ?
            <TablePagination
              component="div"
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
            /> : null
          }
        </Paper>
      </div>
      <Loader isLoading={isLoading} />
    </section>

  );
}