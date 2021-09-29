import React from 'react';
import axios from 'axios';
import axiosReq from './../utils/axioslib';
import {Table, Button, Form, FormGroup} from 'react-bootstrap';


class StatusUpdate extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            phoneNumber:props.phoneNumber,
            bookingID:props.bookingID,
            status:props.status,
            responseBody:''
        };
        this.statusChange=this.statusChange.bind(this);
        this.update=this.update.bind(this);
    }

    update(e){
        if(e.target.id === "phoneNumber"){
            this.setState((state)=>({
                ...this.state,
                'phoneNumber':e.target.value
            }));
        }
        if(e.target.id === 'bookingID'){
            //console.log('bookingid', e.target.value);
            this.setState((state)=>({
                ...this.state,
                'bookingID':e.target.value
            }));
        }

        if(e.target.id === 'select'){
    
            this.setState((state)=>({
                ...this.state,
                'status':e.target.value
            }));
        }
    }
    

    async statusChange(){
        let option = {
            url : `/serviceowner/updatecustomerstatus`,
            method: "PUT",
            params:{
                phoneNumber:this.state.phoneNumber,
                bookingID:this.state.bookingID,
                status:this.state.status
            }
        };
        let httpResponse = await axiosReq(option);
        //console.log(httpResponse);
        this.setState({
            ...this.state,
            responseBody: httpResponse
        });

    }

    render(){
        return(
               <div>
               <Form>
               <FormGroup>
                   <Form.Label>phoneNumber</Form.Label>
                   <Form.Control id="phoneNumber" value={this.state.phoneNumber} onChange={this.update}></Form.Control>
               </FormGroup>
               <FormGroup>
               <Form.Label>Booking ID</Form.Label>
                <Form.Control  id="bookingID"  value={this.state.bookingID} onChange={this.update}></Form.Control>
               </FormGroup>
               <FormGroup >
               <Form.Label>Service Status</Form.Label>
               <Form.Control as="select" name="status" id="select"  value={this.state.status} onChange={this.update}>
                    <option value="pending">work pending</option>
                    <option value="readyfordelivery">ready for delivery</option>
                    <option value="completed">service completed</option>
               </Form.Control>
               </FormGroup>
                   
                 </Form>   
                 <Button onClick={this.statusChange}>click to updateStatus</Button> <br />
                    {this.state.responseBody}

               </div>
        )
    }
}

export default StatusUpdate;

function callBackend(options) {

    return new Promise((resolve, reject)=>{

        axios(options).then((axiosResponse)=> {
            resolve(axiosResponse.data)
        }).catch((err) => {
            reject(err);
        })

    })

}