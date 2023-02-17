import React, {useState} from 'react';
import styles from '../styles/About.module.css'

import { type infProps, type posDict, InfDiv } from './infiniteCanvas/infiniteDiv'

const pos: posDict = {
  description: [0,-50],
  positions: [0,150]
}

interface Position {
  role: string
  people: string[]
}

const positions: Position[] = [
  {
    role: 'system design',
    people: ['W.Marco', 'Z.ShaoBo']
  },
  {
    role: 'interface design',
    people: ['X.Sherry', 'Z.ShaoBo']
  },
  {
    role: 'prototyping',
    people: ['W.Marco', 'X.Sherry' ,'Z.ShaoBo']
  },
  {
    role: 'engineering',
    people: ['W.Marco', 'Z.ShaoBo']
  }
]

export default function AboutContent(props: infProps) {
  return(
    <>
      <InfDiv {...props} pos={pos.description}>
        <div className={styles.description}>
          At its core, IGLOO is a neutral medium that helps shape and nurture 
          our relationships with strangers, friends, and loved ones. 
          It is designed to give us an aggregated and concise view of 
          our social life with an adaptable and consistent system that 
          stands the test of technological evolutions.
        </div>
      </InfDiv>
      <InfDiv {...props} pos={pos.positions}>
        <div className={styles.list}>
          {positions.map((position) => {
            return (
              <div className={styles.listItem}>
                <div className={styles.role}>
                  {position.role}
                </div>  
                <div className={styles.peopleList}>
                  {position.people.map((person) => {
                      return (
                        <div className={styles.people}>{person}</div>
                      )
                  })}
                </div>
              </div>
            )
          })} 
        </div>
      </InfDiv>
    </>
  )
}