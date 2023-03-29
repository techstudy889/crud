import React,{Component} from "react";
import {route,redirect} from "../Router";
import config from "../config/config.json"
export default class EditProduct extends Component{

//l 1 cycle
 constructor(props){
	super(props);
    this.state = {
            productname:"",
            quantity:"",
            price:"",
            discount:"",
			description:"",
			img:"",
            products:[],
			msg:"",
			
	}
 }
    render = () =>{
        return (
            <div>
              <h1>you can Edit your Product </h1>
			  
			  {this.state.msg}
            
              <form>
                    <p>ProductName : <input type="text" 
                    value={this.state.productname} 
               onChange= { (event)=> 
                    {this.setState({productname:event.target.value})}  
                    }/>
                   
                    </p>
                    <p>Quantity : <input type="text" value={this.state.quantity} 
                    onChange= {(event)=>{this.setState({quantity:event.target.value})}}/></p>
					
                    <p>Price: <input type="text" value={this.state.price} 
                    onChange= {(event)=>{this.setState({price:event.target.value})}}/></p>
					
					  <p>Discount: <input type="number" value={this.state.discount} 
                    onChange= {(event)=>{this.setState({discount:event.target.value})}}/></p>
					
                    <p>Discription: <input type="text" value={this.state.description} 
                    onChange= {(event)=>{this.setState({description:event.target.value})}}/></p>
					                    <p>Image Path: <input type="url" value={this.state.img} 
                   onChange= {(event)=>{this.setState({img:event.target.value})}}/></p>
					
               <input type="button" value="update" onClick={this.updateData}/>
			   </form>
            </div>
        )
    }
	componentDidMount(){
		let id =this.props.userId;
	
		let promise =fetch(config.LOCAL_URL+id).then((response)=>{
			
			if(response.ok){
				return response.json();
			}
		}).then((data)=>{
			this.setState({
				productname:data.productname,
				quantity:data.quantity,
		        price:data.price,
		        discount:data.discount,
				description:data.description,
			    img:data.img,
						
				
			});

    }).catch((error)=>{
        
	});
	}

updateData =() =>
{
	let id =this.props.userId;
	let updateUser ={
	productname:this.state.productname,
	quantity:this.state.quantity,
	price:this.state.price,
	discount:this.state.discount,
	description:this.state.description,
	img:this.state.img,
	
	}
	console.log(config);
	let promise = fetch(config.LOCAL_URL+id,{
	headers:{
		"Content-Type":"application/json"
	},
	method:"PUT",
	body:JSON.stringify(updateUser)
	}).then((response)=>{
		if(response.ok){
			return redirect('showproduct');
		}
	}).then((data)=>{
	
	}).catch((error)=>{
		
	});
}
}