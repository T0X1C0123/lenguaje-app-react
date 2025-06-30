import Grid from "@mui/material/Grid";
import { LessonCard } from "./LessonCard";
import { lessons } from "../data/lessons";
import { Link } from "react-router";

export const LessonOption = () => {
    return (
        <Grid container spacing={3}>
            {lessons.map((lesson) => (
                <Grid  size={12} key={lesson.id}>
                    <Link to={lesson.route} style={{ textDecoration: "none" }}>
                        <LessonCard lesson={lesson} />
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};
