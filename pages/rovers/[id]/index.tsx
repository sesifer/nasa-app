import React, { ReactElement, useState } from "react";
import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { KeyboardDatePicker } from "@material-ui/pickers";
import ManifestDetail from "../../../src/components/ManifestDetail";
import { addDays, format } from "date-fns";
import { PhotoItem } from "../../../src/types/types";
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { API_KEY, DEFAULT_ENDPOINT } from "../../../src/types/constants";
import GalleryHorizontal from "../../../src/components/Gallery/GalleryHorizontal";
import Header from "../../../src/components/Header";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
    createStyles({
        pageContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
        },
        contentContainer: {
            width: "100%",
            [theme.breakpoints.down("xs")]: {
                width: "95%",
            },
            [theme.breakpoints.down("sm")]: {
                width: 450,
            },
            [theme.breakpoints.down("md")]: {
                width: 430,
            },
            [theme.breakpoints.up("lg")]: {
                width: "60%",
            },
            [theme.breakpoints.up("xl")]: {
                width: 450,
            },
        },
        item: {
            backgroundColor: "#ffffff",
            margin: "1em 0",
            padding: "1.5em",
            width: "95%",
            alignContent: "center",
            "&:hover": {
                boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
            },
            "& #camera-input-label": {
                backgroundColor: "#ffffff",
                paddingLeft: 4,
                paddingRight: 4,
                transform: "translate(35px, 15px) scale(0.75)",
            }
        },
        datePicker: {
            width: "100%"
        },
    })
);

export const getServerSideProps: GetServerSideProps = async ({query}) => {
    const { id } = query;
    const res = await fetch(`${DEFAULT_ENDPOINT}manifests/${id}?api_key=${API_KEY}`);
    const manifest = await res.json();

    if (!manifest) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            manifest
        },
    };
};

export default function Manifest(props: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
    const classes = useStyles();

    const { manifest } = props;
    const { landing_date, launch_date, name, status, total_photos, photos } = manifest.photo_manifest;
    const id = name.toLowerCase();

    // deal with date
    const yesterday = addDays(new Date(), -1);
    const formattedYesterday = format(yesterday, "dd/MM/yyyy");
    const minDate = getMinDate(photos);
    const [selectedDate, setDate] = useState(minDate);
    console.log("selectedDate:", selectedDate);


    //deal with cameras
    const cameras = getActualCameras(photos, minDate);
    const [selectedCamera, setCamera] = useState("");
    const handleChange = ({ target }: React.ChangeEvent<{ value: unknown }>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setCamera(target.value as string);
    };

    return (
        <>
            <Head>
                <title>{name}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <main>
                <div className={classes.pageContainer}>
                    <Header />
                    <div className={classes.contentContainer}>
                        <Typography
                            variant={"h1"}
                            align={"center"}
                            color={"primary"}
                            gutterBottom={true}
                        >
                            {name}
                        </Typography>
                        <ManifestDetail
                            name={name}
                            landingDate={landing_date}
                            launchDate={launch_date}
                            photosTaken={total_photos}
                            status={status}
                        />
                        <div className={classes.item}>
                            <KeyboardDatePicker
                                autoOk
                                variant="inline"
                                inputVariant="outlined"
                                id="date-picker"
                                label="Pick your date:"
                                format="dd/MM/yyyy"
                                placeholder="DD/MM/YYYY"
                                value={selectedDate}
                                InputAdornmentProps={{ position: "start" }}
                                onChange={(date) => date && setDate(date)}
                                maxDate={yesterday}
                                maxDateMessage={`Date should not be after ${formattedYesterday}`}
                                minDate={minDate}
                                minDateMessage={`Date should not be before ${minDate}`}
                                className={classes.datePicker}
                            />
                        </div>
                        <FormControl variant="outlined" className={classes.item}>
                            <InputLabel id="camera-input-label" htmlFor="camera-select">
                            Camera:
                            </InputLabel>
                            <Select
                                inputProps={{
                                    id: "camera-select"
                                }}
                                defaultValue={""}
                                value={selectedCamera}
                                onChange={handleChange}
                            >
                                {cameras.map(camera => {
                                    return (
                                        <MenuItem key={`menu-item-${camera}`} value={camera}>
                                            {camera}
                                        </MenuItem>
                                    );
                                })
                                }
                            </Select>
                        </FormControl>
                        <div className={classes.item}>
                            <GalleryHorizontal
                                camera={selectedCamera}
                                selectedDate={selectedDate}
                                roverId={id}
                            />
                        </div>
                        <Button color="primary" variant="outlined" href="/">
                        Back to All rovers
                        </Button>
                    </div>
                </div>
            </main>
        </>
    );
}

const getMinDate = (manifestPhotos: Array<PhotoItem>): Date => {
    if (manifestPhotos.length === 0) {

        return addDays(new Date(), -365); //yearAgo
    }
    const date = manifestPhotos[0].earth_date; //"2012-08-06"
    const splitDate = date.split("-");

    return new Date(Number(splitDate[0]), Number(splitDate[1])-1, Number(splitDate[2]));
};

const getActualCameras = (manifestPhotos: Array<PhotoItem>, date: Date): Array<string> => {
    const dateStr = format(date, "yyyy-MM-dd");
    const manifestPhotosObj = manifestPhotos.find(item => item.earth_date === dateStr);

    if(!manifestPhotosObj) {

        return ["NoCameraFound"];
    }

    return manifestPhotosObj.cameras;
};