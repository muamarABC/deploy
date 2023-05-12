import React, { useState } from 'react';
import { Container, FormGroup,Row,Col,Form} from 'reactstrap';
import '../../stle/addDonasi.css'
import { toast } from 'react-toastify';
import { db} from '../../../firebase.config';
import { storage} from '../../../firebase.config';
import { uploadBytesResumable, ref,getDownloadURL  } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AddDonasi = () => {
    const [enterTitle, setEnterTitle] = useState('');
    const [enterJumDonasi, setEnterJumDonasi] = useState('');
    const [enterDonasiAwal, setEnterDonasiAwal] = useState('0');
    const [enterKategoriDonasi, setEnterKategoriDonasi] = useState('');
    const [enterDeskripsi, setEnterDeskripsi] = useState('');
    const [enterProductImg, setEnterProductImg] = useState(null);
    const [Loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const addDonasi = async e =>{
        e.preventDefault()
        try{
            const docRef = await collection(db, 'Donasi')
            const storageRef =  ref(storage, `productImages/${Date.now() + enterProductImg.name}`);
            const uploadTask = uploadBytesResumable(storageRef, enterProductImg);

            uploadTask.on(() => {
            toast.error('images not uploaded!');
            }, 
            ()=> {
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
                    await addDoc(docRef,{
                        Title: enterTitle,
                        JlhDonasi: enterJumDonasi,
                        DonasiAwal: enterDonasiAwal,
                        category: enterKategoriDonasi,
                        description: enterDeskripsi,
                        imgUrl: downloadURL,
                    });
                });
                toast.success("Donasi Berhasil ditambahkan");
                navigate('/dashboard/all-donasi');
            });
            
        }
        catch(err){
            toast.error("Donasi Tidak Terupload")
        };
    };
    
   

    return (<>
    <section>
            <Container>
                <Row>
                    <Col lg="12">
                        <h4 className='mb-5'> Add Donasi</h4>
                        <Form onSubmit={addDonasi}>
                            <FormGroup className='form_group'>
                                <span>Judul Donasi</span>
                                <input type='text' placeholder='Nama' value={enterTitle} onChange={e=> setEnterTitle(e.target.value)} required/>
                            </FormGroup>
                            <div className='d-flex align-items-center justify-content-between gap-5'>
                            <FormGroup className='form_group'>
                                <span>Jumlah Donasi</span>
                                <input type='number' placeholder='Rp.100000' value={enterJumDonasi} onChange={e=> setEnterJumDonasi(e.target.value)} required/>
                            </FormGroup>
                                <FormGroup className='form_group w-50'>
                                    <span>category Donasi</span>
                                    <select className='w-100 p-2' value={enterKategoriDonasi} onChange={e=> setEnterKategoriDonasi(e.target.value)} required>
                                        <option value="">Pilih...</option>
                                        <option value="Kebakaran">Kebakaran</option>
                                        <option value="Banjir">Banjir</option>
                                        <option value="Gempa">Gempa</option>
                                        <option value="Erupsi">Erupsi</option>
                                    </select>
                                </FormGroup>
                            </div>
                            
                            <FormGroup className='form_group'>
                                <span>Deskripsi Donasi</span>
                                <input type='textarea' placeholder='isi' value={enterDeskripsi} onChange={e=> setEnterDeskripsi(e.target.value)} required/>
                            </FormGroup>
                            
                            <div>
                            <FormGroup  className='form_group'>
                                <span>Gambar Donasi</span>
                                <input 
                                type='file' 
                                onChange={e=> setEnterProductImg(e.target.files[0])} 
                                required/>
                            </FormGroup>
                            </div>
                            <button className='buy_btn' type='submit'>Add Donasi</button>
                        </Form>
                    </Col>
                </Row>
            </Container>
    </section>
    </>
  )
}

export default AddDonasi