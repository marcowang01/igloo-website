import React, {useState} from 'react';
import Image from 'next/image';
import Center from './infiniteCanvas/center';
import styles from '../styles/Style.module.css'

import { type infProps, type posDict, InfDiv, InfClickDiv } from './infiniteCanvas/infiniteDiv'

const offsetX = 0
const pos : posDict = {
  title: [0, 0],
  arrow : [0, 375],
  inspiration: [offsetX, 750],
  inspirationImage: [0, 1175],
  color: [offsetX, 1800],
  colorImage: [0, 2100],
  blockSystem: [offsetX, 2600],
  blockImage: [0, 3000],
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
      <InfDiv {...props} pos={pos.inspiration}>
        <div className={styles.title}>
          inspiration
        </div>
        <div className={styles.text}>
          The design system incorporates elements of Inuit culture, such as clean lines and a focus on the essentials, 
          to create a flexible, consistent, and scalable user interface, while also focuses on making the system unobtrusive 
          with its minimal design.
        </div>
      </InfDiv>
      <InfDiv {...props} pos={pos.inspirationImage}>
        <Image
          src="/style/inspiration.svg"
          alt="inspiration"
          width={600}
          height={600}
          className={styles.image}
        />
      </InfDiv>
      <InfDiv {...props} pos={pos.color}>
        <div className={styles.title}>
          colour
        </div>
        <div className={styles.text}>
          The design system uses a muted and neutral colour palette, drawing inspiration 
          from the earthy tones found in the Arctic landscape, such as whites, grays, purples, 
          blues, and greens. These colours create a calming and serene atmosphere, evoking the 
          sense of peace and tranquility associated with the Arctic. The colour choices also 
          emphasis of unobtrusive design, while maintaining its versatility and adaptability, 
          allowing it to be used in a variety of contexts and applications.
        </div>
      </InfDiv>
      <InfDiv {...props} pos={pos.colorImage}>
        <Image
          src="/style/color.svg"
          alt="color"
          width={1000}
          height={500}
          className={styles.image}

        />
      </InfDiv>
      <InfDiv {...props} pos={pos.blockSystem}>
        <div className={styles.title}>
          block system
        </div>
        <div className={styles.text}>
        The block system inspired by Inuit Igloo building focuses on simplicity, functionality, and modularity. 
        The system takes inspiration from the traditional Inuit Igloos, strong, efficient, and adaptable structures 
        built from interlocking blocks. 
        <br /> <br />
        The same concept of interlocking blocks is applied to the software interface, where modular blocks, 
        representing different means of communication, can be easily combined and reconfigured to create new 
        channels that make up a space.
        </div>
      </InfDiv>
      <InfDiv {...props} pos={pos.blockImage}>
        <Image
          src="/style/blocks.png"
          alt="block system"
          width={1092}
          height={450}
          priority
        />
      </InfDiv>
    </>
  )
}

export default StyleContent;