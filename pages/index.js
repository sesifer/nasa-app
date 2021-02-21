import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import * as curiosity from './../public/images/rovers/Curiosity_at_Glen_Etive.webp';

const DEFAULT_ENDPOINT = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=DEMO_KEY`;

export async function getServerSideProps() {
  const response = await fetch(DEFAULT_ENDPOINT);
  const data = await response.json();

  return {
    props: {
      data
    }
  }
}

export default function Home({data}) {
  const { info, results: defaultResults = [] } = data;
  const [results, updateResults] = useState(defaultResults);
  const [page, updatePage] = useState({
    ...info,
    current: DEFAULT_ENDPOINT
  });

  const {current} = page;

  console.log("data: ",data);

  useEffect(() => {

    if (current === DEFAULT_ENDPOINT) {

      return;
    }

    async function request() {
      const response = await fetch(current);
      const nextData = await response.json();

      updatePage({
        current,
        ...nextData.info
      })

      if (!nextData.info?.prev) {
        updateResults(nextData.results);

        return;
      }

      updateResults(prev => {

        return [
            ...prev,
            ...nextData.results
        ]
      });
    }

    request();
    }, [current]
  );

  function handleLoadMore() {
    updatePage(prev => {
      return {
        ...prev,
        current: page?.next
      }
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>NASA Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Meanwhile, on the Red planet..
        </h1>

        <p className={styles.description}>
          Explore Mars by rovers' eyes.
        </p>

        <div className={styles.grid}>
          <ul className={styles.grid}>
                  <li key={'168'} className={styles.card}>
                    <Link href='/manifest'>
                      <a>
                        <Image
                          src={curiosity}
                          width={586}
                          height={330}
                          alt="Curiosity at Glen Etive"
                        />
                        <h3>Name</h3>
                      </a>
                    </Link>
                  </li>
          </ul>
        </div>
        <p>
          <button onClick={handleLoadMore}>Load More</button>
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
