import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import {
  fetchData,
  PostData,
  PutData,
  DeleteData,
  Login,
  DeleteItem,
  PostItem,
  PutItem,
} from './api';

const App = () => {
  const [loggedIn, setloggedIn] = useState(false);
  const [state, setState] = useState([]);
  const [itemState, setItemState] = useState([]);
  const [insert, setInsert] = useState(false);
  const [itemInsert, setItemInsert] = useState(false);
  const [put, setPut] = useState(false);
  const [itemPut, setItemPut] = useState(false);
  const [_delete, setDelete] = useState(false);
  const [_itemDelete, setItemDelete] = useState(false);
  const [Id, setId] = useState('');
  const [itemId, setItemId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    if (insert) {
      const newCategory = {
        Name: document.querySelector('#name').value,
        ImagePath: document.querySelector('#image').value,
      };
      PostData(newCategory).then(setInsert(false));
    }
    if (itemInsert) {
      const newItem = {
        Name: document.querySelector('#itemName').value,
        Text: document.querySelector('#itemText').value,
        Date: document.querySelector('#itemDate').value,
        LinkUrl: document.querySelector('#linkUrl').value,
        CategoryId: document.querySelector('#categoryId').value,
      };
      PostItem(newItem).then(setItemInsert(false));
    }

    if (put) {
      const Category = {
        Name: document.querySelector('#name').value,
        ImagePath: document.querySelector('#image').value,
      };
      PutData(Id, Category).then(setPut(false));
    }
    if (itemPut) {
      const Item = {
        Name: document.querySelector('#itemName').value,
        Text: document.querySelector('#itemText').value,
        Date: document.querySelector('#itemDate').value,
        LinkUrl: document.querySelector('#linkUrl').value,
        CategoryId: document.querySelector('#categoryId').value,
      };
      PutItem(itemId, Item).then(setItemPut(false));
    }

    if (_delete) {
      DeleteData(Id).then(setDelete(false));
    }

    if (_itemDelete) {
      DeleteItem(itemId).then(setItemDelete(false));
    }

    if (loggedIn) {
      const user = { username, password };
      Login(user).then((r) => {
        setState(r[0]);
        setItemState(r[1]);
      });
      //setState(response);
    }
  }, [
    insert,
    put,
    _delete,
    itemInsert,
    itemPut,
    _itemDelete,
    username,
    password,
    token,
    loggedIn,
  ]);

  const mapId = (info) => {
    setId(info.Id);
  };
  const mapItemId = (info) => {
    setItemId(info.Id);
    console.log('item id', info.Id);
  };

  const getInfo = (info) => {
    setId(info.Id);
    document.querySelector('#name').value = info.Name;
    document.querySelector('#image').value = info.ImagePath;
  };
  const getItemInfo = (info) => {
    setItemId(info.Id);
    document.querySelector('#itemName').value = info.Name;
    document.querySelector('#itemText').value = info.Text;
    document.querySelector('#itemDate').value = info.Date;
    document.querySelector('#linkUrl').value = info.LinkUrl;
    document.querySelector('#categoryId').value = info.CategoryId;
  };

  const login = (e) => {
    //e.preventDefault();
    setUsername(document.querySelector('#username').value);
    setPassword(document.querySelector('#password').value);
    const user = { username, password };
    //console.log(user);
    setloggedIn(true);
    //Login(user);
    //setloggedIn(true);
  };

  return (
    <div className='container-fluid'>
      {!loggedIn ? (
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
          />
          <br />
          <button
            value='Login'
            className='btn btn-primary'
            onClick={(e) => login(e)}>
            Login
          </button>
        </div>
      ) : (
        <div className='row'>
          <div className='col-md-6'>
            <h2>Categories</h2>
            <table border='1' id='customers'>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Image</th>
                <th>Function</th>
              </tr>

              {state.map((s, index) => (
                <tr key={s.Id} onClick={() => mapId(s)}>
                  <td>{s.Id ? s.Id : '----'}</td>
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
                      onClick={() => setDelete(true)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
          <div className='col-md-6'>
            <h2>CRUD</h2>
            <label>Name</label>
            <input type='text' id='name' className='form-control' /> <br />
            <label>Image</label>
            <input type='text' id='image' className='form-control' /> <br />
            <input
              type='submit'
              value='Add'
              onClick={() => setInsert(true)}
              className='btn btn-success mr-3'
            />
            <input
              type='submit'
              value='Update'
              onClick={() => setPut(true)}
              className='btn btn-primary'
            />
          </div>

          <div className='col-md-6'>
            <h2>Items</h2>
            <table border='1' id='customers'>
              <tr>
                <th>Name</th>
                <th>Text</th>
                <th>Date</th>
                <th>Link</th>
                <th>Category Id</th>
                <th>Function</th>
              </tr>

              {itemState.map((s, index) => (
                <tr key={s.Id} onClick={() => mapItemId(s)}>
                  <td>{s.Name ? s.Name : '----'}</td>
                  <td>{s.Text ? s.Text : '----'}</td>
                  <td>{s.Date ? s.Date : '----'}</td>
                  <td>{s.LinkUrl ? s.LinkUrl : '----'}</td>
                  <td>{s.CategoryId ? s.CategoryId : '----'}</td>
                  <td>
                    <button
                      className='btn btn-primary mr-3'
                      onClick={() => getItemInfo(s)}>
                      Edit
                    </button>
                    <button
                      className='btn btn-danger'
                      onClick={() => setItemDelete(true)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
          <div className='col-md-6'>
            <h2>CRUD</h2>
            <label>Name</label>
            <input type='text' id='itemName' className='form-control' /> <br />
            <label>Text</label>
            <input type='text' id='itemText' className='form-control' /> <br />
            <label>Date</label>
            <input type='text' id='itemDate' className='form-control' /> <br />
            <label>Link Url</label>
            <input type='text' id='linkUrl' className='form-control' /> <br />
            <label>Category Id</label>
            <input type='text' id='categoryId' className='form-control' />{' '}
            <br />
            <input
              type='submit'
              value='Add'
              onClick={() => setItemInsert(true)}
              className='btn btn-success mr-3'
            />
            <input
              type='submit'
              value='Update'
              onClick={() => setItemPut(true)}
              className='btn btn-primary'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
