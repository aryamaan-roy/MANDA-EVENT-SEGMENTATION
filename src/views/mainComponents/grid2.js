import { useState } from "react";
import { getStorage, ref, getDownloadURL, uploadBytesResumable, listAll } from "firebase/storage";
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CameraIcon from '@mui/icons-material/CameraAlt';
import Button from '@mui/material/Button';
import './input_file.css';


function Grid2() {
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [current_image_number, setcurrent_image_number] = useState(0);
    const [image_count, setimage_count] = useState(0);
    const [prev_image_count, setprevimage_count] = useState(0);
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

    const UploadImage = (e) => {
        e.preventDefault()
        const storage = getStorage();
        const listRef = ref(storage, 'Images/' + user_email);
        listAll(listRef).then((res) => {
            res.items.forEach((itemRef) => {
                //console.log(itemRef.name);
                setprevimage_count(prev_image_count + 1);
                console.log(prev_image_count)
            });
        }).catch((error) => {
            alert(error["message"])
        });
        console.log(e.target[0].files)
        setimage_count(e.target[0].files.length)
        console.log(prev_image_count)
        for (let i = 0; i < e.target[0].files.length; i++) {
            const file = e.target[0]?.files[i]
            if (!file) continue;
            const storageRef = ref(storage, 'Images/' + user_email + '/' + `${prev_image_count + i + 1}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress =
                        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgresspercent(progress);
                    setcurrent_image_number(i);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImgUrl(downloadURL)
                    });
                }
            );
        }
    }

    return (
        <div className="App" align="center">
            <font face="Comic Sans MS" size="4">
                <form onSubmit={UploadImage} className='form'>
                    <label for="file-upload" class="custom-file-upload">
                        Select Images
                    </label>
                    <input id="file-upload" type='file' multiple hidden />
                    <br></br><br></br>
                    <Button variant="contained" endIcon={<CameraIcon />} type="submit">Upload Images</Button>
                </form>

                <br></br>
                Images Selected : {image_count}
                <br></br>
                <div className='outerbar'>
                    <div className='innerbar'>Uploading Image {current_image_number} : {progresspercent}%</div>
                </div></font>
        </div>

        // <div align="center">
        //     <form onSubmit={UploadImage} className='form'>
        //         <Button variant="contained">
        //             Choose Image
        //             <input
        //                 type="file"
        //                 hidden
        //                 multiple
        //             />
        //         </Button>
        //         <br></br>
        //         <br></br>
        //         <Button
        //             variant="contained"
        //             component="label"
        //         >
        //             Upload Image
        //         </Button>
        //     </form>
        //     <br></br>
        //     <br></br>
        //     {/* <img src={image_url} alt="Image" width="300" height="300" /> */}
        // </div>
    );
}
export default Grid2;