import axios from 'axios';
import { useState, useEffect } from 'react';

let token;

const myHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Content-type': 'Application/json',
  Authorization: '',
  //Authorization: 'Basic ' + btoa(username + ':' + password),
  /* YWRtaW46YWRtaW4= */
};

export const fetchData = async () => {
  try {
    console.log('token is ', token);
    myHeaders.Authorization = 'Basic ' + token;
    const result = await axios.get('https://localhost:44375/api/Categories', {
      headers: myHeaders,
    });
    const response = result.data;
    //console.log('fatch res ', response);
    //setState(response);
    return response;
  } catch (err) {
    console.error(err);
  }
};
export const fetchItems = async () => {
  try {
    console.log('token is ', token);
    myHeaders.Authorization = 'Basic ' + token;
    const result = await axios.get('https://localhost:44375/api/Items', {
      headers: myHeaders,
    });
    const response = result.data;
    //console.log('fatch res ', response);
    //setState(response);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const PostData = async (newCategory) => {
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
export const PostItem = async (newItem) => {
  try {
    const result = await axios.post(
      'https://localhost:44375/api/Items',
      newItem,
      { headers: myHeaders }
    );
  } catch (err) {
    console.error(err);
  }
};

export const PutData = async (id, Category) => {
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
export const PutItem = async (id, Item) => {
  try {
    const result = await axios.put(
      'https://localhost:44375/api/Items/' + id,
      Item,
      { headers: myHeaders }
    );
  } catch (err) {
    console.error(err);
  }
};

export const DeleteData = async (id) => {
  try {
    const result = await axios.delete(
      'https://localhost:44375/api/Categories/' + id,
      { headers: myHeaders }
    );
  } catch (err) {
    console.error(err);
  }
};
export const DeleteItem = async (id) => {
  try {
    const result = await axios.delete(
      'https://localhost:44375/api/Items/' + id,
      { headers: myHeaders }
    );
  } catch (err) {
    console.error(err);
  }
};

export const Login = async (user) => {
  try {
    const result = await axios.post(
      'https://localhost:44375/api/Account',
      user,
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'Application/json',
        //Authorization: 'Basic ' + btoa(user.username + ':' + user.password),
      }
    );
    token = result.data;
    const res = [await fetchData(), await fetchItems()];
    return res;
  } catch (err) {
    console.error(err);
  }
};
