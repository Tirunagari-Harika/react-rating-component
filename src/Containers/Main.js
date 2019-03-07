import React, { Component } from 'react';
import "./Main.css";
import Rectangle from '../Components/Rectangle/Rectangle';
import RectPointRating from '../Components/PointRectangle/Rect-Point-Rating';
import Star from "../Components/Star/Star";

class Main extends Component{
    state = {
        rectDesired:3,
        rectDefault:0,
        decimalRectMax:5,
        decimalRectCurr:3.3,

        starDesired:2,
        starDefault:0
    }

    changeRectDesired = (val) => {
        this.setState({rectDesired:val});
    }

    changeRectDefault = (val) => {
        this.setState({rectDefault:val});
    }

    changeDecimalCurr = (ev) => {
       // console.log(ev.target.value);
        let val = parseFloat(ev.target.value);
        if(!val) return;
       this.setState({decimalRectCurr:val},() => {
          // console.log(this.state.decimalRectCurr)
        });
    }


    updateStarDesired = (val) => {
        this.setState({
            starDesired:val
        })
    }

    updateStarDefault = (val) => {
        this.setState({
            starDefault:val
        })
    }

    render(){
        //console.log("Render");
        return (<div>
            <h4 className="maintitle">Rating Components</h4>
            <div className="boxDiv">
                <p>Rating Using Star</p>
                <div className="itemDiv">
                    <p>Star with Selected Values</p>
                    <Star maxRating={5} currentRating={this.state.starDesired} 
                            fontSize={100} selectedColor="#ff9800"
                            updateRating={this.updateStarDesired}/>
                    <h5>User Rated <span>{this.state.starDesired} / 5</span></h5>
                </div>
                <div className="itemDiv">
                    <p>Star with Default Values</p>
                    <Star updateRating={this.updateStarDefault}/>
                    <h5>User Rated <span>{this.state.starDefault} / 5</span></h5>
                </div>
            </div>   
            
            <div className="boxDiv">
                <p>Clickable - Reads User Rating</p>
                <div className="itemDiv">
                    <p>a) Rating with desired Colors </p>
                   
                    <Rectangle maxRating={5} currentRating={3}
                            selectedColor="#3fdfdf" emptyColor="#933fdf"                            
                            updateRating={this.changeRectDesired}/>
                   
                    
                    <h5>User Rated <span>{this.state.rectDesired}/5</span></h5>
                </div>

                <div className="itemDiv">
                    <p>b) Rating with default Values</p>
                    <Rectangle updateRating={this.changeRectDefault} />
                    <h5>User Rated <span>{this.state.rectDefault}</span></h5>
                </div>
 
                <div className="itemDiv">
                <p>Representing Rating in Decimals</p>
                    <RectPointRating maxRating={this.state.decimalRectMax} 
                            currentRating={this.state.decimalRectCurr}/>

                    <input type="number" value={this.state.decimalRectCurr} 
                            onChange={this.changeDecimalCurr}
                            min={0} max={this.state.decimalRectMax} />

                    <h5>User Rated <span>{this.state.decimalRectCurr} / {this.state.decimalRectMax}</span></h5>

                </div>
            </div>        
           

            

           

          <div className="boxDiv">
                <p>Variations in Directions</p>
                <div className="itemDiv">
                    <p>a) Top </p>
                    <RectPointRating maxRating={5} 
                            currentRating={4.5} direction="top"
                            selectedColor="#3fdfdf" emptyColor="#933fdf"/>
                </div>
                <div className="itemDiv">
                    <p>b) Bottom </p>
                    <RectPointRating maxRating={5} 
                            currentRating={4.5} direction="bottom"
                            selectedColor="#3fdfdf" emptyColor="#933fdf"/>
                </div>
                <div className="itemDiv">
                    <p>c) Left </p>
                    <RectPointRating maxRating={5} 
                            currentRating={4.5} direction="left"
                            selectedColor="#3fdfdf" emptyColor="#933fdf"/>
                </div>
                <div className="itemDiv">
                    <p>d) Right </p>
                    <RectPointRating maxRating={5} 
                            currentRating={4.5} direction="right"
                            selectedColor="#3fdfdf" emptyColor="#933fdf"/>
                </div>
            </div>
 

           
        </div>)
    }
}

export default Main;
