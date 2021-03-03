import { GridList, GridListTile } from "@material-ui/core";
import { format } from "date-fns";
import { API_KEY, DEFAULT_ENDPOINT, fetcher } from "../../types/constants";
import { GalleryItem } from "../../types/types";
import useSWR from "swr";

interface GalleryProps {
    camera: string;
    selectedDate: Date;
    roverId: string;
}

const GalleryHorizontal = (props: GalleryProps) => {
    let url = `${DEFAULT_ENDPOINT}rovers/${props.roverId}/photos?api_key=${API_KEY}`;
    if (props.camera === "") {
        url = `${url}&sol=1&page=1`;
    } else {
        const selectedDateStr = format(props.selectedDate, "yyyy-MM-dd");
        url = `${url}&earth_date=${selectedDateStr}&camera=${props.camera}`;
    }
    console.log("url:", url);

    const { data, error } = useSWR(url, fetcher);

    if (error) return <h1>Something went wrong!</h1>;
    if (!data) return <h1>Loading...</h1>;

    return (
        <GridList>
            {data.photos.map((item: GalleryItem) => {
                return <GridListTile key={item.id}>
                    <img src={item.img_src} alt="" />
                </GridListTile>;
            })}
        </GridList>
    );
};

export default GalleryHorizontal;