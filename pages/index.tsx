import React from 'react';

import InfiniteCanvas from '../components/infiniteCanvas/infiniteCanvas'
import HomeContent from '../components/homeContent'

import { sfProDisplay } from './_app';

// TODO: add option to do ratio based wheel events back onto platz as part of config

// import Dock from '../components/dock';

export default function Home() {
  // infinite canvas is a higher order component that takes a component as an argument
  const InfiniteContent = InfiniteCanvas(HomeContent)
  // position and zoom values are arbitrary and serve as placeholders
  return (
    <div className={sfProDisplay.className}>
      <InfiniteContent x={0} y={0} zoom={1} bounds={[-150,150,0,3500]}/>
    </div>
  ) 
}
