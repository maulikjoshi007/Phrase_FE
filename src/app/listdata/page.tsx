"use client";

import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, ListItemText, Paper, TableContainer, InputBase, IconButton, TableFooter, TablePagination, Icon, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { datalist } from './modal'; // Importing the datalist interface
import './table.scss'; // Importing custom styles for the table
import SearchIcon from '@mui/icons-material/Search'; // Importing the search icon
import { useRouter } from 'next/navigation'; // For navigation between pages
import IconRenderer from '../icon/icon'; // Custom icon component for sorting icons

const Listpage: React.FC<datalist> = ({ uuid }) => {
  // const [query, setQuery] = useState(''); // State to hold the search query
  const [phrases, setPhrases] = useState<datalist[]>([]); // State to hold the fetched phrases
  const [filter, setFilter] = useState<any>(); // State to hold the search filter
  const [orderBy, setOrderBy] = useState<any>(null); // State to hold the column currently being sorted
  const [order, setOrder] = useState<any>(); // State to hold the sort direction (asc/desc)
  const router = useRouter(); // For navigating between pages
  const [page, setPage] = useState(0); // State to track the current page number
  const [rowsPerPage, setRowsPerPage] = useState(2); // State to limit the number of phrases displayed per page
  const [totalPhrases, setTotalPhrases] = useState(0); // State to store the total number of phrases for pagination
  const [selectedStatus, setSelectedStatus] = useState<any>()

  // Effect to fetch phrases whenever filter, page, rowsPerPage, order, or orderBy changes
  useEffect(() => {
    getphrases();
  }, [filter, page, rowsPerPage, order, orderBy, selectedStatus]);

  // Function to handle sorting when a column header is clicked
  const handleSort = (columnName: string) => {
    const sortingOptions = ["asc", "desc", null]; // Possible sorting options: ascending, descending, no sorting

    // If the column is already sorted, cycle through the sorting options
    if (orderBy === columnName) {
      const currentIndex = sortingOptions.indexOf(order); // Get the current sorting index
      const nextIndex = (currentIndex + 1) % sortingOptions.length; // Cycle to the next sorting option
      const nextOrder = sortingOptions[nextIndex];

      // If the next order is null, clear sorting
      if (nextOrder === null) {
        setOrderBy(null);
        setOrder(null);
      } else {
        setOrder(nextOrder); // Set the new sort order
      }
    } else {
      // If sorting a new column, start with ascending order
      setOrderBy(columnName);
      setOrder("asc");
    }
  };

  // Function to fetch phrases from the API
  const getphrases = async () => {
    let url = `${process.env.NEXT_PUBLIC_BASE_URL_API}/phrase`; // Base URL for fetching phrases

    // If a filter exists, switch to the search endpoint
    if (filter) {
      url += `/search?query=${filter}&page=${page + 1}&limit=${rowsPerPage}`;
    } else {
      // Otherwise, fetch all phrases with pagination
      url += `/get-all-phrase?page=${page + 1}&limit=${rowsPerPage}`;
    }

    // Append sorting parameters if available
    if (order && orderBy) {
      url += `&order=${order}&sort=${orderBy}`;
    }
    if (selectedStatus) {
      url += `&status=${selectedStatus}`;
    }

    try {
      const res = await fetch(url); // Fetch phrases from the API
      const data = await res.json(); // Parse JSON response
      setPhrases(data.data); // Set fetched phrases in state
      setTotalPhrases(data.totalRows); // Set total phrases for pagination
    } catch (error) {
      console.error("Error fetching data:", error); // Handle error if API call fails
    }
  };

  // Function to format date in DD/MM/YYYY format
  const formatDate = (inputDate: any) => {
    const date = new Date(inputDate); // Convert the string to a Date object
    const day = String(date.getDate()).padStart(2, "0"); // Get the day of the month
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (0-indexed)
    const year = date.getFullYear(); // Get the full year
    return `${day}/${month}/${year}`; // Return the formatted date
  };

  // Function to handle input in the search box
  const handleFilterInput = (event: any) => {
    const inputValue = event.target.value; // Get the value from the input field
    if (inputValue.length > 2) {
      setFilter(inputValue); // Set filter if input length is greater than 2
    } else {
      setFilter(null); // Clear filter if input length is too short
    }
  };

  // Handle page change when navigating between pages
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage); // Update the current page
  };

  // Handle change in rows per page (pagination)
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // Update rows per page
    setPage(0); // Reset to first page when rows per page change
  };

  const handleStatusChange = (event: any) => {
    const status = event.target.value
    setSelectedStatus(status); // Update selected status
  };

  const toCamelCase = (status: string): string => {
    return status
      .toLowerCase() // Convert the entire string to lower case
      .split(' ') // Split the string into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(''); // Join the words together
  };

  return (
    <div>
      <div className='phrase-title'>
        {/* Page title */}
        <Typography variant="h4" gutterBottom>
          Phrase Details
        </Typography>

        {/* Search input section */}
        <div className="top-section">
          {/* Dropdown to select the language for translation */}
          <div>
            <FormControl variant="outlined" className='dropdown-box'>
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedStatus || ""} // Use empty string if selectedStatus is null
                onChange={(e: any) => {
                  handleStatusChange(e);
                  setPage(0); // Reset page on status change
                  getphrases(); // Re-fetch data based on the new status
                }}
                label="Status"
                style={{ height: 46 }}
              >
                <MenuItem value="ACTIVE">Active</MenuItem>
                <MenuItem value="PENDING">Pending</MenuItem>
                <MenuItem value="SPAM">Spam</MenuItem>
                <MenuItem value="DELETED">Deleted</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="search-box">
            <IconButton type="button" aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              className="custom-input"
              placeholder="Search by phrase"
              inputProps={{ "aria-label": "Search by phrase.." }} // Accessibility label
              onChange={handleFilterInput} // Handle changes in the search input
            />
          </div>
        </div>

        {/* Table section */}
        <Paper className="table-section">
          <TableContainer className="table-container">
            <Table className="table" stickyHeader>
              <TableHead className="table-head">
                <TableRow className="table-tr">
                  <TableCell className="table-th">
                    <ListItemText className="item-title">Phrase
                      {/* Icon button to trigger sorting by phrase */}
                      <IconButton onClick={() => handleSort("phrase")}>
                        <IconRenderer
                          name={orderBy === "phrase" ? (order === "asc" ? "table-sorting-asc" : "table-sorting-desc") : "table-sorting"}
                        />
                      </IconButton>
                    </ListItemText>
                  </TableCell>
                  <TableCell className="table-th">
                    <ListItemText className="item-title">Status</ListItemText>
                  </TableCell>
                  <TableCell className="table-th">
                    <ListItemText className="item-title">Updated date
                      {/* Icon button to trigger sorting by updated date */}
                      <IconButton onClick={() => handleSort("updated_at")}>
                        <IconRenderer
                          name={orderBy === "updated_at" ? (order === "asc" ? "table-sorting-asc" : "table-sorting-desc") : "table-sorting"}
                        />
                      </IconButton>
                    </ListItemText>
                  </TableCell>
                  <TableCell className="table-th">
                    <ListItemText className="item-title"></ListItemText>
                  </TableCell>
                </TableRow>
              </TableHead>

              {/* Table body to display phrases */}
              <TableBody>
                {phrases.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No data found
                    </TableCell>
                  </TableRow>
                ) : (
                  phrases.map((data) => {
                    return (
                      <TableRow key={data.uuid}>
                        <TableCell>{data.phrase}</TableCell>
                        <TableCell>{toCamelCase(data.status)}</TableCell>
                        <TableCell>{formatDate(data.updated_at)}</TableCell>
                        <TableCell >
                          {/* Button to navigate to phrase details */}
                          <Button
                            sx={{
                              color: 'black',
                              border: '1px solid black',
                              borderRadius: '8px',
                              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                            }}
                            onClick={() => router.push(`/phrase-details?id=${data.uuid}`)}>
                            {/* View Details */}
                            Translate
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>

              {/* Table footer with pagination */}
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[2, 5]} // Options for rows per page
                    colSpan={5}
                    count={totalPhrases} // Total number of phrases
                    rowsPerPage={rowsPerPage} // Rows per page state
                    page={page} // Current page state
                    onPageChange={handleChangePage} // Handle page change
                    onRowsPerPageChange={handleChangeRowsPerPage} // Handle rows per page change
                    labelRowsPerPage="Phrases per page:" // Label for rows per page selector
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
};

export default Listpage;
