import React from 'react';
import ReactDOM from 'react-dom';
import CardComponent from '../components/cardComponent';
// componet is responsible to reder the list ui.
class ItemComponent extends React.Component {
    constructor(props) {
        super(props);
    }

  render() {
      let title = this.props.item.title;
      let abstractText = this.props.item.abstractText;
      let author = this.props.item.author;
      let imageObject = this.props.item.images;
        var indents = [];
        Object.keys(imageObject).map((key, index)=>{
            indents.push(<CardComponent key={index} uniqueId={index} imageObject={imageObject} image={imageObject[key]} />);    
        });

    return (
        <div className="container-wrapper">
            <h1>{title} </h1>
            <p>{abstractText}</p>
            <p><b>Author:</b>{author}</p>
            <div>{indents}</div>
            <div className="clear"></div>
        </div>
    );
  }
}

export default ItemComponent = ItemComponent;