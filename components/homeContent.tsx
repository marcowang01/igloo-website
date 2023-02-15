import React, {useState} from 'react';
import Center from './infiniteCanvas/center';
import styles from '../styles/Home.module.css'

import { type infProps, type posDict, InfDiv } from './infiniteCanvas/infiniteDiv'
import Image from 'next/image';

const pos : posDict = {
  title: [0, -125],
  subtitle: [0, -25],
  landingImg: [0, 215],
  spaces: [0, 800],
  withinSpaces: [0, 1300],
  withinSpacesVideo: [0, 1700],
  blurb: [0, 2200],
}

interface spaceItem {
  title: string,
  text: string,
}

const HomeContent = (props: infProps) => {

  const spaces : spaceItem[] = [
    {
      title: 'public space',
      text: 'Public spaces, such as parks and streets, offer opportunities for social interaction with strangers and acquaintances, and can facilitate the formation of new relationships.',
    },
    {
      title: 'partial open space',
      text: 'Partially open spaces, like cafe and workplaces, offer a more structured environment for developing relationships with collaborators and colleagues.'
    },
    {
      title: 'private space',
      text: 'Private spaces, such as homes and intimate venues, provide a space for developing deep, personal relationships with family, friends, and partners.'
    },
  ]

  function renderItem({title, text}: spaceItem) {
    return (
      <div>
        <div className={styles.subtitle}>
          {title}
        </div>
        <div 
          className={styles.text}
          style={{
            fontSize: '1rem',
            fontWeight: 300,
            marginTop: '1em',
            width: '350px',
          }}>
          {text}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* <Center {...props} /> */}
      <InfDiv {...props} pos={pos.title} >
        <div className={styles.logoText}>
          Igloo
        </div>
      </InfDiv>
      <InfDiv {...props} pos={pos.subtitle}>
        <div className={styles.slogan}>
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
      <InfDiv {...props} pos={pos.spaces}>
        <div className={styles.title}>
          spaces
        </div>
        <div 
          className={styles.text}
          style={{
            fontSize: '1.4rem',
            fontWeight: 300,
            textAlign: 'center',
            width: '700px',
            margin: 'auto',
          }}>
          Our relationships are shaped by the very environment we interact in. <br />
          These spaces contribute to our sense of connection and help shape and nurture our relationships.
        </div>
        <div className={styles.spaces}>
          {spaces.map(renderItem)}
        </div>
      </InfDiv>
      <InfDiv {...props} pos={pos.withinSpaces}>
        <div className={styles.title}>
          within spaces
        </div>
        <div 
          className={styles.text}
          style={{
            fontSize: '1.4rem',
            fontWeight: 300,
            textAlign: 'center',
            marginTop: '0.8em',
            width: '700px',
            margin: 'auto',
          }}>
            Within spaces, people are engaged in different activities with <br />
            different groups of people at different time.
        </div>
      </InfDiv>
      <InfDiv {...props} pos={pos.withinSpacesVideo}>
        <video autoPlay loop muted playsInline
          src={'/home/withinSpaces.mp4'}
          width={100} height={300}
          style={{
            height: "auto",
            width: "1000px",
            objectFit: "contain",
        }}/>
      </InfDiv>
      <InfDiv {...props} pos={pos.blurb}>
        <div 
          className={styles.text}
          style={{
            fontSize: '1.9rem',
            fontWeight: 400,
            textAlign: 'center',
          }}>
          We represent these activities with <span>BLOCKS</span>,<br /> 
          and organize them with <span>CHANNELS</span>.
        </div>
      </InfDiv>
    </>
  )
}

export default HomeContent;