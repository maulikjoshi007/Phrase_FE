"use client"

import React, { useEffect } from 'react'
import { useState } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Container, Typography, ListItemText, Paper, TableContainer, InputBase, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { datalist } from './modal';
import './table.scss'
import SearchIcon from '@mui/icons-material/Search';

const Listpage = () => {
  const [query, setQuery] = useState('');
  const [phrases, setPhrases] = useState<datalist[]>([]);
  const [filter, setFilter] = useState<any>();
  const [status, setStatus] = useState('')
  useEffect(() => {
    searchPhrases()
    // datalist
  }, [])

  const datalist = {
    id: 1,
    phrase: "Hi, I’m a phrase",
    status: "active",
    createdAt: "2024-05-23T15:58:35+00:00",
    updatedAt: "2024-05-23T15:58:35+00:00",
    translations: [
      { fr: "Salut, je suis une phrase" },
      { es: "hola soy una frase" }
    ]
  }
  const searchPhrases = async () => {
    const res = await fetch(`api-url`);
    // filter ? (params["search"] = filter) : "";

    const data = await res.json();
    setPhrases(data);
  };
  const formatDate = (inputDate: any) => {
    const date = new Date(inputDate);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleFilterInput = (event: any) => {
    const inputValue = event.target.value;
    if (inputValue.length > 2) {
      setFilter(inputValue);
    } else {
      setFilter(null);
    }
  };
  const handleStatusChange = (event: any) => {
    setStatus(event.target.value);
  };

  return (
    <div>
      <div style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Phrase Details
        </Typography>
        <div className="top-section">
          <div className="search-box">
            <IconButton type="button" aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              className="custom-input"
              placeholder="Search organization, name or email.."
              inputProps={{
                "aria-label": "Search organization, name or email..",
              }}
              onChange={handleFilterInput}
            />
          </div>
          <FormControl variant="outlined" style={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select value={status} onChange={handleStatusChange} label="Status">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="EN">English</MenuItem>
              <MenuItem value="NR">Netherland</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Paper className="table-section">
          <TableContainer className="table-container">
            <Table className="table" stickyHeader>
              <TableHead className="table-head">
                <TableRow className="table-tr">
                  <TableCell className="table-th">
                    <ListItemText className="item-title">ID</ListItemText></TableCell>
                  <TableCell className="table-th">
                    <ListItemText className="item-title">Phrase</ListItemText>
                  </TableCell>
                  <TableCell className="table-th">
                    <ListItemText className="item-title">Status</ListItemText>
                  </TableCell>
                  <TableCell className="table-th">
                    <ListItemText className="item-title">created date
                    </ListItemText>
                  </TableCell>
                  <TableCell className="table-th">
                    <ListItemText className="item-title">updated date</ListItemText>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {phrases.map((phrase) => (
              <TableRow key={phrase.id}>
                <TableCell>{phrase.id}</TableCell>
                <TableCell>{phrase.createdAt}</TableCell>
                <TableCell>{phrase.status}</TableCell>
              </TableRow>
            ))} */}
                <TableRow key={datalist.id}>
                  <TableCell>{datalist.id}</TableCell>
                  <TableCell>{datalist.phrase}</TableCell>
                  <TableCell>{datalist.status}</TableCell>
                  <TableCell>{formatDate(datalist.createdAt)}</TableCell>
                  <TableCell>{formatDate(datalist.updatedAt)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>

    </div>
  )
}

export default Listpage
