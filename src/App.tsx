import axios from "axios"
import { useEffect, useState } from "react";

interface AppType {
  _id: number,
  name: string,
}

function App() {
  const [value, setValue] = useState('')
  const [info, setInfo] = useState([])
  const [idInfo, setIdInfo] = useState(0)
  const [isloading, setIsLoading] = useState(true)
  const getData = async () => {
    try{
      const {data} = await axios.get(`https://api-v2.elchocrud.pro/api/v1/99988ac71331de720d737303ac3ab74c/product-v1`)
      console.log(data);
      setInfo(data)
    } catch(e) {
        console.error(e);
        
      }
      finally {
        setIsLoading(false)
      }
  }
  const creatData = async () => {
    try{
      const {data} = await axios.post(`https://api-v2.elchocrud.pro/api/v1/99988ac71331de720d737303ac3ab74c/product-v1`, {
        name: value,
      })
      console.log(data);
      setInfo(data)
      
    } catch(e) {
        console.error(e);
        
      }
  }
  const editData = async () => {
    try{
      const {data} = await axios.patch(`https://api-v2.elchocrud.pro/api/v1/99988ac71331de720d737303ac3ab74c/product-v1/${idInfo}`, {
        name: value,
      })
      console.log(data);
      setValue('')
      getData()
      setIdInfo()
      
    } catch(e) {
        console.error(e);
        
      }
  }
  const detete = async () => {
    try{
      const {data} = await axios.delete(`https://api-v2.elchocrud.pro/api/v1/99988ac71331de720d737303ac3ab74c/product-v1/${idInfo}`)
      console.log(data);
      
    } catch(e) {
        console.error(e);
        
      }
  }



  useEffect(() => {
    getData()
  }, [])
  return (
    <div>
      <div className="">
        <button onClick={creatData}>Add</button>
        <input type="text" value={value} onChange={(e) => {setValue(e.target.value)}} name="name" />
        <div className="">
          {
           isloading === true ? "Loading..." : (info.map((el, idx) => (
              <div className="" key={idx}>
                <h1>{el.name}</h1>
                <button onClick={() => {editData();
                  setIdInfo(el._id)
                }}>edit</button>
                <button onClick={detete}>delete</button>
              </div>
            )))
          }
        </div>
      </div>
    </div>
  )
}
export default App
