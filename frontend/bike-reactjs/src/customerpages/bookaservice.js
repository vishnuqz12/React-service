import React from 'react';
import axios from 'axios';
import {Button,Form,FormGroup} from 'react-bootstrap';

class BookAService extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            name : this.props.name,
            BikeModel : this.props.BikeModel,
            BikeNumber : this.props.BikeNumber,
            ServiceType : this.props.SeriviceType,
            phoneNumber: this.props.phoneNumber,
            Date:this.props.Date,
            responseBody:''
        };
        this.onChange= this.onChange.bind(this);
        this.bookings=this.bookings.bind(this);
    }

    onChange(e){
        if(e.target.id === 'name'){
            this.setState((state)=>({
                ...this.state,
                'name':e.target.value
            }));
        }

        if(e.target.id === 'phoneNumber'){
            this.setState((state)=>({
                ...this.state,
                'phoneNumber':e.target.value
            }));
        }
        
        if(e.target.id === 'bikeModel'){
            this.setState({
                ...this.state,
                'BikeModel':e.target.value
            });
        }

        if(e.target.id === 'bikeNumber'){
            this.setState({
                ...this.state,
                'BikeNumber':e.target.value
            });
        }

        if(e.target.id === 'ServiceType'){
            this.setState({
                ...this.state,
                'ServiceType':e.target.value
            });
        }

        if(e.target.id === 'date'){
            this.setState({
                ...this.state,
                'Date': e.target.value
            });
        }

    }

    bookings(){
        let values = {
            url:"/customer/bookaservice",
            method:"POST",
            data : {
                name : this.state.name,
                phoneNumber: this.state.phoneNumber,
                BikeModel : this.state.BikeModel,
                BikeNumber : this.state.BikeNumber,
                ServiceType : this.state.ServiceType,
                Date:this.state.Date
            }
        };
;
        axios(values).then((booking)=>{
         
             this.setState((state)=>({
                 responseBody:booking.data
             }));
        }).catch((err)=>{
            console.log(err);
        });
    }

    render(){
        return(
            <div>
            <Form>
            <FormGroup>
                <Form.Label>Name</Form.Label>
                <Form.Control id="name" value={this.state.name} onChange={this.onChange}></Form.Control>
            </FormGroup>
                <FormGroup>
                   <Form.Label>phoneNumber</Form.Label>
                   <Form.Control id="phoneNumber" value={this.state.phoneNumber} onChange={this.onChange}></Form.Control>
               </FormGroup>
               <FormGroup>
                   <Form.Label>BikeModel</Form.Label>
                   <Form.Control id="bikeModel" value={this.state.BikeModel} onChange={this.onChange}></Form.Control>
               </FormGroup>
               <FormGroup>
                   <Form.Label>BikeNumber</Form.Label>
                   <Form.Control id="bikeNumber" value={this.state.BikeNumber} onChange={this.onChange}></Form.Control>
               </FormGroup>
                <FormGroup>
                    <Form.Label>ServiceType</Form.Label>
                    <Form.Control id="ServiceType" value={this.state.ServiceType} onChange={this.onChange}></Form.Control>
                </FormGroup>
                <FormGroup>
                    <Form.Label>Date</Form.Label>
                    <Form.Control id="date" value={this.state.Date} onChange={this.onChange}></Form.Control>
                </FormGroup>  
             </Form>
             <Button onClick={this.bookings}>Book Service</Button> <br />

                {this.state.responseBody}
                
            </div>
        )
    }
}

export default BookAService;