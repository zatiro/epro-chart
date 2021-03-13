import Head from 'next/head'

import { Toppings } from '../components/Toppings'

import { EproProvider } from '../context/EproContext'

import styles from '../styles/pages/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}> 

      <EproProvider>
        <Toppings />
      </EproProvider>

    </div>
  )
}
