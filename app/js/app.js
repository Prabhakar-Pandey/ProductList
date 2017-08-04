import React from 'react';
import ReactDOM from 'react-dom';
import Utils from './utils/utils';
import ItemComponent from './components/itemComponent';

class MainPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        };
        this.allData={};
        this.initialIndex=0;
        this.dataArray=[];
        this.lastIndex=this.props.config.dataToShow;
        this.callNextPage;
    }
    componentWillMount(){
        // reading from file copied from given url(http://www.rd.com/feed/msn-listicles/) due to cross origin issue
        Utils.readFromTextFile((data)=>{
            console.log(data,"data")
            this.allData=data.items;
        });
        // for infinite scrolling effect
        this.updateDataToshow(this.initialIndex,this.lastIndex);
        this.listenScrollEvent=this.listenScrollEvent.bind(this);
        window.addEventListener('scroll', this.listenScrollEvent);
    }
    updateDataToshow(initialIndex,lastIndex){
        for(var i=initialIndex;i<lastIndex;i++){
            this.dataArray.push(this.allData[i])
        }
        this.setState({data:this.dataArray});
    }
    listenScrollEvent() {
        var scrollPos = window.pageYOffset; //gives scroller position on browser
        var screenHeight = window.innerHeight; //gives the the height of window screen
        var contentHeight;
        let LazyLoad={};
        if (LazyLoad.containerId) { // if there is id availble for parent div
            contentHeight = document.getElementById(LazyLoad.containerId).offsetHeight;
        } else {
            contentHeight = document.getElementsByTagName('body')[0].offsetHeight;
        }
        if (scrollPos + screenHeight >= contentHeight) {
            if(this.callNextPage){
                clearTimeout(this.callNextPage);
            }
           this.callNextPage= setTimeout(()=> {
               this.initialIndex=this.lastIndex;
               this.lastIndex=this.lastIndex+this.props.config.dataToShow;
               this.updateDataToshow(this.initialIndex,this.lastIndex);
           }, this.props.config.timeInMillisec);
        }
    }

  render() {
      let indent = [];
      for(var i=0;i<this.state.data.length;i++){
            //console.log(this.state.data[i]);
                if(this.state.data.length){
                    indent.push( <ItemComponent key={i} item={this.state.data[i]} />)
                }  
            }
      return (
        <div>
            {indent}
        </div>
        );
    
  }
}
//Initializing point of react application, passing configuration for application here
ReactDOM.render(<MainPageContainer config={{dataToShow:2,timeInMillisec:1000}} />,document.getElementById('mainContainer'))

