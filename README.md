# react-rating-component
To preview the rating components [Click here](https://rjomv8kmyo.codesandbox.io/) 
  
## Star

###  Input
 
 ```
 Star.propTypes = {
    fontSize:PropTypes.number,
    selectedColor:PropTypes.string,
    maxRating:PropTypes.number,
    currentRating:PropTypes.number,
    updateRating:PropTypes.func.isRequired
}

 ```
 
 ###  Defualt Values
  
  ```
  Star.defaultProps = {
    fontSize:100,
    selectedColor:"yellow",
    maxRating:5,
    currentRating:0
}  
  ```
  
 ### Listening to event
 
  ```
  markRate = (id) => {
        this.setState({currentRating:parseInt(id)},() => {
            console.log("Current ",this.state.currentRating);
            this.props.updateRating(this.state.currentRating);
        });
    }

  ```
  
  ## Rectangle
  Achieving the rating in other shapes
  
### Input
   ```
   Rectangle.propTypes = {
    maxRating: PropTypes.number,
    currentRating: PropTypes.number,
    selectedColor: PropTypes.string,
    emptyColor:PropTypes.string,
    updateRating:PropTypes.func.isRequired
};
 ```
  
### DefaultValues
 ```
 Rectangle.defaultProps = {
    maxRating:5,
    currentRating:0,
    selectedColor:"#bec314",
    emptyColor:"transparent"
} 

 ```
 
 ### Listening to event
 ```
 markRate = (id) => {       
        this.setState({currentRating:parseInt(id)},() => {
            console.log("Current ",this.state.currentRating);
            this.props.updateRating(this.state.currentRating);
        });
  } 
  ```
  
  ## Rect-Point-Rating
  Achieving rating in points
  
  ### Input
  ```
  RectPointRating.propTypes = {
    maxRating: PropTypes.number,
    currentRating: PropTypes.number,
    selectedColor: PropTypes.string,
    emptyColor:PropTypes.string,
    direction:PropTypes.string   
}

  ```
  
  ### Default Values
  ```
  RectPointRating.defaultProps = {    
    selectedColor:"#bec314",
    emptyColor:"transparent",
    direction:"left",
    currentRating:0,
    maxRating:5
}

  ```
  
  
 # Dependecies:-
   ```
  styled-components
  @material-ui/core/Tooltip
  @material-ui/core/Zoom
  
   ```

  



















  
 
