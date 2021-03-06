import React from 'react';
import axios from 'axios';
import {Table, Button,FormGroup,Form} from 'react-bootstrap';


class ListAll extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            phoneNumber:props.phoneNumber,
            responseBody:[],
            showResults: false
        };
        this.viewDetails = this.viewDetails.bind(this);
        this.fetchdetails =this.fetchdetails.bind(this);
    }

    fetchdetails(e){
        if(e.target.id === 'phoneNumber'){
            this.setState((state) => ({
                ...this.state,
                phoneNumber:e.target.value
            }));
        }
    }

    viewDetails(){
        let option = {
            url:'/serviceowner/viewbookingdetails',
            method:"GET",
            params: {
                phoneNumber:this.state.phoneNumber
            }
        }

        axios(option).then((details)=>{
         
            this.setState((state)=>({
                ...this.state,
                 responseBody:details.data,
                 showResults: true
            }));
        }).catch((err)=>{
            console.log(err);
        });
    }

    render(){
        const showResults = this.state.showResults;
        return (
            <div>
                <Form>
                    <FormGroup>
                    <Form.Label>phoneNumber</Form.Label>
                     <Form.Control type="text" id="phoneNumber" value={this.state.phoneNumber} onChange={this.fetchdetails}></Form.Control>
                    </FormGroup>
                </Form>
                
                <Button onClick={this.viewDetails}>Show</Button>
                {showResults ? 
                <div>

                <h6>Name of Customer: {this.state.responseBody.name}</h6>
                <h6>Email: {this.state.responseBody.email}</h6>
                <h6>phoneNumber: {this.state.responseBody.phoneNumber}</h6>
                
                       
                 <Table striped bordered hover>
                    <thead>
                        
                        <td>
                            BikeModel
                        </td>
                        <td>
                            BikeNumber
                        </td>
                        <td>
                            Type of service
                        </td>
                        <td>
                            BookingID
                        </td>
                        <td>
                            Status
                        </td>
                    </thead>
                    <tbody>
                      {this.state.responseBody.bookings.map(function(x, index){
                          return (
                              <tr>
                                  <td>
                                  {x.BikeModel} 

                                  </td>
                                  <td>
                                  {x.BikeNumber}
                                      
                                  </td>
                                  <td>
                                  {x.ServiceType} 

                                  </td>
                                  <td>
                                  {x.bookingID} 

                                  </td>
                                  <td>
                                  {x.status}
                                  </td>
                              </tr>
                          )
                      })}
                    </tbody>
                   
                </Table>
                </div>
                : ''
               }
            </div>
            
        )
    }
}

export default ListAll;