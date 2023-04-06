import React, {useState} from 'react';
import Center from './infiniteCanvas/center';

import styles from '../styles/Architecture.module.css'

import { type infProps, type posDict, InfDiv } from './infiniteCanvas/infiniteDiv'
import Image from 'next/image';

import blocksIcon from '../images/architecture/blocks.svg'
import channelsIcon from '../images/architecture/channels.svg'
import spacesIcon from '../images/architecture/spaces.svg'
import LLMIcon from '../images/architecture/llm.svg'
import autoGenIcon from '../images/architecture/autoGen.svg'
import blocksImg from '../images/architecture/blocksImg.png'
import blocksTextImg from '../images/architecture/blocksText.svg'
import calendarImg from '../images/architecture/calendar.png'
import channelsImg from '../images/architecture/channelsImg.png'
import spacesImg from '../images/architecture/spacesImg.png'
import spacesTextImg from '../images/architecture/spacesText.svg'


interface TitleBlock {
  title: string,
  icon: any,
  line1: string,
  line2: string,
}
const offestX = -300
const pos : posDict = {
  title: [0, 0],
  underConstruction: [0, 90],
  arrow : [0, 375],
  blocks: [offestX, 600],
  blockImage: [0, 1050],
  channels: [offestX, 1425],
  channelImage: [0, 2050],
  spaces: [offestX, 2500],
  spaceImage: [0, 3100],
  LLM: [offestX, 3475],
  autoGen: [offestX, 3925],
}

function titleBlocks({icon, title, line1, line2}: TitleBlock) {
  return (
    <div className={styles.iconContainer}>
      <div className={styles.icon}>
        <Image
          src={icon}
          alt="icon"
          width={23}
          height={23}
        />
      </div>
      <div className={styles.titleContainer}>
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles.text}>
          {line1} <br /> {line2}
        </div>
      </div>
    </div>
    )
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
      <InfDiv {...props} pos={pos.arrow}>
        <Image
          src="/arrow.svg"
          alt="arrow"
          width={50}
          height={30}
        />
      </InfDiv>

      <InfDiv {...props} pos={pos.blocks} align='left'>
        {titleBlocks({
          icon: blocksIcon, 
          title: "blocks", line1: "endeavors that nourish relationships", line2: ""
        })}
      </InfDiv>
      <InfDiv {...props} pos={[pos.blocks[0]+ 170, pos.blocks[1] + 150]}>
        <video autoPlay loop muted playsInline
          src={'/architecture/chatting.mp4'}
          width={300} height={600}
          style={{
            objectFit: "contain",
        }}/>
      </InfDiv>
      <InfDiv {...props} pos={[pos.blocks[0]+ 360, pos.blocks[1] + 130]} align={'left'}>
        <div className={styles.description}>
          Blocks are a digital extension of activities that nourishes our bonds with others. May it be hanging out with friends, listening to music, planning for a night out, or working on a project, we can always find a block that takes care of these activities.
        </div>
      </InfDiv>
      <InfDiv {...props} pos={[pos.blockImage[0]-50, pos.blockImage[1] - 110]}>
        <Image
          src={blocksTextImg}
          alt="blocks"
          width={1170}
          height={117}
          // style={{height:'auto'}}
        />
      </InfDiv>
      <InfDiv {...props} pos={pos.blockImage}>
        <Image
          src={blocksImg}
          alt="blocks"
          width={1300}
          height={299}
          // style={{height:'auto'}} 
          quality={90}
        />
      </InfDiv>

      <InfDiv {...props} pos={pos.channels} align='left'>
        {titleBlocks({
          icon: channelsIcon, 
          title: "channels", line1: "blocks make up the content in a channel",
          line2: "just like how our activities make up our calendar"
        })}
      </InfDiv>
      <InfDiv {...props} pos={[pos.channels[0]+ 150, pos.channels[1] + 150]}>
        <Image
          src={calendarImg}
          alt="blocks"
          width={300}
          height={224}
          // style={{height:'auto'}}
        />
      </InfDiv>
      <InfDiv {...props} pos={[pos.channels[0]+ 360, pos.channels[1] + 150]} align={'left'}>
        <div className={styles.description}>
          Channels organize our activities through time and block types. It makes sure we are notified by blocks we&apos;ve interacted with while keeping us away from spams from past uninterested blocks.
        </div>
      </InfDiv>
      <InfDiv {...props} pos={pos.channelImage}>
        <Image
          src={channelsImg}
          alt="blocks"
          width={800}
          height={577}
          // style={{height:'auto'}}
          quality={90}
        />
      </InfDiv>

      <InfDiv {...props} pos={pos.spaces} align='left'>
        {titleBlocks({
          icon: spacesIcon, 
          title: "spaces", line1: "A space consists of different channels",
          line2: "And we interact in different spaces with different people for different occasions "
        })}
      </InfDiv>
      <InfDiv {...props} pos={[pos.spaces[0]+ 150, pos.spaces[1] + 180]}>
        <video autoPlay loop muted playsInline
          src={'/architecture/spaces.mp4'}
          width={220} height={600}
          style={{
            objectFit: "contain",
        }}/>
      </InfDiv>
      <InfDiv {...props} pos={[pos.spaces[0]+ 360, pos.spaces[1] + 170]} align={'left'}>
        <div className={styles.description}>
          A space hosts a variety of channels for different purposes. You will receive notifications on the space page for newly created blocks or updates in blocks you have interacted with. You can also search and filter for specific spaces and channels.  
        </div>
      </InfDiv>
      <InfDiv {...props} pos={[pos.spaceImage[0]+25, pos.spaceImage[1] - 45]}>
        <Image
          src={spacesTextImg}
          alt="blocks"
          width={800}
          height={329}
          // style={{height:'auto'}}
        />
      </InfDiv>
      <InfDiv {...props} pos={pos.spaceImage}>
        <Image
          src={spacesImg}
          alt="blocks"
          width={900}
          height={416}
          // style={{height:'auto'}}
          quality={90}
        />
      </InfDiv>

      <InfDiv {...props} pos={pos.LLM} align='left'>
        {titleBlocks({
          icon: LLMIcon, 
          title: "LLM PREVIEW", line1: "Just like how our friends can give us the run down of their convo when we join",
          line2: "The built-in large language model will be able to summarize the block for you "
        })}
      </InfDiv>
      <InfDiv {...props} pos={[pos.LLM[0]+ 270, pos.LLM[1] + 180]}>
        <video autoPlay loop muted playsInline
          src={'/architecture/llm.mp4'}
          width={420} height={600}
          style={{
            objectFit: "contain",
        }}/>
      </InfDiv>

      <InfDiv {...props} pos={pos.autoGen} align='left'>
        {titleBlocks({
          icon: autoGenIcon, 
          title: "AUTO-GENERATED BLOCK ", line1: "Since we may not always remember to create a block for activities",
          line2: "Igloo helps us auto generate and organize our activities into blocks"
        })}
      </InfDiv>
      <InfDiv {...props} pos={[pos.autoGen[0]+ 270, pos.autoGen[1] + 250]}>
        <video autoPlay loop muted playsInline
          src={'/architecture/autoGen.mp4'}
          width={420} height={600}
          style={{
            objectFit: "contain",
        }}/>
      </InfDiv>
    </>
  )
}

export default ArchitectureContent;