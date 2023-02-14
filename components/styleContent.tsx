import React, {useState} from 'react';
import Image from 'next/image';
import Center from './infiniteCanvas/center';
import styles from '../styles/Style.module.css'

import { type infProps, type posDict, InfDiv, InfClickDiv } from './infiniteCanvas/infiniteDiv'

const offsetX = 0
const pos : posDict = {
  title: [0, 0],
  arrow : [0, 375],
  inspiration: [0, 750],
  color: [0, 1125],
  blockSystem: [0, 1500],
  blockImage: [0, 1875],
}

const StyleContent = (props: infProps) => {

  return (
    <>
      {/* <Center {...props} /> */}
      <InfDiv {...props} pos={pos.title}>
        <h2>
        A <span>neutral, adaptable, consistent</span> design <br />
        system inspired by Inuit Igloo Building
        </h2>
      </InfDiv>
      <InfDiv {...props} pos={pos.arrow}>
        <Image
          src="/arrow.svg"
          alt="arrow"
          width={50}
          height={30}
        />
      </InfDiv>
    </>
  )
}

export default StyleContent;