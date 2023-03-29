import React,{Component} from "react";
import {route,redirect} from "../Router";
export default class ShowProducts extends Component{
	
	//mounting state
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

	
	componentDidMount(){
		
		console.log('This is Update state : 2nd Cycle');
		
		const url = 'http://localhost:5000/products/';
		
		/************Start of Promise Fetch Api ***************/
		
		let promise = fetch(url);
		promise.then((response)=>{
			return response.json();
		}).then((data)=>{
			//Object Json
			if(Array.isArray(data)){
				console.log('run');
				
				this.setState({
					products:data	
				})
			}

		}).catch((error)=>{
			console.log(error);
		})
		
		/************End of Promise Fetch Api ***************/
	}
	
	componentWillMount(){		
		console.log("Unmounted is 3rd cycle");
	}
	
    render = () =>{
		console.log(this.state.products,"render");
        return (
            <div>
			
               <h1>Show Products gere</h1>
			   {this.state.msg}
			   <table border="1" rules="all">
			   <thead>
			   <tr>
					<th>#</th>
					<th>ProductName</th>
					<th>Quantity</th>
					<th>Price</th>
					<th>Discount</th>
					<th>Description</th>
					<th>ImagePath</th>
					<th>Edit Product</th>
					<th>Delete Product</th>
				</tr>
			   </thead>
			   <tbody>
						{this.getRecords()}

			   </tbody>
			   </table>
			   						
            </div>
        )
    }
	
	getRecords = () =>{
		
		return this.state.products.map((item,index)=>{
			return (
			<tr key={item.id}>
				<td>{item.id}</td>
				<td>{item.productname}</td>
				<td>{item.quantity}</td>
				<td>{item.price}</td>
				<td>{item.discount}</td>
				<td>{item.description}</td>
				<td>{item.img}</td>

				<td><button type="button" onClick={()=>{this.editProduct(item.id)}}>ReOrder Product</button></td>
				<td><button type="button" onClick={()=>{this.deleteProduct(item.id,index)}}>Cancel Product </button></td>
			</tr>
			 )
		})
	}
		deleteProduct = (id,index) => {
			
			if(window.confirm('Are you sure to cancel Product?')){
				console.log(id);
				 const url = 'http://localhost:5000/products/'+id;

	
	
    let promise = fetch(url,{
        headers:{
            "Content-Type":"application/json",
        },
        method:"DELETE",
       
    });
    promise.then((response)=>{
        if(response.ok){
			let userData = [...this.state.products];
			userData.splice(index,1);
			this.setState({
			
				products:userData,
				msg:<span className="success">product deleted Successfully</span>
				
			});
		
					setTimeout(()=>{
				this.setState({
					msg:""
				});
			},3000)
		return redirect('showproduct');	
	}
    }).then((data)=>{
        console.log(data)

    }).catch((error)=>{
        console.log(error);
		
		this.setState({

				msg:<span className="error">Oops! Something here...</span>
				
			});
			let ID1 = setTimeout(()=>{
				this .setState({
					msg:"",
				});
			},5000);
	
    });



  }
		}

		editProduct =(id) =>{
			return redirect('editproduct/'+id);
		}
}
		

	
