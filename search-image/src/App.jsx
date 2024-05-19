import { useState } from 'react'
import './App.css'
import { FaSearch } from "react-icons/fa";
import Pagination from '@mui/material/Pagination';
function App() {
  const [word, setWord] = useState('');
  const [dataimage, setDataimage] = useState([]);
  const [countpage, setCountpage] = useState(0);

  function clicksearch() {
    if (!word) {
      alert("กรุณากรอกข้อความ");
    } else {
      const client_id = "YguB8p72O9UaAD2bhLhHcdWotiORcSwdE13fCfw2_HQ";
      fetch(`https://api.unsplash.com/search/photos?client_id=${client_id}&query=${word}&per_page=12`)
        .then(response => response.json())
        .then(data => {
          // ทำสิ่งที่ต้องการกับข้อมูลที่ได้
          console.log(data);
          const result = data.results;
          if (result.length === 0) {
            alert("ไม่พบข้อมูลรูปภาพ! กรุณาลองคำใหม่")
          }
          setDataimage(result)
          setCountpage(data.total_pages)
        })
        .catch(error => {
          console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
        });
    }
  }

  // เปลี่ยนหน้า
  function handleChangePage(e, page) {
    console.log(page);
    const client_id = "YguB8p72O9UaAD2bhLhHcdWotiORcSwdE13fCfw2_HQ";
    fetch(`https://api.unsplash.com/search/photos?client_id=${client_id}&query=${word}&per_page=12&page=${page}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const result = data.results;
        setDataimage(result)
        setCountpage(data.total_pages)
      })
      .catch(error => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
      });

  }

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-12 text-center mb-3">
          <h3>
            ระบบค้นหารูปภาพด้วย API
          </h3>
        </div>
        <div className="col-12">
          <div className="input-group input-group-lg">
            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" name='search' placeholder='กรองข้อความเพื่อค้นหาข้อมูล' value={word} onChange={(e) => setWord(e.target.value)} />
            <span className="input-group-text" id="inputGroup-sizing-lg" role='button' onClick={clicksearch}>
              <FaSearch />
            </span>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        {dataimage.map((e) => {
          return (
            <div className="col-4 my-2" key={e.id}>
              <img src={e.urls.full} alt="" />
            </div>
          );
        })}
      </div>
      <div className="row my-2">
        <div className="col-12 d-flex justify-content-center">
          {countpage === 0 ? ''
            : (<Pagination count={countpage} color="primary"
              onChange={handleChangePage} />)}
        </div>
      </div>
    </div>
  )
}

export default App
