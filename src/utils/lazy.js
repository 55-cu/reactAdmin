import React from 'react'
import loadAble from 'react-loadable'

// 过度组件
function LogingComponent (){
  return(
    <div>这里是过度组件</div>
  )
}

export default (component)=>{
  return loadAble({
    loader:component,
    loading:LogingComponent
  })
}