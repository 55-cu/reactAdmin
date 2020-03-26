import React from 'react'
import LoadAble from 'react-loadable'

function LogingComponent (){
    return(
      <div>这里是过度组件</div>
    )
  }
  
  export default (LoadComponent)=>{
    return LoadAble({
      loader:LoadComponent,
      loading:LogingComponent
    })
  } 