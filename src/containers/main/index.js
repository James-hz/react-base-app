/**
 * Created by jiangsheng on 2018/10/7.
 */
import React,{ Component,Fragment } from 'react';

class Main extends Component{

  constructor(props){
    super(props);

    this.handerClick = this.handerClick.bind(this)
  }

  handerClick(){
     console.log(123)
  }

  render(){
    return(
      <Fragment>
        <div onClick={this.handerClick}>点击</div>
      </Fragment>
    )
  }
}


export default Main;
