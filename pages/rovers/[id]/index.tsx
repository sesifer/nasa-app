import React, { ReactElement, useState } from "react";
import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import styled from "styled-components";
import ManifestDetail from "../../../src/components/ManifestDetail";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { addDays, format } from "date-fns";
import { PhotoItem } from "../../../src/types/types";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { API_KEY, DEFAULT_ENDPOINT } from "../../../src/types/constants";
import GalleryHorizontal from "../../../src/components/Gallery/GalleryHorizontal";
import Header from "../../../src/components/Header";

const MyFormControl = styled(FormControl)`
    margin: 1.5rem 0,
    minWidth: 120,
    maxWidth: 300,
`;

export const getServerSideProps: GetServerSideProps = async ({query}) => {
    const { id } = query;
    const [manifestRes, photosRes] = await Promise.all([
        fetch(`${DEFAULT_ENDPOINT}manifests/${id}?api_key=${API_KEY}`),
        fetch(`${DEFAULT_ENDPOINT}rovers/${id}/photos?api_key=${API_KEY}&sol=1&page=1`)
    ]);
    const [manifest, photosGalleryData] = await Promise.all([
        manifestRes.json(),
        photosRes.json()
    ]);

    return {
        props: {
            manifest,
            photosGalleryData
        },
    };
};

export default function Manifest(props: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
    const { manifest, photosGalleryData } = props;
    const { landing_date, launch_date, name, status, total_photos, photos } = manifest.photo_manifest;

    //deal with photos in gallery
    const [galleryPhotos, setGalleryPhotos] = useState(photosGalleryData.photos);
    const id = name.toLowerCase();

    // deal with date
    const yesterday = addDays(new Date(), -1);
    const formattedYesterday = format(yesterday, "dd/MM/yyyy");
    const minDate = getMinDate(photos);
    const [selectedDate, setDate] = useState(minDate);

    //deal with cameras
    const cameras = getActualCameras(photos, minDate);
    const [selectedCamera, setCamera] = useState("");
    const handleChange = ({ target }: React.ChangeEvent<{ value: unknown }>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setCamera(target.value as string);
        // const data = loadPhotos(name.toLowerCase(), selectedDate, selectedCamera);
        // console.log("data: ", data);

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
                <Grid container direction={"column"}>
                    {/*header grid*/}
                    <Grid item>
                        <Header />
                    </Grid>
                    {/*content grid*/}
                    <Grid item container direction={"column"}>
                        <Typography
                            variant={"h1"}
                            align={"center"}
                            color={"textPrimary"}
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
                        <Grid item container>
                            <KeyboardDatePicker
                                autoOk
                                variant="inline"
                                inputVariant="standard"
                                id="date-picker"
                                label="Pick your date:"
                                format="dd/MM/yyyy"
                                placeholder="DD/MM/YYYY"
                                value={selectedDate}
                                InputAdornmentProps={{ position: "start" }}
                                onChange={date => setDate(date)}
                                maxDate={yesterday}
                                maxDateMessage={`Date should not be after ${formattedYesterday}`}
                                minDate={minDate}
                                minDateMessage={`Date should not be before ${minDate}`}
                            />
                            <MyFormControl>
                                <InputLabel
                                    shrink
                                    id="camera-select-label">
                                    Camera
                                </InputLabel>
                                <Select
                                    labelId="camera-select-label"
                                    id="camera-select"
                                    defaultValue={""}
                                    value={selectedCamera}
                                    onChange={handleChange}
                                    displayEmpty
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
                            </MyFormControl>
                        </Grid>
                        <Grid item>
                            <GalleryHorizontal
                                camera={selectedCamera}
                                selectedDate={selectedDate}
                                roverId={id}
                            />
                        </Grid>
                        <Grid item>
                            <Button color="primary" variant="outlined" href="/">
                                    Back to All rovers
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
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