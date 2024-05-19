import { useState } from 'react'
import './App.css'
import { FaSearch } from "react-icons/fa";

function App() {
  const [search, setSearch] = useState('');
  const [dataimage,setDataimage]=useState('');

  return (
    <div className="container">
      <div class="row mt-5">
        <div class="col">
        </div>
        <div class="col-10">
          <div class="input-group input-group-lg">
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" name='search' placeholder='กรองข้อความเพื่อค้นหาข้อมูล' value={search} onChange={(e)=>setSearch(e.target.value)} />
            <span class="input-group-text" id="inputGroup-sizing-lg" role='button' >
              <FaSearch />
            </span>
          </div>
        </div>
        <div class="col">
        </div>
      </div>
    </div>
  )
}

export default App
