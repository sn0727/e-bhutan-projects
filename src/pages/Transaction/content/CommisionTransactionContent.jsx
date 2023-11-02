import React, { useEffect, useState } from 'react';
import moment from "moment"
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
// select dropdown

export default function CommisionTransactionContent() {
  const [page, setPage] = useState(0);
  const [page1, setPage1] = useState(1);
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setisLoading] = useState(true);
  const [transaction, setTransaction] = useState([]);
  const [count, setCount] = useState('');
  const [categorie, setCategorie] = useState('');
  const [categoriedata, setCategorieData] = useState([]);

  let rowsPerPage = 10

  console.log(transaction, "transaction ala,")

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
      url: `${ApiUrl.commissionGetAll}`,
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

  let franchiseAmount = [];

  if (transaction[0]?.franchiseAmount) {
    franchiseAmount.push(
      {
        id: 'franchiseAmount',
        label: 'Franchise Amount',
        minWidth: 100,
        align: 'center',
        format: (value) => value.toFixed(2),
      },
    )
  }

  console.log(franchiseAmount, "clusterAmount")

  const columns = [
    { id: 'id', label: 'Id', minWidth: 70 },
    { id: 'transactionId', label: 'Transaction Id', align: 'center', minWidth: 150 },
    { id: 'consumerId', label: 'Consumer Id', align: 'center', minWidth: 150 },
    {
      id: 'type',
      label: 'Type',
      minWidth: 100,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    // {
    //   id: 'image',
    //   label: 'Image',
    //   minWidth: 100,
    //   align: 'right',
    //   format: (value) => value.toLocaleString('en-US'),
    // },
    {
      id: 'adminPinCode',
      label: 'Admin Pin Code',
      minWidth: 150,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    // {
    //   id: 'date',
    //   label: 'Date',
    //   minWidth: 170,
    //   align: 'right',
    //   format: (value) => value.toFixed(2),
    // },
    {
      id: 'amount',
      label: 'Amount',
      minWidth: 100,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'clusterAmount',
      label: 'Cluster Amount',
      minWidth: 150,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'distributorAmount',
      label: 'Distributor Amount',
      minWidth: 100,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'retailerAmount',
      label: transaction[0]?.retailerAmount ? "Retailer Amount" : '',
      minWidth: 100,
      align: 'center',
      format: (value) => value.toFixed(2),
    },

    {
      id: 'adminAmount',
      label: 'Admin Amount',
      minWidth: 100,
      align: 'center',
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
          <h3 className='text-left mb-4'>Commission Transaction</h3>

          <TableContainer sx={{ maxHeight: '100%' }}>
            {
              transaction.length > 0 ?

                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ textAlign: 'center' }}>Id</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>Transaction Id</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>Operator Id</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>User Id</TableCell>
                      <TableCell className="text-center" style={{ textAlign: 'center' }}>Type</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>Pin Code</TableCell>
                      {transaction[0]['clusterAmount'] ? <TableCell style={{ textAlign: 'center' }}>Cluster Amount</TableCell> : null}
                      {transaction[0]['retailerAmount'] ? <TableCell style={{ textAlign: 'center' }}>Retailer Amount</TableCell> : null}
                      {transaction[0]['franchiseAmount'] ? <TableCell style={{ textAlign: 'center' }}>Franchise Amount</TableCell> : null}
                      {transaction[0]['distributorAmount'] ? <TableCell style={{ textAlign: 'center' }}>Distributor Amount</TableCell> : null}
                      {transaction[0]['adminAmount'] ? <TableCell style={{ textAlign: 'center' }}>Admin Amount</TableCell> : null}
                      {transaction[0]['amount'] ? <TableCell style={{ textAlign: 'center' }}>Amount</TableCell> : null}
                      <TableCell style={{ textAlign: 'right' }}>Date</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {
                      transaction?.map((row) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={1}>
                            <TableCell style={{ textAlign: 'center' }}>{row.id}</TableCell>
                            <TableCell style={{ textAlign: 'center' }}>{row.transactionId}</TableCell>
                            <TableCell style={{ textAlign: 'center' }}>{row.operatorId}</TableCell>
                            <TableCell style={{ textAlign: 'center' }}>{row.consumerId}</TableCell>
                            <TableCell style={{ textAlign: 'center' }} >{row.type}</TableCell>
                            <TableCell style={{ textAlign: 'center' }}>{row.adminPinCode}</TableCell>
                            {transaction[0]['clusterAmount'] ? <TableCell style={{ textAlign: 'center' }}>{row.clusterAmount}</TableCell> : null}
                            {transaction[0]['retailerAmount'] ? <TableCell style={{ textAlign: 'center' }}>{row.retailerAmount}</TableCell> : null}
                            {transaction[0]['franchiseAmount'] ? <TableCell style={{ textAlign: 'center' }}>{row.franchiseAmount}</TableCell> : null}
                            {transaction[0]['distributorAmount'] ? <TableCell style={{ textAlign: 'center' }}>{row.distributorAmount}</TableCell> : null}
                            {transaction[0]['adminAmount'] ? <TableCell style={{ textAlign: 'center' }}>{row.adminAmount}</TableCell> : null}
                            {transaction[0]['amount'] ? <TableCell style={{ textAlign: 'center' }}>row.amount</TableCell> : null}
                            <TableCell style={{ textAlign: 'right' }}>{moment(row.modifiedCreatedAt).utc().format("MM/DD/YYYY hh:mm a")}</TableCell>
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
        </Paper>
      </div>
      <Loader isLoading={isLoading} />
    </section>

  );
}