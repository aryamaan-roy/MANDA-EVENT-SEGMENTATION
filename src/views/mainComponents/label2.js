import { useState } from "react";
import { getStorage, ref, getDownloadURL, uploadBytesResumable, listAll } from "firebase/storage";
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CameraIcon from '@mui/icons-material/CameraAlt';
import Button from '@mui/material/Button';
import './input_file.css';
import ResponsiveAppBar from './nav.js'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { padding } from "@mui/system";
import { PaddingRounded } from "@mui/icons-material";
import TextField from '@mui/material/TextField';
import db from '../../firebase1'
function Label2() {
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [current_image_number, setcurrent_image_number] = useState(0);
    const [image_count, setimage_count] = useState(0);
    const [all_image_url, setimage_url] = useState([{}]);
    const [show_load_message, setShow_load_message] = useState(false)
    const [open, setOpen] = useState(true)
    const [user_email, setEmail] = useState('')
    const [show_images, setShow_images] = useState(false)
    const [label_indices, setLabelindices] = useState([])
    const [start_index, setStart_index] = useState(0)
    const [end_index, setEnd_index] = useState(0)
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

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }
    // const handleOpen = () => {
    //     setShow_load_message(false)
    //     if (time_stamp_selected == 0) {
    //         get_full_image_url(time_stamps[time_stamp_selected])
    //     }
    //     setOpen(true)
    // }

    const handleClose = () => setOpen(false)
    const ShowImages = (e) => {
        e.preventDefault()
        setShow_load_message(true)
        console.log("hello");
        const storage = getStorage();
        const listRef = ref(storage, 'Images/' + user_email);
        var count = 0;
        listAll(listRef).then((res) => {
            res.items.forEach((itemRef) => {
                console.log(itemRef.name);
                count = count + 1;
                var img = {};
                getDownloadURL(itemRef).then((url) => {
                    console.log(url);
                    img["url"] = url;
                    img["name"] = itemRef.name;
                    img["color"] = "black";
                    // const xhr = new XMLHttpRequest()
                    // xhr.responseType = 'blob'
                    // xhr.onload = (event) => {
                    //     const blob = xhr.response
                    // }
                    // xhr.open('GET', url)
                    // xhr.send()
                    all_image_url.push(img)
                })
            });
            console.log(all_image_url)
            setimage_count(count)
        }).catch((error) => {
            alert(error["message"])
        });
    }
    const select_image = (index, name) => {
        console.log(index);
        console.log(name);
        if (all_image_url[index]["color"] == "black") {
            if(start_index === 0){
                setStart_index(index)
            }
            else if(end_index === 0){
                setEnd_index(index)
                console.log("hemlo")
                console.log(start_index);
                console.log(end_index);
                for(var i=start_index;i<=index;i++){
                    label_indices.push(all_image_url[i]["name"])
                }
            }
            else 
            {
                alert("Please select only two images")
                return;
            }
            console.log(label_indices);
            all_image_url[index]["color"] = "red"
            document.getElementById(name).style.border = "4px solid red"
        }
        else {
            all_image_url[index]["color"] = "black"
            document.getElementById(name).style.border = "2px solid black"
            // var index = label_indices.indexOf(name);
            // if (index > -1) {
            //     label_indices.splice(index, 1);
            // }
            // console.log(label_indices);
        }
    }

    const createLabel = (e) => {
        e.preventDefault()
        console.log(label_indices);
        const data = new FormData(e.currentTarget);
        const label_name = data.get('label_name');
        console.log(label_name);

        // Add a new document in collection
        db.collection(user_email).doc(label_name).set({
            name: label_name,
            indices : label_indices
        })
            .then(() => {
                alert("Label successfully added!");
            })
            .catch((error) => {
                alert("Error adding label: ", error);
            });
    }
    return (
        <>
            <ResponsiveAppBar />
            <font face="Comic Sans MS" size="4">
                <br></br><br></br>

                <div className="App" align="center">

                    Your account : {user_email}
                    <br></br>
                    Number of Images : {image_count}

                    <br></br>
                    <br></br>
                    <Button variant="contained" onClick={(e) => {
                        ShowImages(e)
                        setShow_images(true)
                    }} endIcon={<CameraIcon />} type="submit">Load Images</Button>
                    <br></br><br></br>
                    Select Start and End images to create a label
                    <br></br><br></br>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '20ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={createLabel}
                    >
                        <TextField id="label" label="Label" variant="standard" name="label_name" required />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create Label
                        </Button>

                    </Box>
                    <br></br><br></br><br></br>

                    {show_images === true ? (<>
                        {all_image_url.map((item, index) => {
                            return (
                                <>
                                    {index > 0 ? (<>
                                        < img
                                            src={item['url']}
                                            alt={item['name']}
                                            // key={index}
                                            style={{ width: '10%', height: '90px', padding: "1%" }}
                                            id={item['name']}
                                            borderColor={item['color']}
                                            border="2"
                                            onLoad={() => {
                                                //console.log(item['color'])
                                                document.getElementById(item['name']).style.borderColor =
                                                    item['color']
                                                console.log(item["name"] + " : " + index)
                                            }}
                                            onClick={() => { select_image(index, item['name']) }
                                            }
                                        /> </>) : (<></>)}
                                </>
                            )

                        })}
                    </>) : (<></>)}


                </div>

                {show_images === true ? (
                    <>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}><h6>
                                Images are loading. Please wait for at least 10 seconds and then
                                click anywhere on screen
                            </h6></Box>

                        </Modal>
                    </>
                ) : (
                    <></>
                )}

            </font>
        </>
    );
}
export default Label2;