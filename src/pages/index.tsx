import Head from 'next/head'

import { Toppings } from '../components/Toppings'

import styles from '../styles/pages/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}> 
      <Toppings />
    </div>
  )
}
