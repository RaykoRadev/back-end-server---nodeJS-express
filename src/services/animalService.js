import Animal from "../models/Animal.js";

export async function create(data, userId) {
    return Animal.create({ ...data, author: userId });
}

export async function getAll(rawQuery) {
    const query = {};

    if (rawQuery.liked) {
        // filter.liked means: liked array contains value
        query.liked = rawQuery.liked;
    }

    if (rawQuery.author) {
        // author equality check
        query.author = rawQuery.author;
    }

    const page = parseInt(rawQuery.page) || 1;
    const limit = parseInt(rawQuery.limit) || 10;
    const skip = (page - 1) * limit;

    const dataFormat = Animal.find(query).skip(skip).limit(limit);

    const totalDocuments = Animal.countDocuments(query);
    const [data, total] = await Promise.all([dataFormat, totalDocuments]);

    return {
        data,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
}

export async function getOne(postId, userId) {
    const post = await Animal.findById(postId).populate("author", "-password");

    // const isOwner = review.owner.equals(userId);
    // const isInWishList = review.wishingList.includes(userId);

    // const result = { review, isOwner, isInWishList };
    return post;
}

export async function sendLike(postId, userId) {
    return Animal.findByIdAndUpdate(
        postId,
        {
            $push: { liked: userId },
        },
        { new: true }
    );
}

export async function removeLike(postId, userId) {
    return Animal.findByIdAndUpdate(
        postId,
        {
            $pull: { liked: userId },
        },
        { new: true }
    );
}

export async function deleteF(postId, userId) {
    return Animal.deleteOne({ author: userId, _id: postId });
}

export async function edit(data, postId) {
    return Animal.findByIdAndUpdate(postId, data, {
        runValidators: true,
        new: true, //? do i need it
    });
}

export async function getSorted(criteria, order) {
    //* order is defining ascending or decending
    return (await Animal.find()).toSorted({ [criteria]: order });
}

export async function getPhotosHome() {
    return await Animal.find()
        .sort({ createdAt: -1 })
        .select({ imageUrl: true })
        .limit(5);
}
