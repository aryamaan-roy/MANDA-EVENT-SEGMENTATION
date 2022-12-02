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
import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { string } from 'prop-types';
import TextField from '@mui/material/TextField';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UploadFile } from '@mui/icons-material';
import { useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";


export default function SpacingGrid() {
    const [user_email, setEmail] = useState('')
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user.email)
                setEmail(user.email)
                //alert('Welcome ' + user.email + ' !!!')
            } else {
                console.log('No user')
                navigate('/')
            }
        });
    }, [])

    const [spacing, setSpacing] = React.useState(2);
    const handleSubmit = (event) => {
        event.preventDefault();

    };

    const jsx = `
<Grid container spacing={${spacing}}>
`;

    const [image_url, setImage] = useState();
    const [image_name, setImage_name] = useState();
    const [progresspercent, setProgresspercent] = useState(0);
    function Image_choose(e) {
        console.log(e.target.files);
        console.log(e.target.files[0].name);
        setImage_name(e.target.files[0].name);
        setImage(URL.createObjectURL(e.target.files[0]));
    }
    const UploadImage = (event) => {
        event.preventDefault();
        const storage = getStorage();
        const storageRef = ref(storage, 'Images/' + user_email + '/' + image_name);
        console.log('going to upload')

        uploadBytes(storageRef, image_url).then((snapshot) => {
            alert('Uploaded the image');
        });

    };

    return (
        <>
       <div align="center">
            <Button
                variant="contained"
                component="label"
            >
                Choose Image
                <input
                    type="file"
                    hidden
                    onChange={Image_choose}
                />
            </Button>
            <br></br>
            <h3>Chosen Image : {image_name}</h3>
            <br></br>
            <Button
                variant="contained"
                component="label"
                onClick={UploadImage}
            >
                Upload Image
            </Button>
            <br></br>
            <br></br>
            <img src={image_url} alt="Image" width="300" height="300" />
            </div>
        </>
    );
}