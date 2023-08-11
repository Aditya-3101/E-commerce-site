import React from "react";
import { Outlet } from "react-router-dom";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

export function AuthLayout() {
	const data = useSelector((state) => state.Item);

	if(data.length===0){
		return <Navigate to="/" />
	}
	return <Outlet/>
	
}
