import React, { useState,useEffect } from 'react';
import { Button, Checkbox, Form, FormGroup } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Update() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState(false);
    const [id, setID] = useState(null);
    const navigate = useNavigate();

useEffect(() => {
        setID(localStorage.getItem('ID'))
        setName(localStorage.getItem('Name'));
        setEmail(localStorage.getItem('Email'));
        setMobile(localStorage.getItem('Mobile'))
}, []);
const updateAPIData = () => {

  axios.put(`https://65225df6f43b179384146c7e.mockapi.io/userData/${id}`, {
      name,
      email,
      mobile

})
.then(response => {
    console.log("Inside the .then block");
    navigate('/read');
})
.catch(error => {
    console.error("Error posting data:", error);
  });
}

    return (
        <div>
<Form className="create-form" onSubmit={updateAPIData}>
                <FormGroup widths={'equal'}>
                    <Form.Field>
                        <label>Name</label>
                        <input placeholder=' Name' value={name} onChange={(e) => setName(e.target.value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <input placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Field>
                </FormGroup>
                <Form.Field>
                <label>Mobile no</label>
                    <input placeholder='mobile no' value={mobile} onChange={(e) => setMobile(e.target.value)}/>
                </Form.Field>
                <Button type='submit' >Update</Button>
            </Form>
        </div>
    )
}
export default Update;
