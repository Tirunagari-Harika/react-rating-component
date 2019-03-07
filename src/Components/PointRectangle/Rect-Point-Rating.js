import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./Rect-Point-Rating.css";
import styled from "styled-components";

const generateLinearGradient = (props) => {
    console.log("Linear Gradient ");   
    console.log(props);
    return "linear-gradient(" + props.direction +"deg," + 
                    props.selectedBackground.color + " " + props.selectedBackground.percent + "%," +
                    props.emptyBackground.color + " " + props.emptyBackground.percent + "%)"
}

const LinearGradient = styled.span`
    .rating{
        background-image: ${props => generateLinearGradient(props.gradientObj)}                
    }
`



class RectPointRating extends Component{   
    rectObj = {percent1:0,percent2:0};
    state = {};
    
    constructor(props){
        super(props);                    
        this.rectObj.direction = this.getAngle(this.props.direction);        
        this.maxRating = parseInt(this.props.maxRating);       
    }

    getAngle = (direction) => {
        switch(direction){
            case "top": return -180;
            case "bottom": return 0;
            case "left": return 90;
            case "right": return -90;
        }
    }

    static getDerivedStateFromProps(props,state){
        let currentRating = Number(props.currentRating).toPrecision(2);
        currentRating = parseFloat(currentRating);        
        return {currentRating:currentRating};
    }
   
    addRate = (id) => {
        let rating = parseInt(this.state.currentRating);
        let decimal = (this.state.currentRating * 10)%10;          

        if(id <= rating){           
           this.rectObj.percent1 = 100;
           this.rectObj.percent2 = 0;          
        }
        else if(id == rating+1  && decimal !== 0){
            let i = decimal*10;           
            this.rectObj.percent1 = i;
            this.rectObj.percent2 = i;           
        }
        else if(id > rating){          
          this.rectObj.percent1 = 0;
          this.rectObj.percent2 = 0;          
        }       
      
    }

    generateGradientObj = () => {
        let gradientObj = {
            direction:this.rectObj.direction,
            selectedBackground:{
                color:this.props.selectedColor,
                percent: this.rectObj.percent1
            },
            emptyBackground:{
                color:this.props.emptyColor,
                percent:this.rectObj.percent2
            }
        }

        return gradientObj;
    }


    createRating = () => {       
        let arr = [];        
        for(let i=0; i<this.maxRating; i++){
            this.addRate(i+1); 
            let gradientObj = this.generateGradientObj();           
            arr.push(<LinearGradient gradientObj={gradientObj} key={i}>     
                <div className="rectangle rating"                        
                        id={i+1}></div>
            </LinearGradient>);
        }       
        return arr;
    }

    render(){     
        return (<div>{this.createRating()}</div>)
    }
}

export default RectPointRating;

RectPointRating.propTypes = {
    maxRating: PropTypes.number,
    currentRating: PropTypes.number,
    selectedColor: PropTypes.string,
    emptyColor:PropTypes.string,
    direction:PropTypes.string   
}

RectPointRating.defaultProps = {    
    selectedColor:"#bec314",
    emptyColor:"transparent",
    direction:"left",
    currentRating:0,
    maxRating:5
}
