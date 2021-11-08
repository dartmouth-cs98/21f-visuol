/* eslint-disable react/button-has-type */
import React, { PureComponent } from 'react';
import axios from 'axios';

class Home extends PureComponent {
  render() {
    return (
      <div>
        <h1>Home Page (Fill this in later)</h1>
        <button onClick={() => {
          const token = localStorage.getItem('token');
          axios.post('http://localhost:5000/api_v1/authtest', {}, {
            headers: {
              Authorization: token,
              isHeaderPresent: 'test',
            },
          }).then((resp) => {
            console.log(resp.data);
          })
            .catch((err) => { console.log(err); });
        }}
        >
          Test
        </button>
      </div>
    );
  }
}

export default Home;
