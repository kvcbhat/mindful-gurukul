import React, { useEffect, useState } from 'react';
import { Table, Button, Dropdown ,Input} from 'semantic-ui-react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Read() {
    const [APIData, setAPIData] = useState([]);
    const [sortOption, setSortOption] = useState(localStorage.getItem('sortOption') || 'A-Z');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(`https://65225df6f43b179384146c7e.mockapi.io/userData`)
            .then((response) => {
                setAPIData(response.data);
            });
    }, []);

    useEffect(() => {
        let sortedData = [...APIData];
        switch(sortOption) {
            case 'A-Z':
                sortedData.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'Z-A':
                sortedData.sort((a, b) => b.name.localeCompare(a.name));
                break;
                case 'Last modified':
                  sortedData.sort((a, b) => new Date(b.modifiedDate) - new Date(a.modifiedDate));
                  break;
              case 'Last Inserted':
                  sortedData.sort((a, b) => b.id - a.id);
                  break;
              default:
                  break;
        }
        setAPIData(sortedData);
    }, [sortOption]);
   
    const filteredData = APIData.filter(data => {
      
      return (
          data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          data.mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
          data.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
          setLoading(false)
      );
  });

    const handleSortChange = (value) => {
        setSortOption(value);
        localStorage.setItem('sortOption', value);
    };

    const setData = (data) => {
        let { id, name, email, mobile } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('Name', name);
        localStorage.setItem('Email', email);
        localStorage.setItem('Mobile', mobile);
    };

    const onDelete = (id) => {
        axios.delete(`https://65225df6f43b179384146c7e.mockapi.io/userData/${id}`)
            .then(() => {
                getData();
            });
    };

    const getData = () => {
        axios.get(`https://65225df6f43b179384146c7e.mockapi.io/userData`)
            .then((getData) => {
                setAPIData(getData.data);
            });
    };

    const navigate = useNavigate();

    return (
        <div>
          {loading === false &&
          <>
            <h2 className='main-header'>User data</h2>
            <Input 
                placeholder='Search by Name, Mobile, or Email...' 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
            />
  
            <Dropdown
                 style={{ marginLeft: '20px' }}
                placeholder='Select Filter'
                selection
                value={sortOption}
                options={[
                    { key: 'A-Z', value: 'A-Z', text: 'A-Z' },
                    { key: 'Z-A', value: 'Z-A', text: 'Z-A' },
                    { key: 'Last modified', value: 'Last modified', text: 'Last modified' },
                    { key: 'Last Inserted', value: 'Last Inserted', text: 'Last Inserted' }
                ]}
                onChange={(e, { value }) => handleSortChange(value)}
            />

            <Table singleLine>
            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Email</Table.HeaderCell>
                                    <Table.HeaderCell>Mobile No</Table.HeaderCell>
                                    <Table.HeaderCell>Update</Table.HeaderCell>
                                    <Table.HeaderCell>Delete</Table.HeaderCell>
                                </Table.Row>
                      </Table.Header>

                      <Table.Body>
                                  {filteredData.map((data) => {
                                    return (
                                      <Table.Row>
                                          <Table.Cell>{data.name}</Table.Cell>
                                          <Table.Cell>{data.email}</Table.Cell>
                                          <Table.Cell>{data.mobile}</Table.Cell>          
                                          <Link to='/update'>
                                          <Table.Cell><Button onClick={() => setData(data)} >Update</Button></Table.Cell>
                                          </Link>
                                          <Table.Cell> <Button onClick={() => onDelete(data.id)}>Delete</Button></Table.Cell>
                                      </Table.Row>
                                  )})}

                      </Table.Body> 
            </Table>

            <Button onClick={() => navigate('/dashboard')}>Go back</Button>
            </>
         }
        </div>
    );
}

export default Read;


