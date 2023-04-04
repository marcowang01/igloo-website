import React, {useState} from 'react';
import Center from './infiniteCanvas/center';

import styles from '../styles/Architecture.module.css'

import { type infProps, type posDict, InfDiv } from './infiniteCanvas/infiniteDiv'
import Image from 'next/image';

interface TitleBlock {
  title: string,
  icon: string,
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
  channels: [offestX, 1400],
  channelImage: [0, 2100],
  spaces: [offestX, 2800],
  spaceImage: [0, 3500],
  LLM: [offestX, 3900],
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
      {/* <InfDiv {...props} pos={pos.underConstruction}>
        <h2 style={{fontSize: "1rem", fontWeight: "400"}}>
          currently being revamped for 2023!
        </h2>
      </InfDiv> */}
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
          icon: "architecture/blocks.svg", 
          title: "blocks", line1: "endeavors that nourishe relationships", line2: ""
        })}
      </InfDiv>
      <InfDiv {...props} pos={[pos.blocks[0]+ 150, pos.blocks[1] + 150]}>
        <Image
          src="/architecture/chatting.png"
          alt="blocks"
          width={300}
          height={600}
          style={{height:'auto'}}
        />
      </InfDiv>
      <InfDiv {...props} pos={[pos.blocks[0]+ 360, pos.blocks[1] + 170]} align={'left'}>
        <div className={styles.description}>
          Blocks are a digital extension of events that nourishes our bonds with others. May it be hanging out with friends, listening to music, planning for a night out, or working on a project, we can always find a block that takes care of these activities.
        </div>
      </InfDiv>
      <InfDiv {...props} pos={[pos.blockImage[0]-50, pos.blockImage[1] - 110]}>
        <Image
          src="/architecture/blocksText.svg"
          alt="blocks"
          width={1170}
          height={600}
          style={{height:'auto'}}
        />
      </InfDiv>
      <InfDiv {...props} pos={pos.blockImage}>
        <Image
          src="/architecture/blocksImg.png"
          alt="blocks"
          width={1300}
          height={600}
          style={{height:'auto'}}
        />
      </InfDiv>

      <InfDiv {...props} pos={pos.channels} align='left'>
        {titleBlocks({
          icon: "architecture/channels.svg", 
          title: "channels", line1: "blocks make up the content in a channel",
          line2: "just like how our activities make up our calendar"
        })}
      </InfDiv>
      <InfDiv {...props} pos={[pos.channels[0]+ 150, pos.channels[1] + 150]}>
        <Image
          src="/architecture/calendar.png"
          alt="blocks"
          width={300}
          height={600}
          style={{height:'auto'}}
        />
      </InfDiv>
      <InfDiv {...props} pos={[pos.channels[0]+ 360, pos.channels[1] + 170]} align={'left'}>
        <div className={styles.description}>
          Channels organize our activities through time and block types. It makes sure you are notified by blocks you interact with while keeping you away from spams from past uninterested blocks.
        </div>
      </InfDiv>
      <InfDiv {...props} pos={pos.channelImage}>
        <Image
          src="/architecture/channelsImg.png"
          alt="blocks"
          width={800}
          height={600}
          style={{height:'auto'}}
        />
      </InfDiv>

      <InfDiv {...props} pos={pos.spaces} align='left'>
        {titleBlocks({
          icon: "architecture/spaces.svg", 
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
          src="/architecture/spacesText.svg"
          alt="blocks"
          width={800}
          height={600}
          style={{height:'auto'}}
        />
      </InfDiv>
      <InfDiv {...props} pos={pos.spaceImage}>
        <Image
          src="/architecture/spacesImg.png"
          alt="blocks"
          width={900}
          height={600}
          style={{height:'auto'}}
        />
      </InfDiv>

      <InfDiv {...props} pos={pos.LLM} align='left'>
        {titleBlocks({
          icon: "architecture/llm.svg", 
          title: "LLM PREVIEW", line1: "Just like how our friends can give us the run down of their convo when we join",
          line2: "The built-in large language model will be able to summarize the block for you "
        })}
      </InfDiv>
    </>
  )
}

export default ArchitectureContent;