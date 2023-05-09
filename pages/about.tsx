import React from 'react';

import InfiniteCanvas from '../components/infiniteCanvas/infiniteCanvas'
import AboutContent from '../components/aboutContent';

import { sfProDisplay } from './_app';

export default function About() {
  // infinite canvas is a higher order component that takes a component as an argument
  
  const InfiniteContent = InfiniteCanvas(AboutContent)
  // position and zoom values are arbitrary and serve as placeholders
  return (
    <div className={sfProDisplay.className}>
      <InfiniteContent x={0} y={0} zoom={1} bounds={[0,0,0,0]}/>
    </div>
  ) 
}
