import { createContext, ReactNode, useState } from 'react'
import challenges from '../../challenges.json'

interface Challenge {
  type: 'body' | 'eye'
  description: string
  amount: number
}
interface ChallegensProviderProps{
  children: ReactNode
}
interface ChallengesContextData {
  level: number
  currentExperience: number
  challengesCompleted: number
  experienceToNextLevel:number
  levelUp: () => void
  activeChallenge : Challenge
  startNewChallenge: () => void
  resetChallenge: () => void
}

export const ChallengesContext = createContext({} as ChallengesContextData)


export function ChallengesProvider({children}:ChallegensProviderProps){
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(59)
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level+1) * 4,2)
  function levelUp(){
    setLevel(level + 1)
  }

  function startNewChallenge(){
    const ramdomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[ramdomChallengeIndex]
    setActiveChallenge(challenge)
  }

  function resetChallenge(){
    setActiveChallenge(null)
  }
  
  return (
    <ChallengesContext.Provider 
    value ={{
      level,
      levelUp,
      currentExperience,
      challengesCompleted,
      startNewChallenge,
      activeChallenge,
      resetChallenge,
      experienceToNextLevel
      }}>

      {children}
    </ChallengesContext.Provider>
  )
}