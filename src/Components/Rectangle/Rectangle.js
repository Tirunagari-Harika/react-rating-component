import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import "./Rectangle.css";

class Rectangle extends Component{    
    backgrounds = {};

    constructor(props){
        super(props);        
        this.backgrounds = {
            selectBackground: this.generateLinearGradient(90,this.props.selectedColor,100,this.props.emptyColor,0),
            emptyBackground: this.generateLinearGradient(90,this.props.selectedColor,0,
                this.props.emptyColor,0)
        };
        this.state = {
            maxRating:parseInt(this.props.maxRating),
            currentRating:parseInt(this.props.currentRating),           
        }
    }

    markRate = (id) => {
        this.setState({currentRating:parseInt(id)},() => {
           console.log("Current ",this.state.currentRating);
            this.props.updateRating(this.state.currentRating);
        });
    }

    generateLinearGradient = (angle,color1,percent1,color2,percent2) => {
        let backgroundStyle = [];
        backgroundStyle.push(angle + "deg");
        backgroundStyle.push(color1 + " " + percent1 +"%");
        backgroundStyle.push(color2 + " " + percent2 + "%");

        let b = "linear-gradient(" + [...backgroundStyle].join(",") + ")";
        return b;
    }

    addRate = (id) => {      
        if(id <= this.state.currentRating){ 
            return {backgroundImage:this.backgrounds.selectBackground};       
        }
        else if(id > this.state.currentRating){  
            return {backgroundImage:this.backgrounds.emptyBackground};                
        }       
    }

    selectionEnter = (id) => {        
        for(let i=1; i<=id; i++){
            ReactDOM.findDOMNode(this.refs[i]).style.backgroundImage =  this.backgrounds.selectBackground;
        }       
    }

    selectionLeave = (id) => {
        if(this.state.currentRating){
            for(let i=1; i<=this.state.currentRating; i++){              
                ReactDOM.findDOMNode(this.refs[i]).style.backgroundImage = this.backgrounds.selectBackground;
            }
        }        
        
        for(let j=this.state.currentRating+1; j<=this.state.maxRating; j++){           
            ReactDOM.findDOMNode(this.refs[j]).style.backgroundImage = this.backgrounds.emptyBackground;
        }     
       
    }

    createRating = () => {
        let arr = [];
        for(let i=0; i<this.state.maxRating; i++){
            let addRate = this.addRate(i+1);
            arr.push(<div className="rectangle" id={i+1} key={i} 
                ref={i+1}
                style={addRate}
                onMouseEnter = {(event) => this.selectionEnter(event.currentTarget.id)}
                onMouseLeave = {(event) => this.selectionLeave(event.currentTarget.id)}
                onClick={(event) => this.markRate(event.currentTarget.id)}>
            </div>)
        }
        return arr;
    }

    render(){
        return (<div>
         {this.createRating()}             
        </div>)
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

