import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./Rect-Point-Rating.css";

class RectPointRating extends Component{
    backgrounds = {};
    rectObj = {};
    
    constructor(props){
        super(props);                    
        this.rectObj.direction = this.getAngle(this.props.direction);  
        this.backgrounds = {
            selectBackground: this.generateLinearGradient(this.props.selectedColor,100,this.props.emptyColor,0),
            emptyBackground: this.generateLinearGradient(this.props.selectedColor,0,
                this.props.emptyColor,0)
        };

        this.state = {
            maxRating:parseInt(this.props.maxRating)                     
        }
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

    generateLinearGradient = (color1,percent1,color2,percent2) => {
        let backgroundStyle = [];
        backgroundStyle.push(this.rectObj.direction + "deg");        
        backgroundStyle.push(color1 + " " + percent1 +"%");
        backgroundStyle.push(color2 + " " + percent2 + "%");

        let b = "linear-gradient(" + [...backgroundStyle].join(",") + ")";
        return b;
    }

    addRate = (id) => {
        let rating = parseInt(this.state.currentRating);
        let decimal = (this.state.currentRating * 10)%10;
        let backgroundStyle = "";       

        if(id <= rating){
            backgroundStyle = this.backgrounds.selectBackground;
        }
        else if(id == rating+1  && decimal !== 0){
            let i = decimal*10;           
            backgroundStyle = this.generateLinearGradient(this.props.selectedColor,i,
                this.props.emptyColor,i);
        }
        else if(id > rating){
            backgroundStyle = this.backgrounds.emptyBackground;
        }       
        return {backgroundImage:backgroundStyle};
    }

    createRating = () => {       
        let arr = [];
        for(let i=0; i<this.state.maxRating; i++){
            let addRate = this.addRate(i+1);
            arr.push(<div className="rectangle" key={i}
                        style={addRate}
                        id={i+1}></div>);
        }       
        return arr;
    }

    render(){     
        return (<div>
            {this.createRating()}
        </div>)
    }
}

export default RectPointRating;

RectPointRating.propTypes = {
    maxRating: PropTypes.number.isRequired,
    currentRating: PropTypes.number.isRequired,
    selectedColor: PropTypes.string,
    emptyColor:PropTypes.string,
    direction:PropTypes.string   
}

RectPointRating.defaultProps = {    
    selectedColor:"#bec314",
    emptyColor:"transparent",
    direction:"left"
}
