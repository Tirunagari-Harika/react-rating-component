import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import "./Rectangle.css";
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

const StyleWrapper = styled.div`
    
    transform:rotateY(180deg);   

    .rectangle:hover, .rectangle:hover ~ .rectangle{  
        cursor:pointer;      
        background-image: ${props => 
            "linear-gradient(90deg," + props.selectedColor + " 100%," + props.emptyColor + " 0%)"}        
    }

    .ratingClass{
        background-image: ${props => 
                    "linear-gradient(90deg," + props.selectedColor + " 100%," + props.emptyColor + " 0%)"}
    }

    .emptyClass{
        background-image: ${props => 
                    "linear-gradient(90deg," + props.selectedColor + " 0%," + props.emptyColor + " 0%)"}
    }
   
`

class Rectangle extends Component{
    state = {
        maxRating:parseInt(this.props.maxRating),
        currentRating:parseInt(this.props.currentRating),           
    }   

    markRate = (id) => {       
        this.setState({currentRating:parseInt(id)},() => {
            console.log("Current ",this.state.currentRating);
            this.props.updateRating(this.state.currentRating);
        });
    }    

    addRate = (id) => {        
        if(id <= this.state.currentRating){           
            return "ratingClass";
        }
        else if(id > this.state.currentRating){           
            return "emptyClass";           
        }   
        
    }

    
    createRating = () => {
        let arr = [];
        
        for(let i=this.state.maxRating; i>=1; i--){
            let styleClass = ["rectangle"];
            let addRate = this.addRate(i);
            styleClass.push(addRate);
            
            arr.push(<Tooltip title={i} placement="top" TransitionComponent={Zoom}
                         key={i-1}>
                <div className={[...styleClass].join(" ")} 
                    id={i}                                            
                    onClick={(event) => this.markRate(event.currentTarget.id)}>
                </div>
             </Tooltip>)
        }
        return arr;
    }

    render(){
        return (
         <StyleWrapper selectedColor={this.props.selectedColor}
                emptyColor={this.props.emptyColor}>
                {this.createRating()}
        </StyleWrapper>  
            
        )
    }
}

export default Rectangle;

Rectangle.propTypes = {
    maxRating: PropTypes.number,
    currentRating: PropTypes.number,
    selectedColor: PropTypes.string,
    emptyColor:PropTypes.string,
    updateRating:PropTypes.func.isRequired
};

Rectangle.defaultProps = {
    maxRating:5,
    currentRating:0,
    selectedColor:"#bec314",
    emptyColor:"transparent"
} 

