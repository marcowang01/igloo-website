import React from 'react';

import InfiniteCanvas from '../components/infiniteCanvas/infiniteCanvas'
import ArchitectureContent from '../components/architectureContent';

// import Dock from '../components/dock';

export default function Architecture() {
  // infinite canvas is a higher order component that takes a component as an argument
  const InfiniteContent = InfiniteCanvas(ArchitectureContent)
  // position and zoom values are arbitrary and serve as placeholders
  return (
    <div>
      <InfiniteContent x={0} y={0} zoom={1}/>
    </div>
  ) 
}
