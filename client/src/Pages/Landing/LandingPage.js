import React,{useEffect} from "react"
import {Box,Typography,Button,Toolbar,AppBar, Divider,Paper, CardContent} from '@mui/material'
import {useNavigate} from "react-router-dom"
import playstore from '../../assets/images/playstore.svg'
import { style } from './style'
import {logo2 } from "../../assets";
// import client from '../../api/client'
// import axios from 'axios'
export default function LandingPage(){
    const history = useNavigate()
    const handleSubmit = ()=>{
        history("/login")
    }
    async function cbk(){
      // await axios.post('/https://cc10-197-237-132-183.ap.ngrok.io/callback').then((response)=>{
      //  console.log(response)
      // })
    }
    useEffect(()=>{
   cbk()
    })
    return(
      <div className="bg2">
    <Box sx={style.land}>
        <Box sx={{flex:"grow"}}>
        <AppBar elevation={0} position="static" style={{backgroundColor:"transparent"}}>
        <Toolbar>
       
        <Typography variant="h6" component="div"  sx={{ flexGrow: 1, fontFamily:"Cursive", mt:-10}}>
        <img className="h-40 w-40 -mb-32 " alt="" src={logo2}/>
        </Typography>
        <Button variant="contained" color="success" sx={{borderRadius:4, boxShadow:10}}onClick={handleSubmit}>Login</Button>
        </Toolbar>
        </AppBar>
        </Box>
        <Box sx={{mt:5, mx:{
            lg:32,
            xs:4,
            sm:8,
            md:15
        }}}>
        <Typography variant="h2" component="h1" sx={{
            fontSize:{
                lg:40,
                sm:40,
                xs:40,
                md:20
            }
        }}>MARICREDIT</Typography>   
        <Typography variant="p" component="h3" color="white">We Believe , We Multiply</Typography>  
        <h3><i>Get short term loans</i></h3>
        <Button variant="outlined" color="success" sx={{boxShadow:10, borderRadius:4, mt:3}} startIcon={<img src={playstore} alt=""/>}>
        <Typography color="black">Download Our App</Typography>
        </Button>
        <Divider sx={{mt:5, mb:5}}><h3>Our Products</h3></Divider>
        <Box
      sx={{

        justifyContent:"center",
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 220,
          height: 220,
        },
      }}
    >
      <Paper elevation={3} style={style.paper}> 
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        </Typography>
        <Typography variant="h5" component="div" style={{fontWeight:"bold"}}>
        Rent Loan
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.primary">
         <i>Product</i>
        </Typography>
      </CardContent>
      </Paper>
      <Paper elevation={3} style={style.paper}> 
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        </Typography>
        <Typography variant="h5" component="div" style={{fontWeight:"bold"}}>
       Farm Loan
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        <i>Product</i>
        </Typography>
        <Typography variant="body2" style={{fontWeight:"bold"}}>
     For external farms and cooperatives
       </Typography>
      </CardContent>
      </Paper>
      <Paper elevation={3} style={style.paper}> 
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        </Typography>
        <Typography variant="h5" component="div" style={{fontWeight:"bold"}}>
       Land loan
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        <i>Product</i>
        </Typography>
        <Typography variant="body2" style={{fontWeight:"bold"}}>
        Only exclusive for landlords
       </Typography>
      </CardContent>
      </Paper>
      <Paper elevation={3} style={style.paper}> 
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        </Typography>
        <Typography variant="h5" component="div" style={{fontWeight:"bold"}}>
        Construction
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        <i>Product</i>
        </Typography>
        <Typography variant="body2">
        
       </Typography>
      </CardContent>
      </Paper>
    </Box>

        </Box>
     
     </Box>
     </div>
    )
}