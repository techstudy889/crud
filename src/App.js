import React,{Component} from "react";


import Home from "./components/Home";
import Header from "./components/Header";

import EditProduct from "./components/EditProduct";
import ShowProducts from "./components/ShowProducts";
import Product from "./components/Product";
import {route} from "./Router";
import config from  "./config/config.json";
export default class App extends Component{
	
	constructor(props){
		super(props)
	this.id=window.localStorage.getItem('hash').split('/')[1];
	this.view ={
		home:<Home/>,
		createproduct:<Product/>,
		showproduct:<ShowProducts/>,
		["editproduct/"+this.id]:<EditProduct userId={this.id}/>
	}
	
	}
	componentDidMount(){
		
		console.log("this method is running from app.jsx")
	}
	renderView = () => {
	return this.view[route];
}
render = () => {
return(
<React.Fragment>

<Header/>
{this.renderView()}

</React.Fragment>
)
}

}