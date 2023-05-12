import React from 'react'
import { Container,Row,Table} from 'reactstrap'
import useGetData from '../custom-hooks/useGetData'
import { toast } from 'react-toastify'




const AllDonasi = () => {
  const {data:DataInput, Loading} = useGetData('DataDonasi');


  return (
   <>
   <section>
    <Container>
    <h2 style={{textAlign:'center', paddingBottom:40}}>Semua Donasi Yang Telah Masuk</h2>
      <Row>
        <Table>
          <thead>
            <tr>
              {/* <th>No</th> */}
              <th>Nama</th>
              <th>Jumlah Donasi</th>
              <th>Keterangan</th>
              <th>Bukti Bayar</th>
            </tr>
          </thead>
          <tbody>
            {
              DataInput?.map(item=>(
                <tr key={item.id}>
              {/* <td></td> */}
              <td>{item.User}</td>
              <td>{item.Dons}</td>
              <td>{item.Msg}</td>
              <td><img style={{width:50}}src={item.imgUrl} alt="" /></td>
            </tr>
              ))
            }
          </tbody>
        </Table>
      </Row>
    </Container>
   </section>
   </>
  )
}

export default AllDonasi