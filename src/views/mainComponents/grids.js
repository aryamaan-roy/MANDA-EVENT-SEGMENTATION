import * as React from 'react';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
// import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { CContainer } from '@coreui/react'
import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import { height } from '@mui/system';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { string } from 'prop-types';
import TextField from '@mui/material/TextField';
export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(2);

  function thingspeak(val) {
    // Simple GET request using fetch
    let str1 = "https://api.thingspeak.com/update?api_key=VSJOVOYRE8A7M0I9&field4="
    let str2 = String(val)
    let url = str1.concat(str2)
    console.log(val)
    fetch(url)
        .then(response => response.json())
}

// const [dutyCycle, setDutyCycle] = React.useState(150);
// function valuetext(value) {
//     setDutyCycle(value)
//     console.log(value)
//     console.log("okk")
//     thingspeak(value)
//   return `${value}°C`;
// }

const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      voltage: data.get('voltage'),
    });
    if(data.get('voltage') <= "5" && data.get('voltage')>="0")
    {
        thingspeak(data.get('voltage'))
    }
    else alert("Please enter valid voltage in range 0-5 V")
    
  };

  const jsx = `
<Grid container spacing={${spacing}}>
`;

  return (
<>
<div align="center">
{/* <Typography id="input-slider" gutterBottom>
        INPUT VOLTAGE (V)
      </Typography>
<Box sx={{ width: 600 }}>
      <Slider
        aria-label="Voltage"
        defaultValue={1}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={0.5}
        marks
        min={0}
        max={5}
      />
    </Box> */}
<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
<Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="voltage"
                  label="Input Voltage (0-5V)"
                  name="voltage"
                />
</Grid>
<Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Input Voltage
            </Button></Box>
</div>
<br></br>
<div align="center">


<br></br>
<div class="col-xl-10 col-lg-9">
<div class="card shadow mb-6">
    
    <div
        class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        <h6 class="m-0 font-weight-bold text-primary">Thingspeak Results (VOLTAGE v/s TIME)</h6>
        <div class="dropdown no-arrow">
            <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-map fa-sm fa-fw text-gray-400"></i>
            </a>
        </div>
    </div>
   
    <div class="card-body" height="100%">
        <div class="chart-area">
            <iframe width="100%" height="100%" src={"https://thingspeak.com/channels/1848359/charts/4?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&yaxismax=5&yaxismin=0"} />
         
        </div>
    </div>
</div>
    <div class="col-xl-10 col-lg-9">
        <div class="card shadow mb-6">
            
        <div
            class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary">Thingspeak Results (Duty Cycle v/s TIME)</h6>
            <div class="dropdown no-arrow">
                <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-map fa-sm fa-fw text-gray-400"></i>
                </a>
            </div>
        </div>
    
        <div class="card-body">
            <div class="chart-area">
                <iframe width="100%" height="100%" src={"https://thingspeak.com/channels/1848359/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&xaxis=Time"} />
            
            </div>
        </div>
        </div>
    </div>
<br></br>
<div class="col-xl-10 col-lg-9">
<div class="card shadow mb-6">
    
<div
    class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
    <h6 class="m-0 font-weight-bold text-primary">Thingspeak Results (RPM v/s TIME)</h6>
    <div class="dropdown no-arrow">
        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-map fa-sm fa-fw text-gray-400"></i>
        </a>
    </div>
</div>

<div class="card-body">
    <div class="chart-area">
        <iframe width="100%" height="100%" src={"https://thingspeak.com/channels/1848359/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&xaxis=Time"} />
  
    </div>
</div>
</div>
</div>


<br></br>
<div class="col-xl-10 col-lg-9">
<div class="card shadow mb-6">
    
    <div
        class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        <h6 class="m-0 font-weight-bold text-primary">Thingspeak Results (CURRENT v/s TIME)</h6>
        <div class="dropdown no-arrow">
            <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-map fa-sm fa-fw text-gray-400"></i>
            </a>
        </div>
    </div>
   
    <div class="card-body" height="100%">
        <div class="chart-area">
            <iframe width="100%" height="100%" src={"https://thingspeak.com/channels/1848359/charts/3?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&xaxis=Time"} />
         
        </div>
    </div>
</div>

</div>
</div>
</div>
</>

  );
}