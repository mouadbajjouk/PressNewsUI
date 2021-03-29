import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const App = () => {
  const [loggedIn, setloggedIn] = useState(false);
  const [state, setState] = useState([]);
  const [insert, setInsert] = useState(false);
  const [put, setPut] = useState(false);
  const [_delete, setDelete] = useState(false);
  const [Id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const myHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'Application/json',
      Authorization: 'Basic ' + btoa(username + ':' + password),
      /* YWRtaW46YWRtaW4= */
    };

    const fetchData = async () => {
      try {
        const result = await axios.get(
          'https://localhost:44375/api/Categories',
          { headers: myHeaders }
        );
        const response = result.data;
        setState(response);
        return response;
      } catch (err) {
        console.error(err);
      }
    };

    const PostData = async (newCategory) => {
      try {
        const result = await axios.post(
          'https://localhost:44375/api/Categories',
          newCategory,
          { headers: myHeaders }
        );
      } catch (err) {
        console.error(err);
      }
    };

    const PutData = async (id, Category) => {
      try {
        const result = await axios.put(
          'https://localhost:44375/api/Categories/' + id,
          Category,
          { headers: myHeaders }
        );
      } catch (err) {
        console.error(err);
      }
    };

    const DeleteData = async (id) => {
      try {
        const result = await axios.delete(
          'https://localhost:44375/api/Categories/' + id,
          { headers: myHeaders }
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    if (insert) {
      const newCategory = {
        Name: document.querySelector('#name').value,
        ImagePath: document.querySelector('#image').value,
      };
      PostData(newCategory);
      setInsert(false);
    }

    if (put) {
      const Category = {
        Name: document.querySelector('#name').value,
        ImagePath: document.querySelector('#image').value,
      };
      PutData(Id, Category);
      setPut(false);
    }

    if (_delete) {
      DeleteData(Id);
      setDelete(false);
    }
  }, [insert, put, _delete]);

  const mapId = (info) => {
    setId(info.Id);
  };

  const getInfo = (info) => {
    setId(info.Id);
    document.querySelector('#name').value = info.Name;
    document.querySelector('#image').value = info.ImagePath;
  };

  const login = () => {
    setUsername(document.querySelector('#username').value);
    setPassword(document.querySelector('#password').value);
    setloggedIn(true);
  };

  return (
    <div className='container-fluid'>
      {loggedIn ? (
        <div className='row'>
          <div className='col-6'>
            {/* Records: {state.length}
          <button onClick={() => setInsert(!insert)}>
            UPDATE - {insert ? 'true' : 'false'}
          </button>
          <button onClick={() => setPut(!put)}>
            PUT - {put ? 'true' : 'false'}
          </button>
          <button onClick={() => setDelete(!_delete)}>
            DELETE - {_delete ? 'true' : 'false'}
          </button> */}
            <table border='1' id='customers'>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Delete</th>
              </tr>

              {state.map((s, index) => (
                <tr key={s.Id} onMouseOver={() => mapId(s)}>
                  <td>{s.Name ? s.Name : '----'}</td>
                  <td>{s.ImagePath ? s.ImagePath : '----'}</td>
                  <td>
                    <button
                      className='btn btn-primary mr-3'
                      onClick={() => getInfo(s)}>
                      Edit
                    </button>
                    <button
                      className='btn btn-danger'
                      onClick={() => setDelete(!_delete)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
          <div className='col-md-6'>
            <label>Name</label>
            <input type='text' id='name' className='form-control' /> <br />
            <label>Image</label>
            <input type='text' id='image' className='form-control' /> <br />
            <input
              type='submit'
              value='Add'
              onClick={() => setInsert(!insert)}
              className='btn btn-success mr-3'
            />
            <input
              type='submit'
              value='Update'
              onClick={() => setPut(!put)}
              className='btn btn-primary'
            />
          </div>
        </div>
      ) : (
        <form method='post' className='form-group'>
          <label>Username</label>
          <input
            type='text'
            id='username'
            placeholder=''
            className='form-control'
          />{' '}
          <br />
          <label>Password</label>
          <input
            type='password'
            id='password'
            placeholder=''
            className='form-control'
          />{' '}
          <br />
          <input
            type='submit'
            value='Login'
            className='btn btn-primary'
            onClick={() => login()}
          />
        </form>
      )}
    </div>
  );
};

export default App;
