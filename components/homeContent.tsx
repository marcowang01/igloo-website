import React, {useState} from 'react';
import Center from './infiniteCanvas/center';
import styles from '../styles/Home.module.css'

import { type infProps, type posDict, InfDiv } from './infiniteCanvas/infiniteDiv'
import Image from 'next/image';
import Link from 'next/link';

import landingImg from '../images/home/landing.svg'
import aboutImg from '../images/home/about.svg'
import architectureImg from '../images/home/architecture.svg'
import styleImg from '../images/home/style.svg'
import blockChannelImg from '../images/home/blockChannel1.png'

const yOffset = 125;
const pos : posDict = {
  title: [0, -125 + yOffset],
  subtitle: [0, -25 + yOffset],
  landingImg: [0, 215 + yOffset],
  spaces: [0, 800 + yOffset],
  withinSpaces: [0, 1300 + yOffset],
  withinSpacesVideo: [0, 1700 + yOffset],
  blockChannel: [0, 2200 + yOffset],
  blockChannelImage: [0, 2600 + yOffset],
  learnMore: [0, 3400 + yOffset],
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
      <div key={title}>
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
          src={landingImg} 
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
            opacity: "0.5",
        }}/>
      </InfDiv>
      <InfDiv {...props} pos={pos.blockChannel}>
        <div 
          className={styles.text}
          style={{
            fontSize: '1.5rem',
            fontWeight: 400,
            textAlign: 'center',
          }}>
          We represent these activities with <span>BLOCKS</span>,<br /> 
          and organize them with <span>CHANNELS</span>.
        </div>
      </InfDiv>
      <InfDiv {...props} pos={pos.blockChannelImage}>
        <Image
          src={blockChannelImg}
          alt={'blockChannel'}
          width={1000}
          height={625}
          quality={90}
        />
      </InfDiv>
      <InfDiv {...props} pos={pos.learnMore}>
        <div className={styles.title} style={{fontSize: '1.6em'}}>
          Learn More
        </div>
        <div className={styles.list}>
          <div className={styles.listItem}>
            <div className={styles.text}>
              An <span>aggregated</span> and <span>concise</span> interface for your social life
            </div>
            <Link href={'architecture'} className={styles.clickable}>
              <Image
                src={architectureImg}
                alt={'blockChannel'}
                width={250}
                height={64}
                // style={{height:'auto'}}
              />
            </Link>
          </div>
          <div className={styles.listItem}>
            <div className={styles.text}>
              A <span>neutral, adaptable, consistent</span> design system 
              inspired by Inuit Igloo Building
            </div>
            <Link href={'style'} className={styles.clickable}>
              <Image
                src={styleImg}
                alt={'blockChannel'}
                width={250}
                height={64}
                // style={{height:'auto'}}
              />
            </Link>
          </div>
          <div className={styles.listItem}>
            <div className={styles.text}>
              Those behind the work
            </div>
            <Link href={'about'} className={styles.clickable}>
              <Image
                src={aboutImg}
                alt={'blockChannel'}
                width={250}
                height={64}
                // style={{height:'auto'}}
              />
            </Link>
          </div>
        </div>
      </InfDiv>
    </>
  )
}

export default HomeContent;