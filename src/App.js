import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import fetchData from './api';

const App = () => {
  const [loggedIn, setloggedIn] = useState(false);
  const [state, setState] = useState([]);
  const [insert, setInsert] = useState(false);
  const [put, setPut] = useState(false);
  const [_delete, setDelete] = useState(false);
  const [Id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    var response = fetchData();
    setState(response);

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

    if (loggedIn) {
      const user = { username, password };
      console.log('ef ', user);
      Login(user);
    }
  }, [insert, put, _delete, username, password, token, loggedIn]);

  const mapId = (info) => {
    setId(info.Id);
  };

  const getInfo = (info) => {
    setId(info.Id);
    document.querySelector('#name').value = info.Name;
    document.querySelector('#image').value = info.ImagePath;
  };

  const login = (e) => {
    //e.preventDefault();
    setUsername(document.querySelector('#username').value);
    setPassword(document.querySelector('#password').value);
    const user = { username, password };
    console.log(user);
    setloggedIn(!loggedIn);
    //Login(user);
    //setloggedIn(true);
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-6'>
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
      <div className='form-group'>
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
        <button
          value='Login'
          className='btn btn-primary'
          onClick={(e) => login(e)}>
          Login
        </button>
      </div>
    </div>
  );
};

export default App;
