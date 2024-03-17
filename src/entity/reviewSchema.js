import { EntitySchema } from "typeorm";
import { Review } from "../model/Review.js";


export const ReviewModel = new EntitySchema({
    name: "Review",
    target: Review,
    columns: {
        reviewId: {
            type: "int",
            primary: true,
            generated: true
        },
        listingId: {
            type: "int",
        },
        review: {
            type: "varchar",
        },
        userId:{
            type: "int"
        }
    }
})