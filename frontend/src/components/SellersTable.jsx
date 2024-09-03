import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, CircularProgress } from '@mui/material';
import { blockSellers, showSellers } from '../services/user'; // Import blockCustomer

function SellersTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data when component mounts
    const fetchData = async () => {
      try {
        const sellersData = await showSellers(); // Call showCustomers function
        setData(sellersData); // Update state with fetched data
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Trigger data fetch
  }, []);

  const handleBlock = async (index) => {
    const userToBlock = data[index];

    try {
      await blockSellers(userToBlock.id); // Call blockCustomer function with user ID

      // Update the user's isBlocked status in the state
      setData(prevData =>
        prevData.map((user, i) =>
          i === index ? { ...user, Blocked: true } : user
        )
      );
    } catch (error) {
      console.error('Error blocking user:', error);
      setError(error);
    }
  };

  const columns = [
    { name: 'id', label: 'ID' },
    { name: 'firstName', label: 'First Name' },
    { name: 'lastName', label: 'Last Name' },
    { name: 'phoneNumber', label: 'Phone Number' },
    { name: 'email', label: 'Email' },
    { name: 'dob', label: 'Birthdate' },
    { name: 'bussinessName', label: 'Bussiness Name' },
    { name: 'taxId', label: 'Tax ID' },
    { name: 'isBlocked', label: 'Is Blocked' },
    {
      name: 'block',
      label: 'Action',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => (
          <Button
            onClick={() => handleBlock(tableMeta.rowIndex)}
            variant="contained"
            color="warning" // Use a color that signifies blocking
          >
            Block
          </Button>
        ),
      },
    }
  ];

  const theme = createTheme();

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <MUIDataTable
        title={"Sellers Information"}
        data={data}
        columns={columns}
        options={{
          filterType: 'checkbox',
          responsive: 'standard',
        }}
      />
    </ThemeProvider>
  );
}

export default SellersTable;