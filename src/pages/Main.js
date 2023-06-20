import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Select,
  MenuItem,
  Box,
  ButtonBase,
  Container,
  Grid,
  Typography
} from '@mui/material';
import { setFilter, setPage, fetchLaunchesRequest, removeFilter } from '../store/actions';
import { filterData } from '../utils/utils';
import { makeStyles } from '@material-ui/core/styles';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

import LaunchTable from '../components/LaunchTable';
import PaginationComponent from "../components/Pagination"
import { remToPixels } from '../helpers/helpers';


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        minWidth:"100vw",
        // padding: theme.spacing(2),
        flexDirection:"column"
      },
      tableContainer: {
        marginBottom: theme.spacing(2),

        height:546,
        width:"100%",
        border: '1px solid #F5F5F5',
        borderRadius: 4,
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '0.4em',
          backgroundColor: '#F5F5F5',
        },
       
      },
      tableHead: {
        "& th": {
          backgroundColor: "#F5F5F5",
          fontWeight: "bold",
          fontSize:remToPixels(0.75),
          color:"#36454F"
        },
      },
      tableHeaderCell: {
        fontWeight: "bold",
        color: "white",
        
      },
      tableRow: {
        "&:nth-of-type(even)": {
          backgroundColor: "transparent",
          
        },
        cursor:"pointer"
      },
      tableCell: {
        padding: theme.spacing(1),
        fontSize:remToPixels(0.68),
        border: 'none !important', // Add this line to remove the border
    
      },
  }));
  

const Main = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const launchesSelector = (state) => state.launches.launches;
  const loadingSelector = (state) => state.loading;
  const errorSelector = (state) => state.error;
  const pageSelector = (state) => state.page;
  const limitSelector = (state) => state.limit;
  const totalCountSelector = (state) => state.launches.totalCount;
  const filterSelector = (state) => state.filter;

  // Usage in the component
  const launches = useSelector(launchesSelector);
  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);
  const page = useSelector(pageSelector);
  const limit = useSelector(limitSelector);
  const totalCount = useSelector(totalCountSelector);
  const filter = useSelector(filterSelector);

  useEffect(() => {
    dispatch(fetchLaunchesRequest(page, limit));
  }, [dispatch, page, limit]);

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  const handleRemoveFilter = () => {
    dispatch(removeFilter());
  };

  const handlePageChange = (event, newPage) => {
    dispatch(setPage(newPage));
  };

  const currentpageItem = (page - 1) * limit;

  return (
    <Container >
        {/* <Box className={classes.container}> */}
        <Grid container>
        <Grid item  xs={6}>
        <Box display="flex" justifyContent="flex-start" mb={2} flexDirection="row">
          {filter && (
            <ButtonBase onClick={handleRemoveFilter} sx={{color:"#36454F",background:"transparent","&:hover":{
                background:"transparent"
            }}}>
                <FilterAltOffIcon sx={{ marginRight: '0.5rem' ,color:"#36454F"}} />
              <Typography   sx={{ fontWeight: 'bold', fontSize: remToPixels(0.75),color:"#36454F",textTransform:"none" }}>
                
                Remove Filter
              </Typography>
            </ButtonBase>
          )}
        </Box>
      </Grid>
      <Grid item  xs={6}>
        <Box mb={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <FilterAltIcon sx={{ marginRight: '0.5rem',color:"#36454F" }} />
          <Select
  value={filter || 'All Launches'}
  onChange={handleFilterChange}
  variant="standard"
  outlined="true"
  disableUnderline ={true}
  sx={{
    fontSize: remToPixels(0.75),
    fontWeight: 'bold',
    color:"#36454F",
    '& .MuiSelect-standard': {
        background: 'transparent',
        "&:focus": {
            backgroundColor: "transparent"
        }
      }
  }}
  MenuProps={{
    PaperProps: {
      sx: {
        bgcolor: 'tranparent',
        color:"black",
        '& .MuiMenuItem-root': {
          padding: 1,
          fontSize:remToPixels(0.77),
        fontWeight:"600",
        color:"#36454F"
        },
      },
    },
  }}
  
>
  {filterData.map((item) => (
    <MenuItem key={item.id} value={item.name} >
      {item.name}
    </MenuItem>
  ))}
</Select>

        </Box>
      </Grid>
      
    </Grid>
      <Box>
      <LaunchTable
        loading={loading}
        error={error}
        launches={launches}
        currentpageItem={currentpageItem}
        handlePageChange={handlePageChange}
        page={page}
        totalCount={totalCount}
        limit={limit}
        classes={classes}
      />
      </Box>
      <Box>
        <PaginationComponent
        handlePageChange={handlePageChange}
        page={page}
        limit={limit}
        totalCount={totalCount}
        />
      </Box>
      {/* </Box> */}
    </Container>
  );
};

export default Main;
