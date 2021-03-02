import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import Image from "next/image";
import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";

export default function Home() {
    const rovers = ["perseverance", "curiosity", "opportunity", "spirit"];

    return (
        <>
            <Head>
                <title>Next App Example - NASA</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Grid container>
                <Box p={5}>
                    <Typography
                        variant={"h1"}
                        align={"center"}
                        color={"primary"}
                        gutterBottom
                    >
                    Meanwhile, on the Red planet..
                    </Typography>
                    <Typography
                        variant={"h3"}
                        align={"center"}
                        color={"secondary"}
                        gutterBottom={true}
                    >
                    Explore Mars by the eye of a NASA rover
                    </Typography>
                </Box>
                <div className={styles.wrapper}>
                    <ul className={styles.grid}>
                        {rovers.map(rover => {

                            return (
                                <li key={rover} className={styles.card}>
                                    <Link href='/rovers/[id]' as={`/rovers/${rover}`}>
                                        <a>
                                            <Image
                                                src={`/images/rovers/${rover}.jpg`}
                                                layout="responsive"
                                                width={500}
                                                height={500}
                                                alt={`Mars rover ${rover}`}
                                            />
                                            <h3>{rover.toUpperCase()}</h3>
                                        </a>
                                    </Link>
                                </li>
                            );
                        })
                        }
                    </ul>
                </div>
            </Grid>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
          Powered by{" "}
                    <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
                </a>
            </footer>
        </>
    );
}