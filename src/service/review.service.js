import { ReviewModel } from "../entity/reviewSchema.js";
import { AppDataSource } from "../index.js";
import chalk from 'chalk';

//send notification
export async function sendReviewNotification(payload) {
    const response = await fetch('http://localhost:3006/rabbit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    console.log('Review notification sent');

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

export const create = async (payload) => {
    try{
        const result = await AppDataSource.createQueryBuilder()
            .insert()
            .into(ReviewModel)
            .values(payload)
            .execute();

        return result;
    } catch (error) {
        console.log(`${chalk.red('Error:')} ${error}`)
        throw `UploadError: ${error}`;
    }
}

// export const getAll = async () => {
//     try {
//         const result = await AppDataSource.createQueryBuilder()
//             .select("review")
//             .from(ReviewModel, "review")
//             .getMany();
//         return result;
//     } catch (error) {
//         console.log(`${chalk.red('Error:')} ${error}`)
//         throw `GetAllError: ${error}`;
//     }
// };

export const getReviewsById = async (listingId) => {
    try {
        const result = await AppDataSource
            .createQueryBuilder()
            .select("review")
            .from(ReviewModel, "review")
            .where("review.listingId = :listingId", { listingId })
            .getMany();
        return result;
    } catch (error) {
        console.log(`${chalk.red('Error:')} ${error}`)
        throw `GetByIdError: ${error}`;
    }
};

export const getAverageRating = async (listingId) => {
    try {
        const result = await AppDataSource.createQueryBuilder()
            .select("AVG(review.rating)", "average")
            .from(ReviewModel, "review")
            .where("review.listingId = :listingId", { listingId })
            .getRawOne();
        return result;
    } catch (error) {
        console.log(`${chalk.red('Error:')} ${error}`)
        throw `GetAverageError: ${error}`;
    }
};

