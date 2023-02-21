import React, {useState} from 'react';
import Center from './infiniteCanvas/center';

import styles from '../styles/Architecture.module.css'

import { type infProps, type posDict, InfDiv } from './infiniteCanvas/infiniteDiv'
import Image from 'next/image';

const pos : posDict = {
  title: [0, 0],
  underConstruction: [0, 90],
  arrow : [0, 375],
}

const ArchitectureContent = (props: infProps) => {

  return (
    <>
      {/* <Center {...props} /> */}
      <InfDiv {...props} pos={pos.title}>
        <h2>
          An <span>aggregated</span> and <span>concise</span>
          <br /> interface for your social life
        </h2>
      </InfDiv>
      <InfDiv {...props} pos={pos.underConstruction}>
        <h2 style={{fontSize: "1rem", fontWeight: "400"}}>
          currently being revamped for 2023!
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

export default ArchitectureContent;