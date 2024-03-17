import { ReviewModel } from "../entity/reviewSchema.js";
import { AppDataSource } from "../index.js";
import chalk from 'chalk';

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

export const getAll = async () => {
    try {
        const result = await AppDataSource.createQueryBuilder()
            .select("review")
            .from(ReviewModel, "review")
            .getMany();
        return result;
    } catch (error) {
        console.log(`${chalk.red('Error:')} ${error}`)
        throw `GetAllError: ${error}`;
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