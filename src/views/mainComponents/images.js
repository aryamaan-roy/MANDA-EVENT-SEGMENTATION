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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
function Images() {
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [current_image_number, setcurrent_image_number] = useState(0);
    const [image_count, setimage_count] = useState(0);
    const [all_image_url, setimage_url] = useState([{}]);
    const [all_labels, setlabel] = useState([{}]);
    const [show_load_message, setShow_load_message] = useState(false)
    const [open, setOpen] = useState(true)
    const [user_email, setEmail] = useState('')
    const [show_images, setShow_images] = useState(false)
    const [label_indices, setLabelindices] = useState([])
    const [select_open, setselect_open] = useState(false);
    const [current_label, setCurrentLabel] = useState('')
    const [current_label_index, setCurrentLabel_index] = useState('')
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user.email)
                setEmail(user.email)
                db.collection(user.email).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        all_labels.push(doc.data())
                    });
                });
                console.log(all_labels)
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
            for (var i = 0; i < all_labels.length; i++) {
                if (all_labels[i]['name'] === current_label) {
                    res.items.forEach((itemRef) => {
                        console.log(itemRef.name);
                        if (all_labels[i]['indices'].includes(itemRef.name)) {
                            count = count + 1;
                            var img = {};
                            getDownloadURL(itemRef).then((url) => {
                                console.log(url);
                                img["url"] = url;
                                img["name"] = itemRef.name;
                                img["color"] = "black";
                                all_image_url.push(img)
                            })
                        }
                    });
                    console.log(all_image_url)
                    setimage_count(count)
                    setShow_load_message(false)
                }
            }

        }).catch((error) => {
            alert(error["message"])
        });
    }

    const handleChange_select = (event) => {
        setCurrentLabel(event.target.value);
    };

    const handleClickselect_open = () => {
        setselect_open(true);
    };

    const handleClose_select = (event) => {
        setselect_open(false);
    };
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

                    <Button variant="contained" onClick={handleClickselect_open}>Select Labels</Button>
                    <Dialog disableEscapeKeyDown open={select_open} onClose={handleClose_select}>
                        <DialogTitle>Select Labels</DialogTitle>
                        <DialogContent>
                            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel htmlFor="demo-dialog-native">Labels</InputLabel>
                                    <Select
                                        native
                                        value={current_label}
                                        onChange={handleChange_select}
                                        input={<OutlinedInput label="Label" id="demo-dialog-native" />}
                                    >
                                        {all_labels.map((label, index) => (
                                            <>
                                                {index == 0 ? (<></>) : (<>
                                                    <option value={label['name']}>{label['name']}</option>
                                                </>)}
                                            </>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose_select}>Cancel</Button>
                            <Button onClick={handleClose_select}>Ok</Button>
                        </DialogActions>
                    </Dialog><br></br><br></br>
                    <Button variant="contained" onClick={(e) => {
                        ShowImages(e)
                        setShow_images(true)
                    }} endIcon={<CameraIcon />} type="submit">Load Images</Button>
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
                                            style={{ width: '15%', height: '110px', padding: "1%" }}
                                            id={item['name']}
                                            borderColor={item['color']}
                                            border="1"

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
export default Images;