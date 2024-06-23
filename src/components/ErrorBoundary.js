import React from 'react'

export class ErrorBoundary extends React.Component{

    constructor(){
        super()
        this.state = {hasError:false};
    }

    componentDidCatch(error, errorInfo){
        this.setState({hasError:true});
        console.error(errorInfo)
    }

    render(){
        if(this.state.hasError){
            return <div>Something went wrong!</div>
        }

        return this.props.children
    }

}