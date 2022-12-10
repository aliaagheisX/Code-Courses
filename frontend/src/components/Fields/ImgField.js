import React, { useState } from 'react'
import useToken from '../../useToken';

export default function ImgField({ defaultImg, ChooseFileBtn, Avatar, name }) {

    const [loading, setLoading] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [img, setImg] = useState(defaultImg);
    const [File, setFile] = useState();

    const { token, userdata: { ID, USERNAME, EMAIL, _PASSWORD } } = useToken()

    const ChangeHandel = (e) => {
        setLoading(1)
        setErrorMsg('')

        if (!e.currentTarget.files || !e.currentTarget.files[0]) {
            setLoading(0)
            setErrorMsg("The file type isn't supported on this browser yet.");
        }
        else {
            const file = e.currentTarget.files[0];
            const type = file.type;
            const size = file.size;
            /* valid types only (jpeg, jpg, png) */
            if (type !== "image/jpeg" && type !== "image/jpg" && type !== "image/png") {
                setLoading(0)

                setErrorMsg("The file type isn't supported on this browser yet.");

            }
            /* check size <= 2megabytes = 2*2**20 = 2097152 bytes */
            else if (size > 2097152) {
                setLoading(0)

                setErrorMsg("The file size must be less than 2mb");
            }
            else {
                let reader = new FileReader();
                reader.readAsDataURL(file); //read file

                reader.onloadend = () => {
                    setLoading(0)

                    setErrorMsg('')
                    setImg(reader.result)
                    setFile(file)
                }

                reader.onerror = () => {
                    setLoading(0)

                    setErrorMsg('Error occured in reading file')
                }
            }
        }

    }

    const SubmissionHandel = async (e) => {
        e.preventDefault()
        const formData = new FormData();

        formData.append('avatar', File);

        fetch(`http://localhost:4000/users/${USERNAME}/edit`, {
            method: 'PATCH',
            body: formData,
            headers: { 'token': token }
        })
            .then(response => response.json())
            .then(result => console.log('success', result))
            .catch(err => console.log('error', err))



        setLoading(0);

    }

    return (

        <div className='group' style={{ display: 'flex', alignItems: 'end' }}>
            <Avatar avatar={img} />
            <ChooseFileBtn isLoading={loading} name={name} />
            <input hidden id={name} name={name} type="file" onChange={ChangeHandel} />

            <div className='error'>{errorMsg}</div>
        </div>

    )
}
