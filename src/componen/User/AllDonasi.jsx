import React,{useState,useEffect} from 'react'
import { Container,Row,Table} from 'reactstrap'
import { db } from '../../../firebase.config'
import { deleteDoc, doc, updateDoc, getDoc} from 'firebase/firestore'
// import ProductDonasi from '../../assets/images/Kebakaran3.jpeg'
import useGetData from '../../custom-hooks/useGetData'
import { toast } from 'react-toastify'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';




const AllDonasi = () => {
  const {data:donasiData, Loading} = useGetData("Donasi");
  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(true)
  const handleEditClose = () => setShowEdit(false);
  const [donate, setDonate] = useState([])

  const [updateTitle, setupdateTitle] = useState('');
  const [updateKategoriDonasi, setupdateKategoriDonasi] = useState('');
  const [updateDeskripsi, setupdateDeskripsi] = useState('');

  const [idUpdated, setIdUpdated] = useState("")

  const deleteDonasi = async(id) => {
    await deleteDoc(doc(db, 'Donasi', id))
    toast.success("Donasi Berhasil diHapus")
  }


  const updateDonasi = async (id) => {
    const DonasiDocument = doc(db,"Donasi",id)
    try{
      await updateDoc(DonasiDocument, {
        Title: updateTitle,
        category: updateKategoriDonasi,
        description: updateDeskripsi
      })
    }catch (err) {
      console.log(err)
    }
  }


  return (
   <>
   <section>
    <Container>
      <Row>
        <Table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Judul</th>
              <th>Jumlah Donasi</th>
              <th>Kategori</th>
              <th>Deskripsi</th>
              <th>
              Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              donasiData.map(item=>(
                <tr key={item.id}>
              <td><img src={item.imgUrl} alt="" /></td>
              <td>{item.Title}</td>
              <td>{item.JlhDonasi}</td>
              <td>{item.category}</td>
              <td>{item.description}</td>
              <td>
                <button className='btn btn-warning' onClick={() => {
                handleShowEdit()
                setupdateTitle(item.Title)
                setupdateKategoriDonasi(item.category)
                setupdateDeskripsi(item.description)
                setIdUpdated(item.id)
               }}><i className="fa-solid fa-pen-to-square" style={{color: "white"}}></i>Edit</button>
              </td>
              <td>
                <button onClick={()=> {deleteDonasi(item.id)}} className='btn btn-danger'>Delete</button>
              </td>
            </tr>
              ))
            }
          </tbody>
        </Table>

        <Modal show={showEdit} onHide={handleEditClose}>
              <Modal.Header closeButton>
                <Modal.Title>Update Data Obat</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={() => {
                  updateDonasi(idUpdated)
                  handleEditClose()
                }}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Judul Donasi</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter Judul DOnasi" 
                    value={updateTitle} 
                    onChange={e => setupdateTitle(e.target.value)}/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>category Donasi</Form.Label>
                    <select className='w-100 p-2' value={updateKategoriDonasi} onChange={e=> setupdateKategoriDonasi(e.target.value)} required>
                    <option value="">Pilih...</option>
                    <option value="Kebakaran">Kebakaran</option>
                    <option value="Banjir">Banjir</option>
                    <option value="Gempa">Gempa</option>
                    <option value="Erupsi">Erupsi</option>
                    </select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Deskripsi</Form.Label>
                    <Form.Control 
                    type="textarea" 
                    placeholder="Enter Deskripsi" 
                    value={updateDeskripsi} 
                    onChange={e => setupdateDeskripsi(e.target.value)}/>
                  </Form.Group>
                  
                </Form>  
              </Modal.Body>
              <Modal.Footer>
                <Button type='button' variant="danger" onClick={handleEditClose}>
                  Close
                </Button>
                <Button type="submit" variant="primary" onClick={() => {
                  updateDonasi(idUpdated)
                  handleEditClose()
                }}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
      </Row>
    </Container>
   </section>
   </>
  )
}

export default AllDonasi