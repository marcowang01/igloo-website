import React from 'react';

import InfiniteCanvas from '../components/infiniteCanvas/infiniteCanvas'
import HomeContent from '../components/homeContent'

// TODO: add vertical mac doc? 
// TODO: styled components?
// TODO: add support for rendering pages in advance if big img or vid
//         option to add loaders
//         SGG vs SSR OPTIONS
// TODO: initial pre load? 

// TODO: add hover effect on navbar and link buttons
// TODO: change margin between each dock icon to make them align to bg
// TODO: make doc a bit higher
// TODO: add min max bound as prop to pass in at page level
// TODO: add 3 layers abstraction, can just pass in component list into big container? 
// TODO: abstract out components --> more like library the better it is?

// import Dock from '../components/dock';

export default function Home() {
  // infinite canvas is a higher order component that takes a component as an argument
  const InfiniteContent = InfiniteCanvas(HomeContent)
  // position and zoom values are arbitrary and serve as placeholders
  return (
    <div>
      <InfiniteContent x={0} y={0} zoom={1}/>
    </div>
  ) 
}
