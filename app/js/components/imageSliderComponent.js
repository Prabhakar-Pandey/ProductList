import React from 'react';
import ReactDOM from 'react-dom';
// this component is used for slider with images
class ImageSliderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.slide_index=1;
        console.log(this.props.imageObj,this.props.uniqueIndex,"imageObj");
    }
    componentDidMount() {
        this.displaySlides(this.props.uniqueIndex+1);
    }
    nextSlide(n){
        this.displaySlides(this.slide_index += n);
    }
    displaySlides(n) {  
        
            var i;  
            var slides = document.getElementsByClassName("showSlide");  
            if (n > slides.length) { this.slide_index = 1 }  
            
            if (n < 1) { this.slide_index = slides.length }  
            if(n>1&&n<slides.length){this.slide_index=n}
            for (i = 0; i < slides.length; i++) {  
                slides[i].style.display = "none";  
            }  
            console.log(this.slide_index,"this.slide_index")
            slides[this.slide_index - 1].style.display = "block";  
        }
  render() {
    var indents = [];
    Object.keys(this.props.imageObj).map((key, index)=>{
        console.log(this.props.imageObj[index],"index")
        indents.push(<div key={index} className="showSlide fade">  
            <img src={this.props.imageObj[index].url} />  
            <div className="content">{this.props.imageObj[index].title}</div>  
        </div> );    
    });
    return (
        <div className="slidercontainer">  
            <div onClick={() => this.props.close(true)} className="close">X</div>
        {indents}
        <a className="left" onClick={() => this.nextSlide(-1)}>&#x2190;</a>  
        <a className="right" onClick={() => this.nextSlide(-1)}>&#x2192;</a> 
    </div>  
    );
  }
}

export default ImageSliderComponent = ImageSliderComponent;