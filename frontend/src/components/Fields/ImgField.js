import React, { useEffect, useState } from 'react'

import { useFormikContext } from 'formik'

export default function ImgField({ defaultImg, ChooseFileBtn, Avatar, name, mode }) {

    const formikProps = useFormikContext()
    const [loading, setLoading] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [img, setImg] = useState(defaultImg);


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
                    formikProps.setFieldValue('image', file)
                }

                reader.onerror = () => {
                    setLoading(0)

                    setErrorMsg('Error occured in reading file')
                }
            }
        }

    }


    const styleMode = mode === 'avatar' ?
        { display: 'flex', alignItems: 'end' } :
        { display: 'flex', alignItems: 'start', flexGrow: '1' }
    return (

        <div className='group' style={styleMode}>
            <Avatar avatar={img} />
            <ChooseFileBtn isLoading={loading} name={name} mode={mode} />
            <input hidden id={name} name={name} type="file" onChange={ChangeHandel} />

            <div className='error'>{errorMsg}</div>
        </div>

    )
}
