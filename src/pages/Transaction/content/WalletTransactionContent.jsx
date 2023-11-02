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
import { ApiUrl, APIRequest, transactionByType } from '../../../utils/api';
import Loader from '../../../components/Feature/Loader';

// select dropdown
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
// select dropdown

export default function WalletTransactionContent() {
  const [page, setPage] = useState(0);
  const [page1, setPage1] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setisLoading] = useState(true);
  const [transaction, setTransaction] = useState([]);
  const [count, setCount] = useState('');
  const [isReceived, setIsReceived] = useState('');


  // get user data from token 
  const token = localStorage.getItem("token")
  const decodeToken = jwtDecode(token);
  const userId = decodeToken.user.id;

  // console.log(isReceived, "transaction")

  // i am call api from server not use
  const SendRequestWalletTransaction = async () => {
    setisLoading(true)
    let config = {
      url: `${ApiUrl.walletTransactionByType}`,
      method: 'post',
      body: {
        page: page1,
        type: isReceived ? isReceived === 'Sent' ? 'Send' : isReceived : "All"
      }
    };
    APIRequest(
      config,
      res => {
        console.log(res?.data, "send data");
        setCount(res?.count);
        setTransaction(res?.data)
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
      minWidth: 150,
      align: 'center',
      // format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'receiverId',
      label: 'Receiver Id',
      minWidth: 130,
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
      minWidth: 150,
      align: 'center',
      // format: (value) => value.toFixed(2),
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
  const handleChange = (event) => {
    setIsReceived(event.target.value);
  };

  // get new page value
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setPage1(newPage + 1);
  };

  useEffect(() => {
    setPage(0)
    setPage1(1)
    SendRequestWalletTransaction();
  }, [isReceived]);

  useEffect(() => {
    SendRequestWalletTransaction();
  }, [page1]);





  return (

    <section className='transaction-table'>

      <div className="comman-container px-4">
        <Box >
          <FormControl sx={{ m: 1, minWidth: 160 }} size="small">
            <InputLabel id="demo-simple-select-label">Types</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={isReceived}
              label="categorie"
              onChange={handleChange}

            >
              {
                transactionByType.map((items) => (
                  <MenuItem value={items}>{items}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Box>
        <Paper sx={{ width: '100%', overflow: 'hidden' }} className='tttttt'>
          <div className='p-5'>
            <TableContainer sx={{ maxHeight: '100%' }}>
              <h3 className='text-left mb-4'>Wallet Transaction</h3>
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
                              <TableCell className='text-center'>
                                {row.id}
                              </TableCell>
                              <TableCell style={{ textAlign: 'center' }}>
                                {row.senderId}
                              </TableCell>
                              <TableCell style={{ textAlign: 'center' }}>
                                {row.senderNo}
                              </TableCell>
                              <TableCell style={{ textAlign: 'center' }}>
                                {row.senderName}
                              </TableCell>
                              <TableCell style={{ textAlign: 'center' }}>
                                {row.receiverId}
                              </TableCell>
                              <TableCell style={{ textAlign: 'center' }}>
                                {row.receiverNo}
                              </TableCell>
                              <TableCell style={{ textAlign: 'center' }}>
                                {row.receiverName}
                              </TableCell>
                              <TableCell style={{ textAlign: 'center' }}>
                                {userId === parseInt(row.senderId) ? "Send" : "Received"}
                              </TableCell>
                              <TableCell style={{ textAlign: 'center' }}>
                                {row.amount}
                              </TableCell>
                              <TableCell className='text-break'>
                                {moment(row.modifiedCreatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                              </TableCell>
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
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
              /> : null}
          </div>
        </Paper>
      </div>
      <Loader isLoading={isLoading} />
    </section>

  );
}