export class Review {
    constructor(reviewId, listingId, review, userId, rating) {
            this.reviewId = reviewId;
            this.listingId = listingId;
            this.review = review;
            this.userId = userId;
            this.rating = rating;
    }
}