import axios from 'axios';
import { useState, useEffect } from 'react';

const myHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Content-type': 'Application/json',
  Authorization: 'Basic ' + token,
  //Authorization: 'Basic ' + btoa(username + ':' + password),
  /* YWRtaW46YWRtaW4= */
};

export default fetchData = async () => {
  try {
    const result = await axios.get('https://localhost:44375/api/Categories', {
      headers: myHeaders,
    });
    const response = result.data;
    //setState(response);
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
const Login = async (user) => {
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
    const token = result.data;
    setToken(token);
    console.log('this is your token ', token);
    fetchData();
  } catch (err) {
    console.error(err);
  }
};
