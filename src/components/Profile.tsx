import styles from '../styles/components/Profile.module.css'
export function Profile(){
  return(
    <div className ={styles.profileContainer}>
      <img src="https://instagram.fcfc2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/142290521_160763545609585_1894661969890336325_n.jpg?_nc_ht=instagram.fcfc2-1.fna.fbcdn.net&_nc_ohc=55lhVEhOBjYAX-EFYyV&tp=1&oh=3d12350fdc11eef21ac56aafe05b0227&oe=6060B308" alt="Diego Fernandes"/>
      <div>
        <strong>Matheus Parro</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level 1
        </p>
      </div>
    </div>
  )
}