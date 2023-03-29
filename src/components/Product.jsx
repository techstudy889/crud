import React,{Component} from "react";
import {route,redirect} from "../Router";

export default class Product extends Component{

//lifecycle :mounting state 1 cycle
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
              <h1>Products</h1>
			  
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
					
					  <p>Discount: <input type="text" value={this.state.discount}onChange= {(event)=>
					  {this.setState({discount:event.target.value})}}/></p>
					  <p>Description: <input type="text" value={this.state.description}onChange= 
					  {(event)=>{this.setState({description:event.target.value})}}/></p>
					   <p>Image Path: <input type="url" value={this.state.img}onChange= 
					  {(event)=>{this.setState({img:event.target.value})}}/></p>
                   
                    <input type="button" value="save" 
                   
                    onClick={this.saveData}/> 
              </form>
            </div>
        )
    }

  saveData = () => {
    const url = 'http://localhost:5000/products/';

	let newObject = {
		productname:this.state.productname,
		quantity:this.state.quantity,
		price : this.state.price,
		discount:this.state.discount,
		description:this.state.description,
		img:this.state.img,
	}
	
    let promise = fetch(url,{
        headers:{
            "Content-Type":"application/json",
        },
        method:"POST",
        body:JSON.stringify(newObject),
    });
    promise.then((response)=>{
        if(response.ok){
			this.setState({
				productname:"",
				quantity:"",
				price:"",
				discount:"",
				description:"",
				img:"",
				msg:<span className="success">Product order Successfully</span>
				
			});
			
					return redirect('showProducts');
			
	}
    }).then((data)=>{
        console.log(data)

    }).catch((error)=>{
        console.log(error);
		
		this.setState({

				msg:<span className="error">404 page not found</span>
				
			});
			let ID1 = setTimeout(()=>{
				this .setState({
					msg:"",
				});
			},5000);
	
    });



  }
}