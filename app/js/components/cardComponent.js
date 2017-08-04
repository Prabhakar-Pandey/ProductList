import React from 'react';
import ReactDOM from 'react-dom';
import ImageSliderComponent from '../components/imageSliderComponent'
// component is responsible to show images in tiles
class CardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSlider:false
        }
    }
    showSliderMethod(slider){
        if(slider){
            this.setState({showSlider:false})
        }else{
            this.setState({showSlider:true})
        }
    }
  render() {
      console.log(this.props,"images")
      let url = this.props.image.url;
      let title = this.props.image.title;
      let description = this.props.image.description;
      let indents=[];
      if(url){
        indents.push(<div key={this.props.uniqueId} className="tile">
                <img src={url} />
                { title&&<h3>{title}</h3>}
                <input type="button" onClick={() => this.showSliderMethod(this.state.showSlider)} value="More" />
            </div>)
      }
      let slider;
        if (this.state.showSlider) {
            slider = <ImageSliderComponent uniqueIndex={this.props.uniqueId} imageObj={this.props.imageObject} close={() => this.showSliderMethod(true)} />;
        } 
    return (
        <div className="image-wrapper">
            {indents}
            {slider}
        </div>
    );
  }
}

export default CardComponent = CardComponent;