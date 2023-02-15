import React, {useState} from 'react';
import Center from './infiniteCanvas/center';
import styles from '../styles/Home.module.css'

import { type infProps, type posDict, InfDiv } from './infiniteCanvas/infiniteDiv'
import Image from 'next/image';

const pos : posDict = {
  title: [0, -150],
  subtitle: [0, -50],
  landingImg: [0, 190],
}

const HomeContent = (props: infProps) => {

  return (
    <>
      {/* <Center {...props} /> */}
      <InfDiv {...props} pos={pos.title} >
        <div className={styles.title}>
          Igloo
        </div>
      </InfDiv>
      <InfDiv {...props} pos={pos.subtitle}>
        <div className={styles.subtitle}>
          an <span>organic, non-overwhelming</span> interface for your relationships
        </div>
      </InfDiv>
      <InfDiv {...props} pos={pos.landingImg}>
        <Image
          src="/home/landing.svg" 
          alt="landing" 
          width={1700}
          height={500}
          className={styles.landingImg} />
      </InfDiv>
    </>
  )
}

export default HomeContent;