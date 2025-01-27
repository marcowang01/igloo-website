import React from 'react';

import InfiniteCanvas from '../components/infiniteCanvas/infiniteCanvas'

// import Dock from '../components/dock';

import StyleContent from '../components/styleContent'

import { type posDict } from '../components/infiniteCanvas/infiniteDiv'

import { sfProText } from './_app';

const offsetX = -295
const pos : posDict = {
  infiniteCanvas: [offsetX, -150],
  dockNavigation: [offsetX, 50],
  cursorChat: [offsetX, 200],
  cmdk: [offsetX, 350],
}

export default function Style() {
  // infinite canvas is a higher order component that takes a component as an argument
  const InfiniteContent = InfiniteCanvas(StyleContent)
  // position and zoom values are arbitrary and serve as placeholders
  return (
    <div className={sfProText.className}>
      <InfiniteContent x={0} y={0} zoom={1} bounds={[-20,20,0,2700]}/>
    </div>
  ) 
}
