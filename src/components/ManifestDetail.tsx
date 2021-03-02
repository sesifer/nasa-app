import styled from "styled-components";
import { Grid, List, ListItem } from "@material-ui/core";
import Image from "next/image";

const Div = styled.div`
    display: flex;
    flex-direction: row;
    padding: 1rem;
    background-color: lightgray;
`;

const ManifestContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 800px;
  margin-top: 3rem;
  list-style: none;
  margin-left: 0;
  padding-left: 0;
`;

const Card = styled.div`
display: block;
    border: 1px solid #eaeaea;
      border-radius: 10px;
      max-width: fit-content;
        margin: 2.5rem;
        padding: 1.5rem;
`;

const D = styled.span`
    font-weight: 100;
    text-transform: uppercase;
    margin: 0 0.5rem;
`;

const LeftList = styled(List)`
    justifyContent: flex-start;
`;

interface ManifestProps {
    name: string;
    landingDate: string;
    launchDate: string;
    photosTaken: number;
    status: string;
}

const ManifestDetail = (props: ManifestProps) => {
    const { landingDate, launchDate, name, status, photosTaken } = props;

    return (
        <div>
            <Grid>
                <Card>
                    <Image
                        src={`/images/rovers/${name.toLowerCase()}.jpg`}
                        layout="intrinsic"
                        width={350}
                        height={350}
                        alt={`Mars rover ${name}`}
                    />
                </Card>
                <List>
                    <ListItem>
                        Name
                    </ListItem>
                    <ListItem>
                        Status
                    </ListItem>
                    <ListItem>
                        Landing Date
                    </ListItem>
                    <ListItem>
                        Launch Date
                    </ListItem>
                    <ListItem>
                        Photos taken so far
                    </ListItem>
                </List>
                <List>
                    <ListItem>
                        <D>{name}</D>
                    </ListItem>
                    <ListItem>
                        <D>{status}</D>
                    </ListItem>
                    <ListItem>
                        <D>{landingDate}</D>
                    </ListItem>
                    <ListItem>
                        <D>{launchDate}</D>
                    </ListItem>
                    <ListItem>
                        <D>{photosTaken}</D>
                    </ListItem>
                </List>
            </Grid>
        </div>
    );
};

export default ManifestDetail;