import React from 'react';

import InfiniteCanvas from '../components/infiniteCanvas/infiniteCanvas'
import ArchitectureContent from '../components/architectureContent';

import { sfProText } from './_app';

// import Dock from '../components/dock';

export default function Architecture() {
  // infinite canvas is a higher order component that takes a component as an argument
  const InfiniteContent = InfiniteCanvas(ArchitectureContent)
  // position and zoom values are arbitrary and serve as placeholders
  return (
    <div className={sfProText.className}>
      <InfiniteContent x={0} y={0} zoom={1} bounds={[-150,150,0,4000]}/>
    </div>
  ) 
}
