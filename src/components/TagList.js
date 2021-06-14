import React, {useState, useEffect} from 'react';
import { Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getLinkTags } from '../api';

const TagList = ({link}) => {
    const [targetLink, setTargetLink] = useState(link)
    const [targetTag, setTargetTag] = useState([])
    const [linkTags, setLinkTags] = useState([])

    // useEffect(async () => {
    //     const tags = await getLinkTags()
    //     setLinkTags(tags)
    // }, [])

    console.log(linkTags, "LINK TAGS")
    console.log(targetLink, "TARGET LINK")
    const useStyles = makeStyles((theme) => ({
        root: {
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          listStyle: "none",
          padding: theme.spacing(0.5),
          margin: 0,
        },
        chip: {
          margin: theme.spacing(0.5),
        },
      }));
    
      const classes = useStyles();


 return link.tags.map((tag) => {
    if (link.id === tag.id) {
        return (
     <li key={tag.id}>
       <Chip label={tag.name} className={classes.chip} />
     </li>
   );
    }
   
 });
}
export default TagList