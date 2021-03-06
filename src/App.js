import React, { useState } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
 
function App() {
  const [allValue,SetAllValue]= useState({
    name:"",
    job:""
  })

  const { name, job}= allValue;
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);
 
function dataChange (e){
  e.preventDefault();
 SetAllValue({...allValue, [e.target.name]: e.target.value})
} 

  const handleSubmit = () => {
    setLoading(true);
    setIsError(false);
    const data = {
      name: name,
      job: job
    }
    axios.post('https://reqres.in/api/users', data).then(res => {
      setData(res.data);
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      setIsError(true);
    });
  }
 
  return (
    <div className="container p-3">
      <h5 className="d-inline-block mb-3">POST request using axios with React Hooks </h5>
      <div style={{ maxWidth: 350 }}>
        <div classNames="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter name"
            
            onChange={dataChange} />
        </div>
        <div classNames="form-group">
          <label htmlFor="job" className="mt-2">Job</label>
          <input
            type="text"
            className="form-control"
            id="job"
            name="job"
            placeholder="Enter job"
            
            onChange={dataChange} />
        </div>
        {isError && <small className="mt-3 d-inline-block text-danger">Something went wrong. Please try again later.</small>}
        <button
          type="submit"
          className="btn btn-primary mt-3"
          onClick={handleSubmit}
          disabled={loading}
        >{loading ? 'Loading...' : 'Submit'}</button>
        {data && <div className="mt-3">
          <strong>Output:</strong><br />
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
        }
      </div>
    </div>
  );
}
 
export default App;