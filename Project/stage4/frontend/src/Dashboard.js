import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';


/// 
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Axios from 'axios'

import Title from './Title';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


export function FormDialog() {
  const [open, setOpen] = React.useState(false);


  const [_Title, set_Title] = React.useState("");
  const [_Channel_Id, set_Channel_Id] = React.useState("");
  const [_Category_Id, set_Category_Id] = React.useState(0);
  const [_Tag_Name, set_Tag_Name] = React.useState("");
  const [_Publish_time, set_Publish_time] = React.useState("");


  var Video_form_input = {"Title":_Title,"set_Title":set_Title, 
                          "Channel_Id":_Channel_Id, "set_Channel_Id":set_Channel_Id,
                          "Category_Id":_Category_Id, "set_Category_Id":set_Category_Id,
                          "Tag_Name": _Tag_Name, "set_Tag_Name":set_Tag_Name,
                          "Publish_time": _Publish_time, "set_Publish_time":set_Publish_time
                        }

  var window_input = {"Video_form_input": Video_form_input}

  function on_click_Component_Inputform(window_input){
    window_input.Video_form_input.Category_Id = parseInt(window_input.Video_form_input.Category_Id)
    Axios.
    post("http://127.0.0.1:5000/videos/insert", window_input.Video_form_input)
    .then((response) => {
      console.log(response.data)
    }).catch((e)=>{
      console.log(e)
    })
    return
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAdd = () =>{
    on_click_Component_Inputform(window_input);
    set_Title("");
    set_Channel_Id("");
    set_Category_Id(0);
    set_Tag_Name("");
    set_Publish_time("");
  }

  const handleClose = () => {
    set_Title("");
    set_Channel_Id("");
    set_Category_Id(0);
    set_Tag_Name("");
    set_Publish_time("");
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <Component_Inputform window_input={window_input}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdd}>Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}


function DataGridDemo({_data,_set_data}) {

  const [selected_rows, set_selected_rows] = React.useState([])

  const video_columns = [
    { field: 'Category_Id', 
    headerName: 'Category Id', 
    width: 50,
    type:"number",
    editable: false,
    headerAlign: 'center',
    align: 'center',
    flex: 1.0,
  },
  { field: 'Channel_Id', 
    headerName: 'Channel Id', 
    width: 50,
    editable: false,
    headerAlign: 'center',
    align: 'center',
    flex: 1.0,
  },
  {
    field: 'Publish_time',
    headerName: 'Publish Time',
    width: 50,
    editable: true,
    headerAlign: 'center',
    align: 'center',
    flex: 1.0,
  },
  {
    field: 'Title',
    headerName: 'Title',
    width: 50,
    editable: true,
    headerAlign: 'center',
    align: 'center',
    flex: 1.0,
  },
  {
    field: 'Tag_Name',
    headerName: 'Tags',
    width: 50,
    editable: true,
    headerAlign: 'center',
    align: 'center',
    flex: 1.0,
  },
  {
    field: 'Video_id',
    headerName: 'Video id',
    width: 50,
    editable: false,
    headerAlign: 'center',
    align: 'center',
    flex: 1.0,
  },

  ]

  function on_click_delete(){
    console.log(selected_rows)
    _set_data(_data.filter((row) => !selected_rows.includes(row.Video_id)));

    for(let i=0;i<selected_rows.length;i++){
      Axios.delete(`http://127.0.0.1:5000/videos/delete/${selected_rows[i]}`, {})
      .then((response) => {
        console.log(response.data)
        // setVideoData(response.data)
      }).catch((e)=>{
        console.log(e)
      })
    }
  }

  function on_click_update(){
    var found = _data.filter(item => selected_rows.includes(item.Video_id))
    for(let i=0;i<found.length;i++){
      found[i].Category_Id = found[i].Category_Id.toString()
    }
    console.log(found)

    for(let i=0;i<selected_rows.length;i++){
      Axios.put(`http://127.0.0.1:5000/videos/update/${found[i].Video_id}`, found[i])
      .then((response) => {
        console.log(response.data)
        // setVideoData(response.data)
      }).catch((e)=>{
        console.log(e)
      })
    }
  }

  const processRowUpdate = (newRow) => {
    console.log(newRow)
      _set_data(_data.map((row) => (row.Video_id === newRow.Video_id ? newRow:row)));
    return newRow
  };

  return (
    <Grid item xs={15}>
    <Box sx={{ height: 300, width: '100%'}} className='center'>
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
    <Title>Search Results</Title>
      <DataGrid
        rows={_data}
        columns={video_columns}
        getRowId={(_row) => _row.Video_id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 6,
            },
          },
        }}
        pageSizeOptions={[6]}
        // checkboxSelection
        disableRowSelectionOnClick
        checkboxSelection
        onRowSelectionModelChange={(newrow) => set_selected_rows(newrow)}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error)=>console.log(error)}
        
      />
    <div>
    <FormDialog />
    <Button variant="contained" onClick={on_click_delete}>Delete</Button>
    <Button variant="contained" onClick={on_click_update}>Update</Button>
    </div>



    </Paper>
    </Box>

    </Grid>

  );
}


function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value={10}>Channel</MenuItem>
          <MenuItem value={20}>Video</MenuItem>
          <MenuItem value={30}>Tag</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

function Component_Form(){
  const [video_title, set_video_title] = React.useState("")
  const [video_table_content, set_video_table_content] = React.useState([])

  function on_click_search_form(video_title){
    Axios.get(`http://127.0.0.1:5000/videos/${video_title}`, {})
    .then((response) => {
      console.log(response.data)
      set_video_table_content(response.data)
    }).catch((e)=>{
      set_video_table_content([])
      console.log(e)
    })
  }
  return(
    <>
    <Grid item xs={12} md={11} lg={12}>
    <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
      <Title>Search Video</Title>
      <TextField size="small" id="outlined-basic" label="Video title" variant="outlined" onChange={(e) => set_video_title(e.target.value)}/> 
      <br/>
      <Button variant="contained" onClick={(e) => on_click_search_form(video_title)}>Search</Button>
      
    </Paper>
    </Grid>
    <>

    </>
    <Grid item xs={12} md={12} lg={12}>
    <Box sx={{ height: 250, width: '100%'}} className='center'> 
      <DataGridDemo _data={video_table_content} _set_data={set_video_table_content} /> 
    </Box>
    </Grid>
    </>
  )
}

function Component_histogram(){
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
      series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
      width={500}
      height={250}
    />
  )
}

function Component_piechart({_data,selected_country}){
  console.log(NationidNationNameMap[Number(selected_country)])
  var _input_data = _data.filter((item) => item.NationName == NationidNationNameMap[Number(selected_country)])
  // console.log(_input_data)
  var input_data = []
  for(let i=0;i<_input_data.length;i++){
    if((i)%(11)==Number(selected_country))
    {
      input_data.push({id:i, value:Number(_input_data[i].TotalViews), label:_input_data[i].Title.slice(0,10).concat('...')})
    }
  }
  return (
    <PieChart
    series={[
      {
        data:input_data
      },
    ]}
    width={800}
    height={230}
  />
  )
}

const NationidNationNameMap = {0:"US", 1:"RU", 2:'MX', 3:'KR', 4:'JP', 5:'IN', 6:'GB', 7: 'FR', 8: 'DE', 9: 'CA', 10: 'BR'}

function on_click_adv_query(n,set_selected_video_country_list){
  if(n <=1){
    return 
  }
  Axios.get(`http://127.0.0.1:5000/videos/AllNationTopN/${n*11}`, {})
  .then((response) => {
    console.log(response.data)
    set_selected_video_country_list(response.data)

  }).catch((e)=>{
    console.log(e)
  })
}


function My_window({window_input}){
  const [num_video,set_num_video] = React.useState(2)
  const [selected_country, set_selected_country] = React.useState('')
  const [selected_video_country_list, set_selected_video_country_list] = React.useState([])

  if(window_input.window_state==0){
    return (
      <>      
        <Component_Form />
      </>
    )
  }
  else{
    return (
      <>
    <Grid item xs={12} md={12} lg={12}>
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
    <Box sx={{ height: 150, width: '100%'}} className='center'> 
        <Title>Show Top N Videos</Title>
        <div>
          <FormControl sx={{ m: 1, minWidth: 120, minHeight:120 }} >
          <TextField
            id="Category_Id"
            label="Top N"
            value={num_video}
            onChange={(e) => {
              var value = parseInt(e.target.value);
              if(value > 15) value = 15;
              if(value < 1) value = 2;
              set_num_video(value)}}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}

          />
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120, minHeight:110 }} >
          <InputLabel id="demo-simple-select-label">Country</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selected_country}
            label="Country"
            onChange={(e) => {set_selected_country(e.target.value)}}
            >
            <MenuItem value={0}>United States</MenuItem>
            <MenuItem value={1}>Russia</MenuItem>
            <MenuItem value={2}>Mexico</MenuItem>
            <MenuItem value={3}>Korea</MenuItem>
            <MenuItem value={4}>Jepan</MenuItem>
            <MenuItem value={5}>Indea</MenuItem>
            <MenuItem value={6}>United Kingdom</MenuItem>
            <MenuItem value={7}>France</MenuItem>
            <MenuItem value={8}>Germany</MenuItem>
            <MenuItem value={9}>Canada</MenuItem>
            <MenuItem value={10}>Brazil</MenuItem>
        </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120, minHeight:120 }} >
        <Button variant='contained' onClick={() => on_click_adv_query(num_video,set_selected_video_country_list)}>Search</Button>
        </FormControl>

        </div>
    </Box>
    <Box sx={{ height: 300, width: '100%'}} className='center'> 
      <Component_piechart _data={selected_video_country_list} selected_country={selected_country}/>
    </Box>
      
    </Paper>
    </Grid>
      </>
    )
  }
}


function Component_Inputform({window_input}) {
  function on_click_Component_Inputform(window_input){
    window_input.Video_form_input.Category_Id = parseInt(window_input.Video_form_input.Category_Id)
    Axios.
    post("http://127.0.0.1:5000/videos/insert", window_input.Video_form_input)
    .then((response) => {
      console.log(response.data)
    }).catch((e)=>{
      console.log(e)
    })
    return
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >

      <div>
      <TextField
          id="Title"
          label="Video Title"
          value={window_input.Video_form_input.Title}
          onChange={(e) => window_input.Video_form_input.set_Title(e.target.value)}
          defaultValue=""
      />
      <TextField
          id="Channel_Id"
          label="Channel Id"
          value={window_input.Video_form_input.Channel_Id}
          onChange={(e) => window_input.Video_form_input.set_Channel_Id(e.target.value)}
          defaultValue=""
      />
      <TextField
          id="Category_Id"
          label="Category Id"
          value={window_input.Video_form_input.Category_Id}
          onChange={(e) => window_input.Video_form_input.set_Category_Id(e.target.value)}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
      />
      <TextField
          id="Tag_Name"
          label="Tag Name"
          value={window_input.Video_form_input.Tag_Name}
          onChange={(e) => window_input.Video_form_input.set_Tag_Name(e.target.value)}
          defaultValue=""
      />
      <TextField
          id="Publish_time"
          label="Publish Time"
          value={window_input.Video_form_input.Publish_time}
          onChange={(e) => window_input.Video_form_input.set_Publish_time(e.target.value)}
          defaultValue=""
      />
      </div>

    </Box>
  );
}

function Component_HeaderToolbar({toggleDrawer,window_state,open}){
    if(window_state==0){
      var head_name = "Youtube Video CRUD"
    }
    else{
      var head_name = "Data Visualization"
    }
    
    return (
      <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
        <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {head_name}
        </Typography>

        <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
        </IconButton>

      </Toolbar>
    </AppBar>
    )
}

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [sb_state,set_sb_state] = React.useState(0);
  const [window_state,set_window_state] = React.useState(0);


  const [_Title, set_Title] = React.useState("");
  const [_Channel_Id, set_Channel_Id] = React.useState("");
  const [_Category_Id, set_Category_Id] = React.useState(0);
  const [_Tag_Name, set_Tag_Name] = React.useState("");
  const [_Publish_time, set_Publish_time] = React.useState("");



  var Video_form_input = {"Title":_Title,"set_Title":set_Title, 
                          "Channel_Id":_Channel_Id, "set_Channel_Id":set_Channel_Id,
                          "Category_Id":_Category_Id, "set_Category_Id":set_Category_Id,
                          "Tag_Name": _Tag_Name, "set_Tag_Name":set_Tag_Name,
                          "Publish_time": _Publish_time, "set_Publish_time":set_Publish_time
                        }

  var window_input = {"window_state":window_state,
                      "Video_form_input": Video_form_input}

  const toggleDrawer = () => {
    setOpen(!open);
  };


  function on_click_listitem(_i){
    set_window_state(_i)
  }

  const mainListItems = (
    <React.Fragment>
      <ListItemButton onClick={(e)=>on_click_listitem(0)}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Video CRUD" />
      </ListItemButton>
      <ListItemButton onClick={(e)=>on_click_listitem(1)}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Data Visualization" />
      </ListItemButton >
    </React.Fragment>
  );

  return ( 
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Component_HeaderToolbar toggleDrawer={toggleDrawer} window_state={window_state} open={open}/>

        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>

              <My_window window_input={window_input}/>

            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
