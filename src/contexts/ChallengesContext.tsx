import { createContext, ReactNode, useEffect, useState } from 'react'
import challenges from '../../challenges.json'
import Cookies from 'js-cookie'
import { LevelUpModal } from '../components/LevelUpModal'
interface Challenge {
  type: 'body' | 'eye'
  description: string
  amount: number
}
interface ChallegensProviderProps{
  children: ReactNode
  level : number
  currentExperience : number
  challengesCompleted :number
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
  completeChallenge: () => void
  closeLevelUpModal: () => void

}

export const ChallengesContext = createContext({} as ChallengesContextData)


export function ChallengesProvider({
  children,
  ...rest
}:ChallegensProviderProps){
  const [level, setLevel] = useState(rest.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
  const experienceToNextLevel = Math.pow((level+1) * 4,2)
  
  useEffect(() => {
    Notification.requestPermission()
  },[])

  useEffect(() => {
    Cookies.set('level',level.toString())
    Cookies.set('currentExperience',currentExperience.toString())
    Cookies.set('challengesCompleted',challengesCompleted.toString())
    
  },[level,currentExperience,challengesCompleted]) 
  
  function levelUp(){
    setLevel(level + 1)
    setIsLevelUpModalOpen(true)
  }

  function closeLevelUpModal(){
    setIsLevelUpModalOpen(false)
  }

  function startNewChallenge(){
    const ramdomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[ramdomChallengeIndex]
    setActiveChallenge(challenge)
    new Audio('/notification.mp3').play()
    if (Notification.permission == 'granted'){
      new Notification('Novo desafio',{
        body: `Valendo ${challenge.amount}xp!`
      })
    }

  }

  function resetChallenge(){
    setActiveChallenge(null)
  }

  function completeChallenge(){
    if (!activeChallenge){
      return;
    }
    const { amount } = activeChallenge
    let finalExperience = currentExperience + amount

    if (finalExperience >= experienceToNextLevel){
      finalExperience -= experienceToNextLevel
      levelUp()

    }
    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
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
      experienceToNextLevel,
      completeChallenge,
      closeLevelUpModal
      }}>

      {children}
      {isLevelUpModalOpen && <LevelUpModal/>}
      
    </ChallengesContext.Provider>
  )
}